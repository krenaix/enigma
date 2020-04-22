import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OnboardingState } from './state';
import { features } from 'src/app/features';
import { loggedInUser, getOnboardedUser } from '../authentication/selectors';
// import { UserState } from '../authentication/state';

const onboardingFeature = createFeatureSelector<OnboardingState>(features.ONBOARDING);
// const authFeature = createFeatureSelector<UserState>(features.USER_FEATURE);

export const getOnboardingStatus = createSelector(
    onboardingFeature,
    onboardingState => onboardingState.onboardingStatus
);

export const getSelectedProductId = createSelector(
    onboardingFeature,
    onboardingState => onboardingState.selectedProductId
);

export const getOnboardingStep = createSelector(
    onboardingFeature,
    onboardingState => onboardingState.onboardingStep
);

export const selectCreateUserProfile = createSelector(
    onboardingFeature,
    getOnboardedUser,
    (onboardingState, user) => {
        return {createProfile: {...onboardingState.createProfileDto}, userId: user.id};
    }
);
