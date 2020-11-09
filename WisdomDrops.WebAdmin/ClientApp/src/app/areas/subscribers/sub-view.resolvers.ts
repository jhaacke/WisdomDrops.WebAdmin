import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { GetSubscribersResult } from "../../services/subscribers/subscriber.types";
import { SubMaintenanceService } from "./services/sub-maintenance.service";

@Injectable(({
  providedIn: 'root',
}) as any)
export class SubscriberListResolver implements Resolve<GetSubscribersResult | null> {
  constructor(private maintService: SubMaintenanceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetSubscribersResult> {
    return this.maintService.loadSubscribers(false);
  }
}
