import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './gaurds/auth.gaurd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UserStoreModule } from './store/feature-stores/authentication/authentication.module';
import { IsSetUpGuard } from './gaurds/is-set-up.gaurd';
import { SignUpComponent } from './pages/signup/signup.component';
import { OnboardingModule } from './pages/modules/onboarding/onbaording.module';
import { AuthInterceptorService } from './services/auth-service/auth-interceptor.service';
import { UtilityStoreModule } from './store/feature-stores/utility/utility.module';
import { OnboardingStoreModule } from './store/feature-stores/onboarding/onboarding.module';
import { HomeStoreModule } from './store/feature-stores/home/home.module';
import { HomeGuard } from './gaurds/home.gaurd';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      tapToDismiss: true,
      closeButton: true,
    }),
    BrowserAnimationsModule,
    MaterialModule,
    UserStoreModule,
    SharedModule,
    OnboardingModule,
    UtilityStoreModule,
    OnboardingStoreModule,
    HomeStoreModule
  ],
  providers: [
    AuthGuard,
    IsSetUpGuard,
    HomeGuard,
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
