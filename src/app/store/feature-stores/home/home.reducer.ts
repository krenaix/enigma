import { createReducer, on, State, Action } from '@ngrx/store';
import { initialHomeState, HomeState } from './home.state';
import * as homeActions from './home.actions';
import { StatusEnum } from 'src/app/model/enums';
import { log_out } from '../authentication/actions';

const reducer = createReducer(
  initialHomeState,
  on(homeActions.fetch_dashboard_totals, state => ({
    ...state,
    status: StatusEnum.Busy
  })),
  on(homeActions.fetch_dashboard_totals_succeeded, (state, { dashboardTotals }) => ({
    ...state,
    status: StatusEnum.Done,
    dashboardTotals: dashboardTotals.totals,
    monthSalesLeaderboard: dashboardTotals.monthSalesLeaderboard,
    overallSalesLeaderboard: dashboardTotals.overallSalesLeaderboard
  })),
  on(homeActions.fetch_dashboard_totals_failed, state => ({
    ...state,
    status: StatusEnum.Failed
  }))
);

export function homeReducer(
  state: HomeState | undefined,
  action: Action) {
  return reducer(state, action);
}
