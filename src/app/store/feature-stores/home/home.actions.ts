import { createAction, props } from '@ngrx/store';
import { IDashboardTotals } from 'src/app/model/interfaces/Idashboard-totals.interface';
import { IDashboardDto } from 'src/app/model/interfaces';

export const fetch_dashboard_totals = createAction('[Home Effect] Fetch Dashboard Totals');
export const fetch_dashboard_totals_succeeded = createAction('[Home Effect] Fetch Dashboard Totals Succeeded', props<{dashboardTotals: IDashboardDto}>());
export const fetch_dashboard_totals_failed = createAction('[Home Effect] Fetch Dashboard Totals Failed');
