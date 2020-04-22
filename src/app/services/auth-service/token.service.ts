import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Routes } from '../../routes';
import * as jwtDecode from 'jwt-decode';
import { JWTAccessToken } from 'src/app/model/interfaces';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    tokenExpired(token: string) {
        console.group('tokenExpired');
        // const token = localStorage.getItem('token');
        console.log('checking token validity');
        // console.log(token);
        // if (!token) {
        //     // console.log('no token');
        //     return true;
        // }

        if (!token) {
            // console.log('no token');
            return false;
        }

        try {
            const tokenObject = jwtDecode<{ exp: number }>(token);

            const expiryDateInSecondsSinceEpoch = tokenObject.exp;
            console.log(expiryDateInSecondsSinceEpoch);
            const now = new Date();
            const nowInSecondsSinceEpoch = Math.floor(now.getTime() / 1000);
            console.log(nowInSecondsSinceEpoch);
            console.groupEnd();
            return nowInSecondsSinceEpoch > expiryDateInSecondsSinceEpoch;
        } catch (e) {
            return false;
        }
    }

    tokenValid(token: string) {
        // const token = localStorage.getItem('token');
        return token && !this.tokenExpired(token);
    }

    decodeToken(token?: string): JWTAccessToken {
        if (!token) {
            return null;
        }

        try {
            const decToken = jwtDecode<JWTAccessToken>(token);
            return { sub: decToken.sub };
        } catch {
            return null;
        }
    }

    // export const extractMasterUserId = (token: string): string => {
    //     const decoded = decodeToken(token);
    //     return decoded.sub;
    // };
    // constructor(private httpClient: HttpClient) {
    // }

    // isAuthenticated(token: string) {
    // }
}
