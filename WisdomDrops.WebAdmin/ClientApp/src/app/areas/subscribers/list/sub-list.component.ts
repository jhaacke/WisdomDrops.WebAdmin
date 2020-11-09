import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SubListDataSource } from "./sub-list.datasource";
import { ListViewModel } from "../sub-view.types";
import { SubscriberService } from "../../../services/subscribers/subscriber.service";
import { SubMaintenanceService } from "../services/sub-maintenance.service";

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.css']
})
export class SubListComponent implements OnInit, AfterViewInit {
  dataSource: SubListDataSource;
  displayColumns = ['phone', 'firstName', 'timeWindowStart', 'timeWindowEnd', 'sendAction'];
  vm: ListViewModel;

  constructor(private subscriberService: SubscriberService, private maintService: SubMaintenanceService) { }

  ngOnInit() {
    this.vm = this.maintService.listViewModel;
    this.dataSource = new SubListDataSource(this.maintService);
  }

  ngAfterViewInit() {
  }

  sendAffirmation(subscriberId: string): void {
    this.subscriberService.sendAffirmation(subscriberId);
  }
}
