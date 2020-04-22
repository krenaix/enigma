import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, of, Observable } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { loadProducts, loadProductsSuccessful, loadProductsFailed, loadTitles, loadTitlesSuccessful,
  loadTitlesFailed, loadGendersSuccessful, loadPersonalDetailsDropDownsSuccessfully,
  failedToLoadPersonalDetailsDropDowns, loadPersonalDetailsDropDowns, loadBanks, loadBanksSuccessful,
  loadBanksFailed, loadAccountTypes, loadAccountTypesSuccessful, loadAccountTypesFailed } from './actions';

@Injectable()
export class UtilityEffects {

    constructor(
        private actions$: Actions,
        private utilityService: UtilityService,
        private store$: Store<{}>
      ) { }

loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.utilityService.getProducts()
      .pipe(
        map(db_products => db_products),
        catchError(() => EMPTY)
      )),
    map(payload => {
      return loadProductsSuccessful({ products: payload });
    }),
    catchError(_ => of(loadProductsFailed()))
  )
  );

  loadTitless$ = createEffect(() => this.actions$.pipe(
    ofType(loadTitles),
    mergeMap(() => this.utilityService.getTitles()
      .pipe(
        map(db_titles => db_titles),
        catchError(() => EMPTY)
      )),
    map(payload => {
      return loadTitlesSuccessful({ titles: payload });
    }),
    catchError(_ => of(loadTitlesFailed()))
  )
  );

  loadGender$ = createEffect(() => this.actions$.pipe(
    ofType(loadTitles),
    mergeMap(() => this.utilityService.getTitles()
      .pipe(
        map(db_titles => db_titles),
        catchError(() => EMPTY)
      )),
    map(payload => {
      return loadTitlesSuccessful({ titles: payload });
    }),
    catchError(_ => of(loadTitlesFailed()))
  )
  );

  loadPersonalDetailsDropDowns$ = createEffect(() => this.actions$.pipe(
    ofType(loadPersonalDetailsDropDowns),
    mergeMap(() => this.utilityService.getGenders()),
    mergeMap(genders => {
      this.store$.dispatch(loadGendersSuccessful({genders}));
      return this.utilityService.getTitles();
    }),
    mergeMap(titles => {
      this.store$.dispatch(loadTitlesSuccessful({titles}));
      return this.utilityService.getBanks();
    }),
    mergeMap(banks => {
      this.store$.dispatch(loadBanksSuccessful({banks}));
      return this.utilityService.getAccountTypes();
    }),
    mergeMap(accountTypes => {
      this.store$.dispatch(loadAccountTypesSuccessful({accountTypes}));
      return accountTypes;
    }),
    map(_ => loadPersonalDetailsDropDownsSuccessfully()),
    catchError(error =>  {
      console.group('loadPersonalDetailsDropDowns$ effect');
      console.log(error);
      console.groupEnd();
      return of(failedToLoadPersonalDetailsDropDowns());
    }
  ))
  );

  loadBanks$ = createEffect(() => this.actions$.pipe(
    ofType(loadBanks),
    mergeMap(() => this.utilityService.getBanks()
      .pipe(
        map(db_banks => db_banks),
        catchError(() => EMPTY)
      )),
    map(payload => {
      return loadBanksSuccessful({ banks: payload });
    }),
    catchError(_ => of(loadBanksFailed()))
  )
  );

  loadAccountTypes$ = createEffect(() => this.actions$.pipe(
    ofType(loadAccountTypes),
    mergeMap(() => this.utilityService.getAccountTypes()
      .pipe(
        map(db_accountTypes => db_accountTypes),
        catchError(() => EMPTY)
      )),
    map(payload => {
      return loadAccountTypesSuccessful({ accountTypes: payload });
    }),
    catchError(_ => of(loadAccountTypesFailed()))
  )
  );
}
