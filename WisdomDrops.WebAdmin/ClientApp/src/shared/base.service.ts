import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
//import { ErrorObservable } from 'rxjs-compat/observable/ErrorObservable'
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

export class ServiceBase {

  //  constructor(private spinnerService: Ng4LoadingSpinnerService) { }
  constructor() { }

  //  processMethod<T>(func: () => Observable<T>): Observable<T> | null {
  processMethod<T>(func: () => Observable<T>): any {
    //    this.spinnerService.show();
    //    console.log('->Show Spinner');
    var result = func().pipe(catchError(err => this.handleError(err))).pipe(share());

    result.subscribe(
      () => {
        //        console.log('->Hide Spinner');
        //        this.spinnerService.hide();
      });

    return result;
  }

  //  private handleError(response: HttpErrorResponse): ErrorObservable<HttpErrorResponse> {
  private handleError(response: HttpErrorResponse): Observable<any> {
    //    console.log('->Hide Spinner2');
    //    this.spinnerService.hide();
    var message: string = `An error occurred during an http operation:\r\nStatus: ${response.status}\r\nURL: ${response.url}\r\nMessage: ${response.message}`;
    console.error(message);

    var result = of(null);
    return result;
    //    return Observable.throw(response);
  }
}
