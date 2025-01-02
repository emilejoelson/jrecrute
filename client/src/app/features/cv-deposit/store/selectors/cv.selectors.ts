import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/cv.reducer';
import { ROOT_FEATURE_KEY } from '../../../../state/root.state';


const selectRoot = createFeatureSelector<UserState>(ROOT_FEATURE_KEY);
export const getUser = createSelector(
  selectRoot,
  (state: UserState) => state.user
);

export const getUsers = createSelector(
  selectRoot,
  (state: UserState) => state.users
);

// export const selectShowCongratulationPopup = createSelector(
//   selectRoot,
//   (state: UserState) => state.showCongratulationPopup
// );

// export const selectCongratulationData = createSelector(
//   selectRoot,
//   (state: UserState) => state.congratulationData
// );