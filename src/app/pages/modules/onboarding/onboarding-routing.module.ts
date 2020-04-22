import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingComponent } from './onboarding.component';
import { AuthGuard } from 'src/app/gaurds/auth.gaurd';
import { ProductSelectionComponent } from './product-selection/product-selection.component';

const routes: Routes = [
    {
        path: '',
        component: OnboardingComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OnboardingRoutingModule { }
