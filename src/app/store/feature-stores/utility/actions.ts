import { createAction, props } from '@ngrx/store';
import { IProduct, ITitles, IGender, IBanks, IAccountType } from 'src/app/model/interfaces';

export const loadProducts = createAction('[Load Products] Load Products');
export const loadProductsSuccessful = createAction('[Load Products Successful] Load Products Successful', props<{products: IProduct[]}>());
export const loadProductsFailed = createAction('[Load Products Failed] Load Products Failed');

export const loadTitles = createAction('[Load Titles] Load Titles');
export const loadTitlesSuccessful = createAction('[Load Titles Successful] Load Titles Successful', props<{titles: ITitles[]}>());
export const loadTitlesFailed = createAction('[Load Titles Failed] Load Titles Failed');

export const loadGenders = createAction('[Load Genders] Load Genders');
export const loadGendersSuccessful = createAction('[Load Genders Successful] Load Genders Successful', props<{genders: IGender[]}>());
export const loadGendersFailed = createAction('[Load Genders Failed] Load Genders Failed');

export const loadPersonalDetailsDropDowns = createAction('[Load Personal Details Dropdowns] Load Personal Details Dropdowns');
export const loadPersonalDetailsDropDownsSuccessfully = createAction('[Load Personal Details Dropdowns Successfully] Load Personal Details Dropdowns Successfully');
export const failedToLoadPersonalDetailsDropDowns = createAction('[Failed to Load Personal Details Dropdowns] Failed to Load Personal Details Dropdowns');

export const loadBanks = createAction('[Load Banks] Load Banks');
export const loadBanksSuccessful = createAction('[Load Banks Successful] Load Banks Successful', props<{banks: IBanks[]}>());
export const loadBanksFailed = createAction('[Load Banks Failed] Load Banks Failed');

export const loadAccountTypes = createAction('[Load Account Types] Load Account Types');
export const loadAccountTypesSuccessful = createAction('[Load Account Types Successful] Load Account Types Successful', props<{accountTypes: IAccountType[]}>());
export const loadAccountTypesFailed = createAction('[Load Account Types Failed] Load Account Types Failed');
