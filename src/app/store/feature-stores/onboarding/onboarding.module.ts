import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { features } from 'src/app/features';
import { onboardingReducer } from './reducer';
import { ToastrModule } from 'ngx-toastr';
import { OnboardingEffects } from './effects';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(features.ONBOARDING, onboardingReducer),
        EffectsModule.forFeature([OnboardingEffects]),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-center',
            tapToDismiss: true,
            closeButton: true,
          })
    ],
})
export class OnboardingStoreModule {}
