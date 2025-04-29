import { createSelector } from '@ngrx/store';
import { AuthState } from '../auth.state';
import { State } from '../../../../state/root.state';


const selectAuthState = (state: State) => state.authentication;

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsSignupSuccess = createSelector(
  selectAuthState,
  (state: AuthState) => state.isSignupSuccess
);

export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.role || null
);

export const selectUserRoles = createSelector(
  selectUser,
  (user) => user?.roles || null
);

export const selectIsAdmin = createSelector(
  selectUser,
  (user) => user?.role === 'admin' || user?.roles?.some(role => role.name === 'admin') || false
);

