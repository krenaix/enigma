import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services';
import { fetch_dashboard_totals, fetch_dashboard_totals_succeeded, fetch_dashboard_totals_failed } from './home.actions';
import { loggedInUser } from '../authentication/selectors';

@Injectable()
export class HomeEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<{}>,
        private router: Router,
        private homeService: HomeService
    ) { }

    fetchDashboardTotals$ = createEffect(() => this.actions$.pipe(
                ofType(fetch_dashboard_totals),
                withLatestFrom(this.store$.select(loggedInUser)),
                mergeMap(([payload, user]) => this.homeService.fetchDownlineTotals(user.id)),
                map(dashboardTotals => fetch_dashboard_totals_succeeded({dashboardTotals})),
                catchError(error => of(fetch_dashboard_totals_failed()))
    ));
}
