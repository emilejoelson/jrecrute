import { createSelector } from '@ngrx/store';
import { State } from '../../../../../state/root.state';

export const selectNewsletterState = (state: State) => state.newsletter;

export const selectSubscribeLoading = createSelector(
  selectNewsletterState,
  (state) => state.subscribeLoading
);

export const selectSubscribeSuccess = createSelector(
  selectNewsletterState,
  (state) => state.subscribeSuccess
);

export const selectSubscribeError = createSelector(
  selectNewsletterState,
  (state) => state.subscribeError
);

export const selectSubscribeResponse = createSelector(
  selectNewsletterState,
  (state) => state.subscribeResponse
);