import { Observable } from "rxjs/internal/Observable";

export interface ListViewModel {
  userCount: number;
  pageSize: number;
  pageNumber: number;
  sortField: string;
  sortDir: string;
  searchPanelExpanded: boolean;
  searchText: string;
  loading$: Observable<boolean>;
  refreshDate?: Date;
}
