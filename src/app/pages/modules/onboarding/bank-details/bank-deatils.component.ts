import { Component, Input, OnInit, Renderer2, forwardRef, Output, EventEmitter, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';

import * as _ from 'lodash';
import { FormControl, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IBankDetail } from 'src/app/model/interfaces';
import { Store } from '@ngrx/store';
import { getBanks, getAccountTypes } from 'src/app/store/feature-stores/utility/selectors';
import { map, take, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { setBankDetails } from 'src/app/store/feature-stores/onboarding/actions';

@Component({
    selector: 'app-enigma-onboarding-bank-details',
    templateUrl: './bank-deatils.component.html',
    styleUrls: ['./bank-deatils.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EnigmaBankDetailsControlComponent),
            multi: true
        }
    ]
})
export class EnigmaBankDetailsControlComponent implements OnInit, OnChanges, ControlValueAccessor, OnDestroy, AfterViewInit {

    private onTouch: () => void;
    private onModelChange: (bankDetails: IBankDetail) => void;

    banks$ = this.store$.select(getBanks);
    accountTypes$ = this.store$.select(getAccountTypes);

    fcAccNumber = new FormControl('', [Validators.required]);
    fcBankName = new FormControl('', [Validators.required]);
    fcaccHolderName = new FormControl('', Validators.required);
    fcDebitOrderDay = new FormControl('', [Validators.required, Validators.min(0), Validators.max(31)]);
    fcAccountTypeId = new FormControl('', [Validators.required]);
    // fcBankId= new FormControl('', [Validators.required]);

    subscription = new Subscription();

    constructor(private renderer: Renderer2, private store$: Store<{}>) {
    }
    ngOnInit() {
        this.subscription.add(this.fcAccNumber.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.saveBankDetail(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.fcBankName.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.saveBankDetail(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.fcaccHolderName.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.saveBankDetail(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.fcDebitOrderDay.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.saveBankDetail(null);
                }
            })
        ).subscribe());

        this.subscription.add(this.fcAccountTypeId.valueChanges.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(val => {
                if (val) {
                    this.saveBankDetail(null);
                }
            })
        ).subscribe());
    }
    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.onActivate(null);
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
    checkFieldValid() {
        if (this.fcAccNumber.valid && this.fcAccountTypeId.valid && this.fcBankName.valid &&
            this.fcDebitOrderDay.valid && this.fcaccHolderName.valid) {
            return true;
        } else {
            return false;
        }
    }

    saveBankDetail(event) {
        if (this.checkFieldValid()) {
            const bankDetail: IBankDetail = {
                id: 0,
                accountHolderName: this.fcaccHolderName.value,
                accountNumber: this.fcAccNumber.value.toString(),
                bankName: this.fcBankName.value,
                accountTypeId: this.fcAccountTypeId.value.toString(),
                branchName: '',
                branchNumber: '',
                createdDate: (new Date()).toString(),
                debitOrderDay: this.fcDebitOrderDay.value.toString()
            };
            this.store$.dispatch(setBankDetails({bankDetails: bankDetail}));
            this.onModelChange(bankDetail);
            this.onTouch();
        } else {
            this.store$.dispatch(setBankDetails({bankDetails: null}));
            this.onModelChange(null);
            this.onTouch();
        }
    }

    pasted(event) {
        this.saveBankDetail(null);
    }

    onActivate(event) {
        const scrollToTop = window.setInterval(() => {
            const pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
        // window.scrollTo(0, 0);
    }
}
