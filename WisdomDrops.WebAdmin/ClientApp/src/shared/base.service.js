"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var operators_2 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
//import { ErrorObservable } from 'rxjs-compat/observable/ErrorObservable'
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
var ServiceBase = /** @class */ (function () {
    //  constructor(private spinnerService: Ng4LoadingSpinnerService) { }
    function ServiceBase() {
    }
    //  processMethod<T>(func: () => Observable<T>): Observable<T> | null {
    ServiceBase.prototype.processMethod = function (func) {
        var _this = this;
        //    this.spinnerService.show();
        //    console.log('->Show Spinner');
        var result = func().pipe(operators_2.catchError(function (err) { return _this.handleError(err); })).pipe(operators_1.share());
        result.subscribe(function () {
            //        console.log('->Hide Spinner');
            //        this.spinnerService.hide();
        });
        return result;
    };
    //  private handleError(response: HttpErrorResponse): ErrorObservable<HttpErrorResponse> {
    ServiceBase.prototype.handleError = function (response) {
        //    console.log('->Hide Spinner2');
        //    this.spinnerService.hide();
        var message = "An error occurred during an http operation:\r\nStatus: " + response.status + "\r\nURL: " + response.url + "\r\nMessage: " + response.message;
        console.error(message);
        var result = rxjs_1.of(null);
        return result;
        //    return Observable.throw(response);
    };
    return ServiceBase;
}());
exports.ServiceBase = ServiceBase;
//# sourceMappingURL=base.service.js.map