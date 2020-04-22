import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAgentSalesLeaderboard } from 'src/app/model/interfaces';
import { AgentSalesLeaderboardColumns } from 'src/app/model/enums';
import { AGENT_SALES_LEADERBOARD_COLUMNS } from 'src/app/model/constants';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-direct-downlines',
  templateUrl: './direct-downlines.component.html',
  styleUrls: ['./direct-downlines.component.scss']
})
export class DirectDownlinesComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() inDataSource: IAgentSalesLeaderboard[] = [];

  displayedColumns: AgentSalesLeaderboardColumns[] = AGENT_SALES_LEADERBOARD_COLUMNS;
  agentColumnsEnum = AgentSalesLeaderboardColumns;
  public dataSource = new MatTableDataSource<IAgentSalesLeaderboard>([]);

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.inDataSource;
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    // console.log('agent leaderboard on changes', this.dataSource);
    this.dataSource.data = this.inDataSource;
  }

}
