import { createReducer, on } from '@ngrx/store';
import { NewsletterState } from '../newsletter.state';
import { NewsletterActions } from '../actions/newsletter.actions';

export const initialNewsletterState: NewsletterState = {
  subscribeLoading: false,
  subscribeSuccess: false,
  subscribeError: null,
  subscribeResponse: null
};

export const newsletterReducer = createReducer(
  initialNewsletterState,

  on(NewsletterActions.subscribe, (state) => ({
    ...state,
    subscribeLoading: true,
    subscribeSuccess: false,
    subscribeError: null,
    subscribeResponse: null
  })),
  
  on(NewsletterActions.subscribeSuccess, (state, { response }) => ({
    ...state,
    subscribeLoading: false,
    subscribeSuccess: true,
    subscribeResponse: response
  })),
  
  on(NewsletterActions.subscribeFailure, (state, { error }) => ({
    ...state,
    subscribeLoading: false,
    subscribeSuccess: false,
    subscribeError: error.error
  })),
  
  on(NewsletterActions.resetSubscribeStatus, (state) => ({
    ...state,
    subscribeLoading: false,
    subscribeSuccess: false,
    subscribeError: null,
    subscribeResponse: null
  }))
);