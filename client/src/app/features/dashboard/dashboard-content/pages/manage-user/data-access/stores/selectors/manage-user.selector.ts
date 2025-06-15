import { createSelector } from '@ngrx/store';
import { State } from '../../../../../../../../state/root.state';

export const selectAuthUsersState = (state: State) => state.authenticated;

export const selectAuthUsers = createSelector(
  selectAuthUsersState,
  (state) => state.authUsers
);

export const selectAuthUsersPagination = createSelector(
  selectAuthUsersState,
  (state) => state.pagination
);

export const selectAuthUsersLoading = createSelector(
  selectAuthUsersState,
  (state) => state.loading
);

export const selectAuthUsersError = createSelector(
  selectAuthUsersState,
  (state) => state.error
);

export const selectAuthUsersCount = createSelector(
  selectAuthUsers,
  (authUsers) => authUsers.length
);
