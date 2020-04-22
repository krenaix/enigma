import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { features } from 'src/app/features';
import { ToastrModule } from 'ngx-toastr';
import { homeReducer } from './home.reducer';
import { HomeEffects } from './home.effects';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(features.DASHBOARD, homeReducer),
        EffectsModule.forFeature([HomeEffects]),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-top-center',
            tapToDismiss: true,
            closeButton: true,
          })
    ],
})
export class HomeStoreModule {}
