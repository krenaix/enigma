import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
// import { TokenService } from '../services/index';
import { Router } from '@angular/router';
// import { userToken } from '../store/feature-stores/user/selectors';
import { Store, select } from '@ngrx/store';
// import { log_out } from '../store/feature-stores/user/actions';
import { tap, switchMapTo, switchMap, map, take, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { isSetUp } from '../store/feature-stores/authentication/selectors';

@Injectable()
export class IsSetUpGuard implements CanActivate {
  TokenService: any;
  userService: any;
  // token$ = this.store$.select(userToken);
  //   constructor(private authService: AuthService, private _userService: UserService, private _router: Router) { }
  constructor(private router: Router,
    // private tokenService: TokenService,
              private store$: Store<{}>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.store$.pipe(
      select(isSetUp),
      first(),
      tap(setUpStatus => {
        if (setUpStatus) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['onboarding']);
        }
      })
    );
  }
}
