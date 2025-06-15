import { createSelector } from '@ngrx/store';
import { State } from '../../../../state/root.state';
import { RecruitmentState } from '../reducers/recruitment.reducer';

const selectRoot = (state: State) => state.recruitment;

export const getIsRecruitmentSubmitting = createSelector(
  selectRoot,
  (state: RecruitmentState) => state.submitting
);
