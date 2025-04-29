// authentication/data-access/store/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from '../auth.state';
import { AuthActions } from '../actions/auth.actions';


export const authReducer = createReducer(
  initialAuthState,
  
  // Signup
  on(AuthActions.signup, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    isSignupSuccess: false,
  })),
  
  on(AuthActions.signupSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      isAuthenticated: true,
      isSignupSuccess: true,
      user: {
        id: response.userId,
        email: '',
        role: response.role,
        roles: response.roles
      },
      error: null,
    };
  }),
  
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    isSignupSuccess: false,
  })),
  
  on(AuthActions.resetSignupState, (state) => ({
    ...state,
    isSignupSuccess: false,
    error: null
  })),
  
  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    isLoading: false,
    isAuthenticated: true,
    user: {
      id: response.userId,
      email: '',
      role: response.role,
      roles: response.roles
    },
    error: null
  })),
  
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
  })),
  
  // Logout
  on(AuthActions.logout, () => ({
    ...initialAuthState
  })),
  
  // Profile Image Upload
  on(AuthActions.uploadProfileImage, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(AuthActions.uploadProfileImageSuccess, (state, { filePath }) => ({
    ...state,
    isLoading: false,
    profileImagePath: filePath,
    error: null
  })),
  
  on(AuthActions.uploadProfileImageFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
  }))
);