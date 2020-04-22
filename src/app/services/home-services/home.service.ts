import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes } from 'src/app/routes';
import { IDashboardTotals } from 'src/app/model/interfaces/Idashboard-totals.interface';
import { IDashboardDto } from 'src/app/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  fetchDownlineTotals(userId: number) {
    return this.httpClient.get<IDashboardDto>(`${Routes.FETCH_DOWNLINES_TOTALS}`, {
      params: {
        userId: userId.toString()
      }
    });
  }
}
