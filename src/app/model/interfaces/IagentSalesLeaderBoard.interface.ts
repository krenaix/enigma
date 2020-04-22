import { AgentSalesLeaderboardColumns } from '../enums';

export interface IAgentSalesLeaderboard {
    id: number;
    [AgentSalesLeaderboardColumns.AgentName]: string;
    [AgentSalesLeaderboardColumns.AgentSurname]: string;
    [AgentSalesLeaderboardColumns.NumberOfSales]: number;
}
