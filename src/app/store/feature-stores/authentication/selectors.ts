import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './state';
import { features } from 'src/app/features';

const userFeature = createFeatureSelector<UserState>(features.USER_FEATURE);

export const userToken = createSelector(
    userFeature,
    userState => userState.user ? userState.user.token : null
);

export const loginStatus = createSelector(
    userFeature,
    userState => userState.loginStatus
);

export const signupStatus = createSelector(
    userFeature,
    userState => userState.signUpStatus
);

export const isSetUp = createSelector(
    userFeature,
    userState => {
        if (userState.user) {
            return userState.user.isSetUp;
        } else {
            return false;
        }
    }
);

export const getUser = createSelector(
    userFeature,
    userState => userState.user
);

export const isTokenValid = createSelector(
    userFeature,
    userState => userState.user.token !== ''
);

export const loggedInUser = createSelector(
    userFeature,
    userState => userState.user
);

export const getOnboardedUser = createSelector(
    userFeature,
    userState => userState.onboardedUser
);
