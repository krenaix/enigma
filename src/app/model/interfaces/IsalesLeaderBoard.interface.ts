import { SalesLeaderboardColumns } from '../enums';

export interface ISalesLeaderboard {
    id: number;
    [SalesLeaderboardColumns.AgentName]: string;
    [SalesLeaderboardColumns.AgentSurname]: string;
    [SalesLeaderboardColumns.NumberOfSales]: number;
}
