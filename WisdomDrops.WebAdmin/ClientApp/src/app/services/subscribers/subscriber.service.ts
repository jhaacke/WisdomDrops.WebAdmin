import { Injectable } from '@angular/core';
import { ServiceBase } from "../../../shared/base.service";
import { ConfigurationService } from "../configuration/configuration.service";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetSubscribersResult, SortDir, SubscriberModel } from "./subscriber.types";
import { tap, map, catchError } from 'rxjs/operators';

@Injectable(({
  providedIn: 'root'
}) as any)
export class SubscriberService extends ServiceBase {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient) {
    super();
  }

  getSubscribersObservable(pageNumber: number = 0,
    pageSize: number = 0,
    sortField?: string,
    sortDir?: string,
    searchText?: string): Observable<GetSubscribersResult> {
    const url = `${this.configurationService.apiUrl}subscribers`;

    var params: HttpParams = new HttpParams();

    if (pageSize > 0) {
      params = params
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('includeCount', 'true');
    }

    if (sortField && sortDir) {
      params = params
        .set('sortField', sortField)
        .set('sortDir', this.resolveNumberForSortDir(sortDir).toString());
    }

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    let result = this.http.get<HttpResponse<SubscriberModel[]>>(url,
      {
        observe: 'response',
        params: params
      }).pipe(
      map((resp: HttpResponse<any>) => {
        return {
          subscribers: <SubscriberModel[]>resp.body,
          count: +resp.headers.get('X-Total-Count')
        } as GetSubscribersResult;
      })
    );

    return result;
  }

  sendAffirmation(subscriberId: string) {
    const url = `${this.configurationService.apiUrl}affirmations/${subscriberId}`;
    super.processMethod(() => this.http.get<any>(url));
  }

  private resolveNumberForSortDir(sortDir: string): SortDir {
    let result = sortDir.toUpperCase() === 'ASC'
      ? SortDir.Asc
      : SortDir.Desc;
    return result;
  }

}
