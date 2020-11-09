import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AffMaintenanceService } from "./services/aff-maintenance.service";
import { Observable, of } from "rxjs";
import { GetAffirmationsResult } from "../../services/affirmation/affirmation.types";

@Injectable(({
  providedIn: 'root',
}) as any)
export class AffirmationListResolver implements Resolve<GetAffirmationsResult | null> {
  constructor(private maintService: AffMaintenanceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetAffirmationsResult> {
    return this.maintService.loadAffirmations(false);
  }
}
