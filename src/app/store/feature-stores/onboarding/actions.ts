import { createAction, props } from '@ngrx/store';
import { IPersonalDetails, IBankDetail, IUser } from 'src/app/model/interfaces';

export const setSelectedProductId = createAction('[Set Selected Product Id] Set Selected Product Id', props<{productId: number}>());
export const setPersonalDetails = createAction('[Set Personal Details] Set Personal Details', props<{personalDetails: IPersonalDetails}>());
export const setBankDetails = createAction('[Set Bank Details] Set Bank Details', props<{bankDetails: IBankDetail}>());

export const createUserProfile = createAction('[Create User Profile] Create User Profile');
export const createUserProfileSucceeded = createAction('[Create User Profile Succeeded] Create User Profile Succeeded', props<{user: IUser}>());
export const createUserProfileFailed = createAction('[Create User Profile Failed] Create User Profile Failed');
