import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { createUserProfile, createUserProfileSucceeded, createUserProfileFailed } from './actions';
import { Router } from '@angular/router';
import { selectCreateUserProfile } from './selectors';
import { OnboardingService } from 'src/app/services';
import { loggedInUser, getOnboardedUser, getUser } from '../authentication/selectors';

@Injectable()
export class OnboardingEffects {

    constructor(
        private actions$: Actions,
        private store$: Store<{}>,
        private router: Router,
        private onboardingService: OnboardingService
    ) { }

    createUserProfile$ = createEffect(() => this.actions$.pipe(
        ofType(createUserProfile),
        withLatestFrom(this.store$.select(selectCreateUserProfile), this.store$.select(getUser)),
        mergeMap(([payload, createUserProfileobj, onboardedUser]) =>
        this.onboardingService.createUserProfile(createUserProfileobj.createProfile, createUserProfileobj.userId, onboardedUser.id)
            .pipe(
                map(result => result),
                catchError((error) => of(null))
            )),
        tap(result => {
            if (result) {
                this.router.navigate(['home']);
                this.store$.dispatch(createUserProfileSucceeded({user: result}));
            } else {
                this.store$.dispatch(createUserProfileFailed());
            }
        }),
        catchError(error => of(createUserProfileFailed()))
    ), { dispatch: false });
}
