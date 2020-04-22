import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService, HomeService } from '../services/index';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { tap, switchMapTo, switchMap, map, take, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { userToken } from '../store/feature-stores/authentication/selectors';
import { log_out } from '../store/feature-stores/authentication/actions';
import { fetch_dashboard_totals } from '../store/feature-stores/home/home.actions';

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private router: Router,
              private store$: Store<{}>,
              private tokenService: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('dispatching fetch dashboards');
    return this.store$.pipe(
      select(userToken),
      first(),
      tap((token) => {
        // console.log(token)
        if (this.tokenService.tokenExpired(token)) {
          this.store$.dispatch(log_out());
        } else {
          this.store$.dispatch(fetch_dashboard_totals());
        }
      }),
      switchMap(token => this.tokenService.tokenExpired(token) ? of(false) : of(true))
    );
  }
}
