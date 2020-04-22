import { createReducer, on, State, Action } from '@ngrx/store';
import { initialUserState, UserState } from './state';
import * as authActions from './actions';
import { StatusEnum } from 'src/app/model/enums';
import { createUserProfileSucceeded } from '../onboarding/actions';

const reducer = createReducer(
    initialUserState,
    on(authActions.login, state => ({
        ...state,
        loginStatus: StatusEnum.Busy
    })),
    on(authActions.login_successful, (state, { user }) => ({
        ...state,
        loginStatus: StatusEnum.Done,
        user
    })),
    on(authActions.login_failed, state => ({
        ...state,
        loginStatus: StatusEnum.Failed
    })),
    on(authActions.signup, state => ({
        ...state,
        signUpStatus: StatusEnum.Busy
    })),
    on(authActions.signup_successful, (state, { user }) => ({
        ...state,
        signUpStatus: StatusEnum.Done,
        onboardedUser: user,
        loginStatus: StatusEnum.Done
    })),
    on(authActions.signup_failed, state => ({
        ...state,
        signUpStatus: StatusEnum.Failed
    })),
    on(createUserProfileSucceeded, (state, { user }) => ({
        ...state,
        user: {
            ...state.user,
            isSetUp: true,
            name: user.name,
            surname: user.surname
        }
    }))
);

export function userReducer(
    state: UserState | undefined,
    action: Action) {
    return reducer(state, action);
}
