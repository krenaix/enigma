import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/model/interfaces';

export const login = createAction('[Login] Login', props<{email: string, password: string}>());
export const login_successful = createAction('[Login Successful] Login Successful', props<{user: IUser}>());
export const login_failed = createAction('[Login Failed] Login Failed');

export const signup = createAction('[Sign Up] Sign Up', props<{email: string, password: string}>());
export const signup_successful = createAction('[Sign Up Successful] Sign Up Successful', props<{user: IUser}>());
export const signup_failed = createAction('[Sign Up Failed] Sign Up Failed');

export const log_out = createAction('[Log Out] Log Out');
