import { createReducer, on } from '@ngrx/store';
import { NewsletterState } from '../newsletter.state';
import { NewsletterActions } from '../actions/newsletter.actions';
import { selectSubscribeLoading } from '../selectors/newsletter.selectors';
import { state } from '@angular/animations';

export const initialNewsletterState: NewsletterState = {
  subscribeLoading: false,
  subscribeSuccess: false,
  subscribeError: null,
  subscribeResponse: null,
  subscribers: [],

  allSubscribers: [],
  subscribersLoading: false,
  subscribersError: null,

  usersWithCv: [],
  usersLoading: false,
  usersError: null,
};

export const newsletterReducer = createReducer(
  initialNewsletterState,

  on(NewsletterActions.subscribe, (state) => ({
    ...state,
    subscribeLoading: true,
    subscribeSuccess: false,
    subscribeError: null,
    subscribeResponse: null,
  })),

  on(NewsletterActions.subscribeSuccess, (state, { response }) => ({
    ...state,
    subscribeLoading: false,
    subscribeSuccess: true,
    subscribeResponse: response,
  })),

  on(NewsletterActions.subscribeFailure, (state, { error }) => ({
    ...state,
    subscribeLoading: false,
    subscribeSuccess: false,
    subscribeError: error.error,
  })),

  on(NewsletterActions.resetSubscribeStatus, (state) => ({
    ...state,
    subscribeLoading: false,
    subscribeSuccess: false,
    subscribeError: null,
    subscribeResponse: null,
  })),
  on(NewsletterActions.loadSubscribers, (state) => ({
    ...state,
    subscribeLoading: true,
    subscribeError: null,
  })),
  on(NewsletterActions.loadSubscribersSuccess, (state, { subscribers }) => ({
    ...state,
    subscribers,
    subscribeLoading: false,
    subscribeError: null,
  })),
  on(NewsletterActions.loadSubscribersFailure, (state, { error }) => ({
    ...state,
    subscribeLoading: false,
    subscribeError: error.error,
  })),
  on(NewsletterActions.loadAllSubscribers, (state) => ({
    ...state,
    subscribersLoading: true,
    subscribersError: null,
  })),
  on(NewsletterActions.loadAllSubscribersSuccess, (state, { subscribers }) => ({
    ...state,
    allSubscribers: subscribers,
    subscribersLoading: false,
    subscribersError: null,
  })),
  on(NewsletterActions.loadAllSubscribersFailure, (state, { error }) => ({
    ...state,
    subscribersLoading: false,
    subscribersError: error.error,
  })),
  on(NewsletterActions.loadUsersWithCv, (state) => ({
    ...state,
    usersLoading: true,
    usersError: null,
  })),
  on(NewsletterActions.loadUsersWithCvSuccess, (state, { users }) => ({
    ...state,
    usersWithCv: users,
    usersLoading: false,
    usersError: null,
  })),
  on(NewsletterActions.loadUsersWithCvFailure, (state, { error }) => ({
    ...state,
    usersLoading: false,
    usersError: error.error,
  })),

  on(NewsletterActions.resetSubscribersLoading, (state) => ({
    ...state,
    subscribersLoading: false
  })),
  on(NewsletterActions.resetUsersLoading, (state) => ({
    ...state,
    usersLoading: false
  }))
);
