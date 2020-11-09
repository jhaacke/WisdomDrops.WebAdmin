import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { AffirmationModel } from "../../../services/affirmation/affirmation.types";
import { Observable } from "rxjs";
import { AffMaintenanceService } from "../services/aff-maintenance.service";

export class AffListDataSource extends DataSource<AffirmationModel> {
  constructor(private maintService: AffMaintenanceService ) { super(); }

  connect(collectionViewer: CollectionViewer): Observable<AffirmationModel[]> {
    return this.maintService.affirmationsObservable;
  }

  disconnect(collectionViewer: CollectionViewer): void {

  }
}
