import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { activeChart, getDashboardDirectDownlines, getDashboardLoadingStatus } from 'src/app/store/feature-stores/home/home.selectors';
import { ChartEnum, StatusEnum } from 'src/app/model/enums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeChart$ = this.store$.select(activeChart);
  chartEnum = ChartEnum;
  downlines$ = this.store$.select(getDashboardDirectDownlines);

  status = StatusEnum;
  today = new Date();

  dashboardLoadStatus$ = this.store$.select(getDashboardLoadingStatus);

  constructor(private store$: Store<{}>) { }

  ngOnInit(): void {
  }

}
