import { IDashboardTotals } from './Idashboard-totals.interface';
import { IAgentSalesLeaderboard } from './IagentSalesLeaderBoard.interface';

export interface IDashboardDto {
    totals: IDashboardTotals;
    monthSalesLeaderboard: IAgentSalesLeaderboard[];
    overallSalesLeaderboard: IAgentSalesLeaderboard[];
}
