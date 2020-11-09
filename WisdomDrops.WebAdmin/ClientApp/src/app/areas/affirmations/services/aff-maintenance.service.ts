import { Injectable, OnDestroy } from '@angular/core';
import { AffirmationService } from "../../../services/affirmation/affirmation.service";
import { AffirmationModel, GetAffirmationsResult } from "../../../services/affirmation/affirmation.types";
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';
import { ListViewModel } from "../aff-view.types";

@Injectable({
  providedIn: 'root'
} as any)
export class AffMaintenanceService implements OnDestroy {

  private affirmationsSubject = new BehaviorSubject<AffirmationModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private refreshRequired: boolean = true;

  constructor(private affirmationService: AffirmationService) { }

  loadAffirmations(force: boolean = true): Observable<GetAffirmationsResult | null> {
    let result: Observable<GetAffirmationsResult | null> = of(null);

    if (force || this.refreshRequired) {
      this.loadingSubject.next(true);
      result = this.affirmationService.getAffirmationsObservable(
          this.listViewModel.pageNumber,
          this.listViewModel.pageSize,
          this.listViewModel.sortField,
          this.listViewModel.sortDir,
          this.listViewModel.searchText)
        .pipe(finalize(() => {
          this.loadingSubject.next(false);
        }));

      result.subscribe((fetchResult: GetAffirmationsResult) => {
        this.listViewModel.userCount = fetchResult.count;
        this.affirmationsSubject.next(fetchResult.affirmations);
        this.listViewModel.refreshDate = new Date();
        this.refreshRequired = false;
      });
    }

    return result;
  }

  get affirmationsObservable(): Observable<AffirmationModel[]> {
    return this.affirmationsSubject.asObservable();
  }

  listViewModel: ListViewModel = {
    userCount: 0,
    pageSize: 0,
    pageNumber: 0,
    searchPanelExpanded: false,
    sortField: "category",
    sortDir: "desc",
    searchText: "",
    loading$: this.loadingSubject.asObservable()
  }

  ngOnDestroy(): void {
    this.affirmationsSubject.complete();
    this.loadingSubject.complete();
  }
}
