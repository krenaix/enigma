import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Routes } from '../../routes';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IProduct, ITitles, IGender, IAccountType, IBanks } from 'src/app/model/interfaces';


@Injectable({
    providedIn: 'root'
})
export class UtilityService {

    constructor(private httpClient: HttpClient, private store$: Store<{}>) {
    }
    getProducts() {
        return this.httpClient.get<IProduct[]>(`${Routes.PRODUCTS}`);
    }

    getTitles() {
        return this.httpClient.get<ITitles[]>(`${Routes.TITLES}`);
    }

    getGenders() {
        return this.httpClient.get<IGender[]>(`${Routes.GENDERS}`);
    }

    getBanks() {
        return this.httpClient.get<IBanks[]>(`${Routes.BANKS}`);
    }

    getAccountTypes() {
        return this.httpClient.get<IAccountType[]>(`${Routes.ACCOUNT_TYPES}`);
    }
}
