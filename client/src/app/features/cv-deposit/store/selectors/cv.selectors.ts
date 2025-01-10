import { createSelector } from '@ngrx/store';
import { State } from '../../../../state/root.state';
import { UserState } from '../reducers/cv.reducer';

const selectRoot = (state: State) => state.user;

export const getUser = createSelector(
  selectRoot,
  (state: UserState) => state.user
);

export const getUsers = createSelector(
  selectRoot,
  (state: UserState) => state.users
);

export const getIsUserSubmitting = createSelector(
  selectRoot,
  (state: UserState) => state.submitting
);

