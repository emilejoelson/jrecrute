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

export const selectAllSubscribers = createSelector(
  selectNewsletterState,
  (state) => state.subscribers
);

export const selectNewsletterLoading = createSelector(
  selectNewsletterState,
  (state) => state.subscribeLoading
);

export const selectNewsletterError = createSelector(
  selectNewsletterState,
  (state) => state.subscribeError
);

export const selectConfirmedSubscribers = createSelector(
  selectAllSubscribers,
  (subscribers) => subscribers.filter((subscriber) => subscriber.isConfirmed)
);

export const selectUnconfirmedSubscribers = createSelector(
  selectAllSubscribers,
  (subscribers) => subscribers.filter(subscriber => !subscriber.isConfirmed)
);

export const selectSubscribersCount = createSelector(
  selectAllSubscribers,
  (subscribers) => subscribers.length
);

export const selectConfirmedCount = createSelector(
  selectConfirmedSubscribers,
  (subscribers) => subscribers.length
);

export const selectUnconfirmedCount = createSelector(
  selectUnconfirmedSubscribers,
  (subscribers) => subscribers.length
);