import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../data-access/models/user';
import { UserFormActions } from '../actions/cv.actions';

export interface UserState {
  user: Partial<User>;
  users: User[];
  loaded: boolean;
  submitting: boolean;
}

export const initialUserState: UserState = {
  user: {
    cvFile: '',
    personalInfo: {
      civility: '',
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    },
    professionalInfo: {
      currentPosition: '',
      desiredPosition: '',
      enterprise: '',
      hasRemoteExperience: false,
      experiences: [],
    },
    academicInfo: {
      formation: {
        level: '',
        languages: [],
      },
      motivation: '',
    },
  },
  users: [],
  loaded: false,
  submitting: false,
};

export const userReducer = createReducer<UserState, Action>(
  initialUserState,
  on(UserFormActions.submitUserForm, (state: UserState) => ({
    ...state,
    submitting: true,
  })),
  on(UserFormActions.submitUserFormSuccess, (state: UserState, { user }) => ({
    ...state,
    users: [...state.users, user],
    loaded: true,
    submitting: false, 
  })),
  on(UserFormActions.submitUserFormFailure, (state: UserState, { error }) => ({
    ...state,
    submitting: false,
  }))
);
