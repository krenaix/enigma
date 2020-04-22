import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/app/gaurds/auth.gaurd';
import { DashboardComponent } from './dasboard/dashboard.component';
import { HomeGuard } from 'src/app/gaurds/home.gaurd';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // redirectTo: 'dashboard',
    data: { origin: 'HomeComponent' },
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
