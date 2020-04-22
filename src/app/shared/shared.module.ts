import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ModalModule, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
// import { UiSwitchModule } from 'ngx-toggle-switch';
import { ToastrModule } from 'ngx-toastr';

// import { EmailMyResultsComponent } from './modals/email/email.component';
import { HttpClientModule } from '@angular/common/http';
import { TopNavComponent } from './top-nav/top-nav.component';
// import { TablesModule } from './controls/tables/tables.module';
import { MaterialModule } from '../material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';




@NgModule({
    declarations: [
        TopNavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // AccordionModule.forRoot(),
        // FontAwesomeModule,
        // UiSwitchModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-center',
            tapToDismiss: true,
            closeButton: true,
        }),
        // CustomModalModule,
        // PhoenixProgressSpinnerModule,
        // TablesModule,
        MaterialModule
    ],
    providers: [DatePipe, CurrencyPipe,
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true}}],
    exports: [
        HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule, ToastrModule,
        MaterialModule, TopNavComponent
    ]
})
export class SharedModule { }
