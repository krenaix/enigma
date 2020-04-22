import { IUser, IAgentSalesLeaderboard } from 'src/app/model/interfaces';
import { StatusEnum, ChartEnum } from 'src/app/model/enums';
import { IDashboardTotals } from 'src/app/model/interfaces/Idashboard-totals.interface';



export interface HomeState {
    activeChart: ChartEnum;
    dashboardTotals: IDashboardTotals;
    status: StatusEnum;
    monthSalesLeaderboard: IAgentSalesLeaderboard[];
    overallSalesLeaderboard: IAgentSalesLeaderboard[];

}

export const initialHomeState: HomeState = {
    status: StatusEnum.InitialLoad,
    activeChart: ChartEnum.Totals,
    dashboardTotals: {
        level_one_totals: 0, level_two_totals: 0, level_three_totals: 0, level_four_totals: 0, total_downlines: 0,
        level_one_totals_price: 0, level_two_totals_price: 0, level_three_totals_price: 0, level_four_totals_price: 0, total_downlines_price: 0
    },
    monthSalesLeaderboard: [],
    overallSalesLeaderboard: []
};
