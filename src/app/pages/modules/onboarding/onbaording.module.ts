import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe  } from '@angular/common';

import { OnboardingComponent } from './onboarding.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';
import { OnboardingRoutingModule } from './onboarding-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnigmaOnboardingPersonalDetailsComponent } from './personal-details/personal-details.component';
import { EnigmaBankDetailsControlComponent } from './bank-details/bank-deatils.component';


@NgModule({
  declarations: [
    OnboardingComponent,
    ProductSelectionComponent,
    EnigmaOnboardingPersonalDetailsComponent,
    EnigmaBankDetailsControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OnboardingRoutingModule,
    MaterialModule
  ],
  entryComponents: [// add here for matmodal to pick up
  ],
  providers: [DatePipe, CurrencyPipe]
})
export class OnboardingModule { }
