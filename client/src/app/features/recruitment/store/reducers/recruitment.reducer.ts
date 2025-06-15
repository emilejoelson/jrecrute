import { Action, createReducer, on } from '@ngrx/store';
import { RecruitmentRequest } from '../../data-access/models/recruitment';
import { RecruitmentFormActions } from '../actions/recruitment.actions';

export interface RecruitmentState {
  recruitment: Partial<RecruitmentRequest>;
  recruitments: RecruitmentRequest[];
  submitting: boolean;
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
  submitting: false,
};

export const recruitmentReducer = createReducer<RecruitmentState, Action>(
  initialRecruitmentState,
  on(
    RecruitmentFormActions.submitRecruitmentForm,
    (state: RecruitmentState) => ({
      ...state,
      submitting: true,
    })
  ),
  on(
    RecruitmentFormActions.submitRecruitmentFormSuccess,
    (state: RecruitmentState, { recruitment }) => ({
      ...state,
      recruitments: [...state.recruitments, recruitment],
      submitting: false,
    })
  ),
  on(
    RecruitmentFormActions.submitRecruitmentFormFailure,
    (state: RecruitmentState, { error }) => ({
      ...state,
      submitting: false,
    })
  )
);
