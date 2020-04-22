import { Component, OnInit, HostListener, AfterContentInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/store/feature-stores/authentication/selectors';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { loadProducts, loadPersonalDetailsDropDowns } from 'src/app/store/feature-stores/utility/actions';
import { MatStepper } from '@angular/material/stepper';
import { ICreateProfile } from 'src/app/model/interfaces';
import { createUserProfile } from 'src/app/store/feature-stores/onboarding/actions';
import { getOnboardingStatus } from 'src/app/store/feature-stores/onboarding/selectors';
import { StatusEnum } from 'src/app/model/enums';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})


export class OnboardingComponent implements OnInit, AfterViewInit, OnDestroy {
 @ViewChild('stepper', {static: true}) stepper: MatStepper;
    user$ = this.store$.select(getUser);
    fcProductId = new FormControl('', Validators.required);
    fcPersonalDetails = new FormControl('', Validators.required);
    fcBankDetails = new FormControl('', Validators.required);

    onboardingStatus$ = this.store$.select(getOnboardingStatus).pipe(
      tap(status => {
        if (status === StatusEnum.Done) {
          this.toastsService.success('User profile has been created successfully');
        } else if (status === StatusEnum.Failed) {
          this.toastsService.error('An error occurred');
        }
      })
    );

    status = StatusEnum;

    subscriptions = new Subscription();
  constructor(private activatedRoute: ActivatedRoute, private store$: Store<{}>, private toastsService: ToastrService) {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.store$.dispatch(loadPersonalDetailsDropDowns());
    this.subscriptions.add(this.fcProductId.valueChanges.pipe(
      // distinctUntilChanged(),
      tap(_ => {
        this.stepper.next();
      })
    ).subscribe());
    this.store$.dispatch(loadProducts());
  }
  ngAfterViewInit() {
    this.onActivate(null);
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

  submit() {
    this.store$.dispatch(createUserProfile());
  }
}
