import { createFeatureSelector, createSelector } from '@ngrx/store';
import { features } from 'src/app/features';
import { HomeState } from './home.state';

const dashboardFeature = createFeatureSelector<HomeState>(features.DASHBOARD);

export const activeChart = createSelector(
    dashboardFeature,
    state => state.activeChart
);

export const getDashboardTotals = createSelector(
    dashboardFeature,
    state => state.dashboardTotals
);

export const getDashboardDirectDownlines = createSelector(
    dashboardFeature,
    state => {
        return { monthSalesLeaderboard: state.monthSalesLeaderboard, overallSalesLeaderboard: state.overallSalesLeaderboard };
    }
);


export const getDashboardLoadingStatus = createSelector(
    dashboardFeature,
    state => state.status
);
