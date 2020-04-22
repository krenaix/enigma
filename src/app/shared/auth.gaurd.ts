import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from '../services/index';
import { Router } from '@angular/router';
import { userToken } from '../store/feature-stores/authentication/selectors';
import { Store, select } from '@ngrx/store';
import { log_out } from '../store/feature-stores/authentication/actions';
import { tap, switchMapTo, switchMap, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
  TokenService: any;
  userService: any;
  token$ = this.store$.select(userToken);
  //   constructor(private authService: AuthService, private _userService: UserService, private _router: Router) { }
  constructor(private router: Router, private tokenService: TokenService, private store$: Store<{}>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // const isAdminPage = localStorage.getItem('adminSignUp');
    const uniqueKey = localStorage.getItem('uniqueKey');
    let token = '';
    return this.store$.pipe(
      select(userToken),
      take(1),
      tap((token) => {
        // console.log(token)
        if (!this.tokenService.tokenExpired(token)) {
          // console.log('not expired');
          // if(environment.enableLandingPage) {
          //   this.router.navigate(['dashboard']);
          // }
        }
         else {
          this.store$.dispatch(log_out());
          // console.log('logged out');
        }
      }),
      switchMap(token => this.tokenService.tokenExpired(token) ? of(false) : of(true))
    )
  }
}
