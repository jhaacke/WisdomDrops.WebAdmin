import { Injectable } from '@angular/core';
import { SubscriberModel, GetSubscribersResult } from "../../../services/subscribers/subscriber.types";
import { BehaviorSubject, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { SubscriberService } from "../../../services/subscribers/subscriber.service";
import { finalize } from 'rxjs/operators';
import { ListViewModel } from "../sub-view.types";

@Injectable({
  providedIn: 'root'
} as any)
export class SubMaintenanceService {
  private subscriberSubject = new BehaviorSubject<SubscriberModel[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private refreshRequired: boolean = true;

  constructor(private subscriberService: SubscriberService) { }

  loadSubscribers(force: boolean = true): Observable<GetSubscribersResult | null> {
    let result: Observable<GetSubscribersResult | null> = of(null);

    if (force || this.refreshRequired) {
      this.loadingSubject.next(true);
      result = this.subscriberService.getSubscribersObservable(
          this.listViewModel.pageNumber,
          this.listViewModel.pageSize,
          this.listViewModel.sortField,
          this.listViewModel.sortDir,
          this.listViewModel.searchText)
        .pipe(finalize(() => {
          this.loadingSubject.next(false);
        }));

      result.subscribe((fetchResult: GetSubscribersResult) => {
        this.listViewModel.userCount = fetchResult.count;
        this.subscriberSubject.next(fetchResult.subscribers);
        this.listViewModel.refreshDate = new Date();
        this.refreshRequired = false;
      });
    }

    return result;
  }

  get subscribersObservable(): Observable<SubscriberModel[]> {
    return this.subscriberSubject.asObservable();
  }

  listViewModel: ListViewModel = {
    userCount: 0,
    pageSize: 0,
    pageNumber: 0,
    searchPanelExpanded: false,
    sortField: "firstName",
    sortDir: "desc",
    searchText: "",
    loading$: this.loadingSubject.asObservable()
  }

  ngOnDestroy(): void {
    this.subscriberSubject.complete();
    this.loadingSubject.complete();
  }

}
