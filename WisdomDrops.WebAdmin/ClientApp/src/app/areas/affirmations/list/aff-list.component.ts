import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ListViewModel } from "../aff-view.types";
import { AffListDataSource } from "./aff-list-datasource";
import { AffMaintenanceService } from "../services/aff-maintenance.service";
import { AffirmationService } from "../../../services/affirmation/affirmation.service";
import { merge, fromEvent, BehaviorSubject } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AffirmationModel, ImportFromSpreadsheetResponse } from "../../../services/affirmation/affirmation.types";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aff-list',
  templateUrl: './aff-list.component.html',
  styleUrls: ['./aff-list.component.css']
})
export class AffListComponent implements OnInit, AfterViewInit {
  //  @ViewChild(MatPaginator) paginator: MatPaginator;
  //  @ViewChild(MatSort) sort: MatSort;
  //  @ViewChild('input') input: ElementRef;
  dataSource: AffListDataSource;

  //  displayColumns = ['description', 'category', 'weight', 'topic'];
  displayColumns = ['description', 'category'];
  vm: ListViewModel;

  constructor(
    private affirmationService: AffirmationService,
    private maintService: AffMaintenanceService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.vm = this.maintService.listViewModel;
    this.dataSource = new AffListDataSource(this.maintService);
  }

  ngAfterViewInit() {
    //    fromEvent(this.input.nativeElement, 'keyup')
    //      .pipe(
    //        debounceTime(250),
    //        distinctUntilChanged(),
    //        tap(() => {
    //          this.resetPageToStart();
    //          this.maintService.loadAffirmations();
    //        })
    //      )
    //      .subscribe();
    //
    //    this.paginator.page.subscribe(() => {
    //      this.vm.pageNumber = this.paginator.pageIndex;
    //      this.vm.pageSize = this.paginator.pageSize;
    //      this.maintService.loadAffirmations().subscribe();
    //    });
    //
    //    this.sort.sortChange.subscribe(() => {
    //      this.vm.sortField = this.sort.active;
    //      this.vm.sortDir = this.sort.direction;
    //      this.resetPageToStart();
    //      this.maintService.loadAffirmations().subscribe();
    //    });
  }

  //  private resetPageToStart(): void {
  //    this.paginator.pageIndex = 0;
  //    this.vm.pageNumber = this.paginator.pageIndex;
  //    this.vm.pageSize = this.paginator.pageSize;
  //  }

  onSelected(user: AffirmationModel) {
    //    this.router.navigate(["user/", user.id]);
  }


  importClicked(): void {
    let reloadSubject = new BehaviorSubject<boolean>(false);

    reloadSubject.asObservable().subscribe(result => {
      if (result) {
        this.maintService.loadAffirmations(true);
      }
    });

    const dialogRef = this.dialog.open(ImportDialog, {
      maxWidth: '500px',
      data: { reloadSubject: reloadSubject }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

export interface ImportDialogData {
  reloadSubject: BehaviorSubject<boolean>;
}

@Component({
  selector: 'import-dialog',
  templateUrl: 'import-dialog.html',
})
export class ImportDialog implements OnInit {
  importForm: FormGroup;
  uploadFile: File;
  uploadData: string | null = null;
  importResponse: ImportFromSpreadsheetResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private affirmationService: AffirmationService,
    public dialogRef: MatDialogRef<ImportDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ImportDialogData) { }

  ngOnInit() {
    this.importForm = this.fb.group({
      file: ['']
    });
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.uploadFile = event.target.files[0];
      //      this.uploadData = event.src;
      this.importForm.get('file').setValue(this.uploadFile);

      var reader = new FileReader();
      reader.onload = (evt: any) => {
        this.uploadData = reader.result.split(',')[1];
      }
      reader.readAsDataURL(this.uploadFile);
    }
  }

  onSubmit(): void {
    this.affirmationService.importFromSpreadsheet(this.uploadData)
      .subscribe((res: ImportFromSpreadsheetResponse) => {
        this.importResponse = res;
        this.data.reloadSubject.next(true);
      },
      err => {
        this.importResponse = this.createFailedImportResponse();
      });
  }

  okClicked() {
    const result = this.importResponse && this.importResponse.success;
    this.dialogRef.close(result);
  }

  private createFailedImportResponse(): ImportFromSpreadsheetResponse {
    return {
      errorMessage: 'An unexpected error was encountered.',
      report: '',
      success: false
    };
  }
}
