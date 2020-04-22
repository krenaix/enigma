import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Routes } from '../../routes';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/model/interfaces';
import { isTokenValid } from 'src/app/store/feature-stores/authentication/selectors';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private httpClient: HttpClient, private store$: Store<{}>) {
    }

    authenticate(email: string, password: string) {

       return this.httpClient.put<IUser>(`${Routes.AUTHENTICATE}`, null, {
            params: {
                email,
                password
            }
        }).pipe(
            catchError((error) => {
                console.log(error);
                return of(null);
            })
        );
    }

    register(email: string, password: string) {

        return this.httpClient.post<IUser>(`${Routes.REGISTER}`, null, {
             params: {
                 email,
                 password
             }
         });
     }

    // reset(passwordReset: IPasswordReset) {

    //     return this.httpClient.post<boolean>(`${Routes.RESET_PASSWORD}`, passwordReset);
    //  }

    //  resetAnonymous(uniqueKey: string, newPassword: string) {

    //     return this.httpClient.post<boolean>(`${Routes.RESET_PASSWORD_ANONYMOUS}`, null, {
    //         params: {
    //             key: uniqueKey,
    //             newPassword: newPassword
    //         }
    //     });
    //  }

    //  forgotPassword(email: string) {

    //     return this.httpClient.post<boolean>(`${Routes.FORGOT_PASSWORD}`, null, {
    //         params: {
    //             email
    //         }
    //     });
    //  }

    //  isResetLinkValid(key: string) {
    //      return this.httpClient.get<boolean>(`${Routes.IS_RESET_LINK_VALID}`, {
    //          params: {
    //              key
    //          }
    //      });
    //  }

     isAuthenticated(): Observable<boolean> {
        return this.store$.select(isTokenValid);
    }
}
