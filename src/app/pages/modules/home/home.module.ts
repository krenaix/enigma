import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TotalsComponent } from './dasboard/totals/totals.component';
import { DashboardComponent } from './dasboard/dashboard.component';
import { DirectDownlinesComponent } from './dasboard/direct-downlines/direct-downlines.component';


@NgModule({
    declarations: [
        LeftNavComponent,
        HomeComponent,
        TotalsComponent,
        DashboardComponent,
        DirectDownlinesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HomeRoutingModule,
        SharedModule
    ],
})
export class HomeModule { }
