import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../data-access/models/user';
import {
  UserFormActions,
  UsersActions,
} from '../actions/cv.actions';
import { Congratulation } from '../../data-access/models/congratulation';

export interface UserState {
  user: Partial<User>;
  users: User[];
  // showCongratulationPopup: boolean ;
  // congratulationData: Congratulation | null;
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
      yearsOfExperience: '',
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
  // showCongratulationPopup: false,
  // congratulationData: null,
};

export const userReducer = createReducer<UserState, Action>(
  initialUserState,
  on(UsersActions.loadUsers, (state: UserState) => ({
    ...state,
  })),
  on(UsersActions.loadUserSuccess, (state: UserState, props) => ({
    ...state,
    users: props.users,
  })),
  on(UserFormActions.submitUserForm, (state: UserState) => ({
    ...state,
  })),
  on(UserFormActions.submitUserFormSuccess, (state: UserState, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(UserFormActions.submitUserFormFailure, (state: UserState, { error }) => ({
    ...state,
  })),
  // on(
  //   UserFormActions.displayCongratulationPopup,
  //   (state : UserState, { congratulationData }) => ({
  //     ...state,
  //     showCongratulationPopup: true,
  //     congratulationData, 
  //   })
  // )
);
