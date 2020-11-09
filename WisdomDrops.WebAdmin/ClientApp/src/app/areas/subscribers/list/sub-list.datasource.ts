import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { SubscriberModel } from "../../../services/subscribers/subscriber.types";
import { SubMaintenanceService } from "../services/sub-maintenance.service";

export class SubListDataSource extends DataSource<SubscriberModel> {
  constructor(private maintService: SubMaintenanceService) { super(); }

  connect(collectionViewer: CollectionViewer): Observable<SubscriberModel[]> {
    return this.maintService.subscribersObservable;
  }

  disconnect(collectionViewer: CollectionViewer): void {

  }
}
