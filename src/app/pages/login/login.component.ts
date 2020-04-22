import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, switchMap, map, startWith, catchError, switchMapTo, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { pipe, of, Subscription } from 'rxjs';
import { StatusEnum } from 'src/app/model/enums';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { loginStatus, isSetUp } from 'src/app/store/feature-stores/authentication/selectors';
import { login } from 'src/app/store/feature-stores/authentication/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginStatus$ = this.store$.select(loginStatus);

  lgForm: FormGroup;
  lgEmail: FormControl;
  lgPassword: FormControl;

  statusEnum = StatusEnum;
  invalidMessage = '';
  constructor(private router: Router, private store$: Store<{}>, private toastsService: ToastrService) {

    this.lgEmail = new FormControl('', [Validators.required, Validators.email]);
    this.lgPassword = new FormControl('', Validators.required);

    this.lgForm = new FormGroup({
      lgEmail: this.lgEmail,
      lgPassword: this.lgPassword
    });
  }
  invalid = false;
  subscriptions = new Subscription();

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
      this.store$.dispatch(login({ email: this.lgForm.value.lgEmail, password: this.lgForm.value.lgPassword }));
  }

  resetPassword() {
    this.router.navigate(['password-reset']);
  }

  navigateToForgotPasswordPage(e: MouseEvent) {
    e.preventDefault();
    this.router.navigate(['forgot-password']);
  }

}
