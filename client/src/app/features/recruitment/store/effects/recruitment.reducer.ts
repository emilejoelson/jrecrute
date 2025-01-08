import { Action, createReducer, on } from '@ngrx/store';
import { RecruitmentRequest } from '../../data-access/models/recruitment';
import { RecruitmentFormActions } from '../actions/recruitment.actions';

export interface RecruitmentState {
  recruitment: Partial<RecruitmentRequest>;
  recruitments: RecruitmentRequest[];
}

export const initialRecruitmentState: RecruitmentState = {
  recruitment: {
    companyName: '',
    contactEmail: '',
    phoneNumber: '',
    position: '',
    needsDescription: '',
    monthlyBudget: {
      min: 0,
      max: 0,
    },
    urgency: '',
  },
  recruitments: [],
};

export const recruitmentReducer = createReducer<RecruitmentState, Action>(
  initialRecruitmentState,
  on(
    RecruitmentFormActions.submitRecruitmentForm,
    (state: RecruitmentState) => ({
      ...state,
    })
  ),
  on(
    RecruitmentFormActions.submitRecruitmentFormSuccess,
    (state: RecruitmentState, { recruitment }) => ({
      ...state,
      recruitments: [...state.recruitments, recruitment],
    })
  ),
  on(
    RecruitmentFormActions.submitRecruitmentFormFailure,
    (state: RecruitmentState, { error }) => ({
      ...state,
    })
  )
);
