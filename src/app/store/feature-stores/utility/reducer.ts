import { createReducer, on, State, Action } from '@ngrx/store';
import { initialUtilityState, UtilityState } from './state';
import * as utilityActions from './actions';
import { StatusEnum } from 'src/app/model/enums';
import { log_out } from '../authentication/actions';

const reducer = createReducer(
  initialUtilityState,
  on(utilityActions.loadProducts, state => ({
    ...state,
    loadProductsStatus: StatusEnum.Busy
  })),
  on(utilityActions.loadProductsSuccessful, (state, { products }) => ({
    ...state,
    products,
    loadProductsStatus: StatusEnum.Done
  })),
  on(utilityActions.loadProductsFailed, state => ({
    ...state,
    loadProductsStatus: StatusEnum.Failed
  })),
  on(utilityActions.loadPersonalDetailsDropDowns, state => ({
    ...state,
    loadPersonalDetailsDropDownStatus: StatusEnum.Busy
  })),
  on(utilityActions.loadPersonalDetailsDropDownsSuccessfully, state => ({
    ...state,
    loadPersonalDetailsDropDownStatus: StatusEnum.Done
  })),
  on(utilityActions.failedToLoadPersonalDetailsDropDowns, state => ({
    ...state,
    loadPersonalDetailsDropDownStatus: StatusEnum.Failed
  })),
  on(utilityActions.loadGendersSuccessful, (state, { genders }) => ({
    ...state,
    genders
  })),
  on(utilityActions.loadGendersFailed, state => ({
    ...state,
    genders: []
  })),
  on(utilityActions.loadTitlesSuccessful, (state, { titles }) => ({
    ...state,
    titles
  })),
  on(utilityActions.loadTitlesFailed, state => ({
    ...state,
    titles: []
  })),
  on(utilityActions.loadBanksSuccessful, (state, { banks }) => ({
    ...state,
    banks
  })),
  on(utilityActions.loadAccountTypesSuccessful, (state, { accountTypes }) => ({
    ...state,
    accountTypes
  }))
);

export function utilityReducer(
  state: UtilityState | undefined,
  action: Action) {
  return reducer(state, action);
}
