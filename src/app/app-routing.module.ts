import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './gaurds/auth.gaurd';
import { IsSetUpGuard } from './gaurds/is-set-up.gaurd';
import { SignUpComponent } from './pages/signup/signup.component';
import { HomeGuard } from './gaurds/home.gaurd';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/modules/onboarding/onbaording.module').then(m => m.OnboardingModule),
    canActivate: [AuthGuard],
    data: { origin: 'onboarding' }
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard, HomeGuard],
    data: { origin: 'home' }
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
