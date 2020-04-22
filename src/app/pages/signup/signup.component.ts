import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, switchMap, map, startWith, catchError, switchMapTo, debounceTime, distinctUntilChanged, debounce } from 'rxjs/operators';
import { pipe, of, Subscription } from 'rxjs';
import { StatusEnum } from 'src/app/model/enums';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { signup } from 'src/app/store/feature-stores/authentication/actions';
import { signupStatus } from 'src/app/store/feature-stores/authentication/selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  suForm  = new FormGroup({
    suEmail: new FormControl('', [Validators.required, Validators.email]),
    suPassword: new FormControl('', [Validators.required]),
    suConfirmPassword: new FormControl('', Validators.required)
  });

  signupStatus$ = this.store$.select(signupStatus);
  passwordCheck$ = this.suForm.get('suPassword').valueChanges.pipe(
      tap(password => {
          if (this.suForm.get('suConfirmPassword').value) {
            if (this.suForm.get('suConfirmPassword').value  !== password) {
                this.suForm.get('suConfirmPassword').setErrors({
                    notSame: true
                });
            } else {
              this.suForm.get('suConfirmPassword').setErrors(null);
            }
          }
      }),
      switchMap(password => {
          if (this.suForm.get('suConfirmPassword').dirty && this.suForm.get('suConfirmPassword').touched) {
            return of(password === this.suForm.get('suConfirmPassword').value);
          } else {
              return of(true);
          }
      })
  );

  arePasswordsSame$ = this.suForm.get('suConfirmPassword').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(100),
      switchMap(confirmedPassword => {
          const password = this.suForm.get('suPassword').value;
          if (confirmedPassword  !== password) {
              this.suForm.get('suConfirmPassword').setErrors({
                  notSame: true
              });
          } else {
            this.suForm.get('suPassword').updateValueAndValidity();
            this.suForm.get('suConfirmPassword').setErrors(null);
          }
          return of(confirmedPassword === password);
      })
  );

  status = StatusEnum;
  invalidMessage = '';

  constructor(private router: Router, private store$: Store<{}>, private toastsService: ToastrService) {}
  invalid = false;
  subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(this.passwordCheck$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
      this.store$.dispatch(signup({ email: this.suForm.value.suEmail, password: this.suForm.value.suPassword }));
  }
}
