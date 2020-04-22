import { Component, Input, OnInit, Renderer2, forwardRef, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

import * as _ from 'lodash';
import { FormControl, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, take, mergeMap, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subscription, of, from } from 'rxjs';
import { OnboardingService } from 'src/app/services';
import { ToastrService } from 'ngx-toastr';
import { IDNumberValidatorFn } from 'src/app/shared/validators';
import { IPersonalDetails } from 'src/app/model/interfaces/Ipersonal-details.interface';
import { getGenders, getTitles } from 'src/app/store/feature-stores/utility/selectors';
import { loadPersonalDetailsDropDowns } from 'src/app/store/feature-stores/utility/actions';
import { setPersonalDetails } from 'src/app/store/feature-stores/onboarding/actions';

@Component({
    selector: 'app-enigma-onboarding-personal-details',
    templateUrl: './personal-details.component.html',
    styleUrls: ['./personal-details.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EnigmaOnboardingPersonalDetailsComponent),
            multi: true
        }
    ]
})
export class EnigmaOnboardingPersonalDetailsComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    private onTouch: () => void;
    private onModelChange: (personalDetails: IPersonalDetails) => void;

    genders$ = this.store$.select(getGenders);
    titles$ = this.store$.select(getTitles);


    fcName = new FormControl('', [Validators.required]);
    fcSurname = new FormControl('', [Validators.required]);
    fcId = new FormControl('', [IDNumberValidatorFn, Validators.required]);
    fcGender = new FormControl('', [Validators.required]);
    fcReferrerCellNumber = new FormControl('', [Validators.required]);
    fcCellNumber = new FormControl('', [Validators.required]);
    fcTitleId = new FormControl('', [Validators.required]);
    isIdNumberValid = true;
    doesIdNumberExists = false;

    idGender = new FormControl('');

    memberExists$ = this.fcId.valueChanges.pipe(
        debounceTime(0),
        distinctUntilChanged(),
        mergeMap((value) => this.onboardingService.checkMemberExists(value)),
        tap(result => {

            this.doesIdNumberExists = result === true ? true : false;
            if (result) {
                this.toastsService.error('The ID Number entered already exists, please enter a valid Id Number');
            } else {
                this.savePersonalDetails(null);

            }
        })
    );

    subscription = new Subscription();

    constructor(private renderer: Renderer2, private store$: Store<{}>, public onboardingService: OnboardingService,
                private toastsService: ToastrService) {
    }
    ngOnInit() {
        this.subscription.add(this.fcName.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.savePersonalDetails(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.fcSurname.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.savePersonalDetails(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.memberExists$.subscribe());

        this.subscription.add(this.fcGender.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {

                    this.savePersonalDetails(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.fcReferrerCellNumber.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.savePersonalDetails(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.fcCellNumber.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.savePersonalDetails(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.fcTitleId.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.savePersonalDetails(null);
                }
            })
        ).subscribe());

    }

    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    writeValue(obj: any): void {
        // this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {

    }

    checkFieldsValid() {
        if (!this.doesIdNumberExists && this.fcGender.valid && this.fcId.valid && this.fcReferrerCellNumber.valid && this.fcCellNumber.valid && this.fcName.valid && this.fcSurname.valid && this.fcTitleId.valid) {
            return true;
        } else {
            return false;
        }
    }

    savePersonalDetails(event) {
        if (this.checkFieldsValid()) {
            const personalDetails: IPersonalDetails = {
                genderId: this.fcGender.value,
                idNumber: this.fcId.value,
                referrerCellNumber: this.fcReferrerCellNumber.value,
                name: this.fcName.value,
                surname: this.fcSurname.value,
                titleId: this.fcTitleId.value,
                cellphoneNumber: this.fcCellNumber.value
            };
            this.store$.dispatch(setPersonalDetails({ personalDetails }));
            this.onModelChange(personalDetails);
            this.onTouch();
        } else {
            this.store$.dispatch(setPersonalDetails({ personalDetails: null }));
            this.onModelChange(null);
            this.onTouch();
        }
    }

    pasted(event) {
        this.savePersonalDetails(null);
    }
}
