import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDashboardTotals, getDashboardLoadingStatus } from 'src/app/store/feature-stores/home/home.selectors';
import { environment } from 'src/environments/environment';
import { StatusEnum } from 'src/app/model/enums';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {

  dashbaordTotals$ = this.store$.select(getDashboardTotals);
  dashboardLoadStatus$ = this.store$.select(getDashboardLoadingStatus);

  clientPayingPercentage = environment.enableShowPayingClient;

  status = StatusEnum;
  today = new Date();
  constructor(private store$: Store<{}>) { }

  ngOnInit(): void {
  }

}
