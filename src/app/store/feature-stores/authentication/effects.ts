import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap, take, combineLatest, switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { login, login_failed, login_successful, log_out, signup, signup_successful, signup_failed } from '../authentication/actions';

@Injectable()
export class UserEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        mergeMap((payload) => {
            console.log('login effect');
            return this.authService.authenticate(payload.email, payload.password
            );
        }),
        map(user => {
            console.log('user is', user);
            if (user) {
                return login_successful({ user });
            } else {
                return login_failed();
            }
        }),
        catchError(error => {
            console.log('error is', error);
            return of(login_failed());
        })
    )
    );

    register$ = createEffect(() => this.actions$.pipe(
        ofType(signup),
        mergeMap((payload) => this.authService.register(payload.email, payload.password)
            .pipe(
                map(user => user),
                catchError((error) => of(null))
            )
        ),
        map(user => {
            if (user) {

                console.log('created user', user);
                return signup_successful({ user });
            } else {
                return signup_failed();
            }
        }),
        catchError(error => of(signup_failed()))
    )
    );

    loginSuccessful$ = createEffect(() => this.actions$.pipe(
        ofType(login_successful),
        tap(payload => {
            if (payload.user.isSetUp) {
                this.router.navigate(['home']);
            } else {
                this.router.navigate(['onboarding']);
            }
        })
    ), { dispatch: false }
    );

    signupSuccessful$ = createEffect(() => this.actions$.pipe(
        ofType(signup_successful),
        tap(payload => {
            this.router.navigate(['onboarding']);
        })
    ), { dispatch: false }
    );


    logOut$ = createEffect(() => this.actions$.pipe(
        ofType(log_out),
        tap(() => {
            console.log('loggout effect');
            this.router.navigate(['login']);
        })
    ), { dispatch: false }
    );


    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router,
        private toastsService: ToastrService,
        private store$: Store<{}>
    ) { }
}
