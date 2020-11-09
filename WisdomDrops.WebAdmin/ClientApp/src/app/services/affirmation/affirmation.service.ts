import { Injectable } from '@angular/core';
import { ServiceBase } from "../../../shared/base.service";
import { ConfigurationService } from "../configuration/configuration.service";
import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { GetAffirmationsResult, SortDir, AffirmationModel, ImportFromSpreadsheetResponse } from "./affirmation.types";
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { share } from 'rxjs/operators';

@Injectable(({
  providedIn: 'root'
}) as any)
export class AffirmationService extends ServiceBase {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient) {
    super();
  }

  getAffirmationsObservable(pageNumber: number = 0, pageSize: number = 0, sortField?: string, sortDir?: string, searchText?: string): Observable<GetAffirmationsResult> {
    const url = `${this.configurationService.apiUrl}affirmations`;

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

    let result = this.http.get<HttpResponse<AffirmationModel[]>>(url,
      {
        observe: 'response',
        params: params
      }).pipe(
        map((resp: HttpResponse<any>) => {
          return {
            affirmations: <AffirmationModel[]>resp.body,
            count: +resp.headers.get('X-Total-Count')
          } as GetAffirmationsResult;
        })
      );

    return result;
  }

  importFromSpreadsheet(data: string): Observable<ImportFromSpreadsheetResponse> {
    const url = `${this.configurationService.apiUrl}affirmations/spreadsheet`;
    let result = super.processMethod(() => this.http.post<ImportFromSpreadsheetResponse>(url, { spreadsheetData: data }));
    return result;
  }

  private resolveNumberForSortDir(sortDir: string): SortDir {
    let result = sortDir.toUpperCase() === 'ASC'
      ? SortDir.Asc
      : SortDir.Desc;
    return result;
  }

}
