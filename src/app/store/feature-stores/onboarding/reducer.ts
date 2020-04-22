import { createReducer, on, State, Action } from '@ngrx/store';
import { initialOnboardingState, OnboardingState } from './state';
import * as onboardingActions from './actions';
import { StatusEnum } from 'src/app/model/enums';
import { log_out } from '../authentication/actions';

const reducer = createReducer(
  initialOnboardingState,
  on(onboardingActions.setSelectedProductId, (state, { productId }) => ({
    ...state,
    selectedProductId: productId,
    createProfileDto: {
      ...state.createProfileDto,
      productId
    }
  })),
  on(onboardingActions.setPersonalDetails, (state, { personalDetails }) => ({
    ...state,
    createProfileDto: {
      ...state.createProfileDto,
      personalDetails
    }
  })),
  on(onboardingActions.setBankDetails, (state, { bankDetails }) => ({
    ...state,
    createProfileDto: {
      ...state.createProfileDto,
      bankDetails
    }
  })),
  on(onboardingActions.createUserProfile, state => ({
    ...state,
    onboardingStatus: StatusEnum.Busy
  })),
  on(onboardingActions.createUserProfileFailed, state => ({
    ...state,
    onboardingStatus: StatusEnum.Failed
  })),
  on(onboardingActions.createUserProfileSucceeded, (state, { user }) => ({
    ...initialOnboardingState,
    onboardingStatus: StatusEnum.Done
  }))
);

export function onboardingReducer(
  state: OnboardingState | undefined,
  action: Action) {
  return reducer(state, action);
}
