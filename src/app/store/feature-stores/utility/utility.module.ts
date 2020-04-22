import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { features } from 'src/app/features';
import { utilityReducer } from './reducer';
import { ToastrModule } from 'ngx-toastr';
import { UtilityEffects } from './effects';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(features.UTILITY_FEATURE, utilityReducer),
        EffectsModule.forFeature([UtilityEffects]),
    ],
})
export class UtilityStoreModule {}
