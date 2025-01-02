import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

// Get the root state slice
export const getSharedState = createFeatureSelector<SharedState>('shared');

export const getLoading = createSelector(
  getSharedState,
  (state: SharedState) => state.showLoading
);
