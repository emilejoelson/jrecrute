import { createReducer, on } from '@ngrx/store';
import { initialAuthenticatedState } from '../manage-user.state';
import { AuthUsersActions } from '../actions/manage-users.actions';

export const authenticatedReducer = createReducer(
  initialAuthenticatedState,

  on(AuthUsersActions.loadAuthUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthUsersActions.loadAuthUsersSuccess, (state, { response }) => ({
    ...state,
    authUsers: response.data,
    pagination: response.pagination,
    loading: false,
    error: null,
  })),

  on(AuthUsersActions.loadAuthUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
