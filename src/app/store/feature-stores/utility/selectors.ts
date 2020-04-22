import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UtilityState } from './state';
import { features } from 'src/app/features';

const utilityFeature = createFeatureSelector<UtilityState>(features.UTILITY_FEATURE);

export const getProducts = createSelector(
    utilityFeature,
    utilityState => utilityState.products
);

export const getGenders = createSelector(
    utilityFeature,
    utilityState => utilityState.genders
);

export const getTitles = createSelector(
    utilityFeature,
    utilityState => utilityState.titles
);

export const getPersonalDetailsLoadStatus = createSelector(
    utilityFeature,
    utilityState => utilityState.loadPersonalDetailsDropDownStatus
);

export const getBanks = createSelector(
    utilityFeature,
    utilityState => utilityState.banks
);

export const getAccountTypes = createSelector(
    utilityFeature,
    utilityState => utilityState.accountTypes
);
