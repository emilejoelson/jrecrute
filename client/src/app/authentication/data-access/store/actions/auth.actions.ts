import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { AuthResponse } from '../../models/auth.response';
import { SignupRequest } from '../../../signup/data-access/models/signup';
import { HttpErrorResponse } from '@angular/common/http';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    // Signup actions
    Signup: props<SignupRequest>(),
    'Signup Success': props<{ response: AuthResponse }>(),
    'Signup Failure': props<{ error: { error: HttpErrorResponse | Error | string } }>(),
    'Reset Signup State': emptyProps(),
    
    // Login actions
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ response: AuthResponse }>(),
    'Login Failure': props<{ error: { error: HttpErrorResponse | Error | string } }>(),
    
    // Logout action
    Logout: emptyProps(),
    
    // Profile image upload
    'Upload Profile Image': props<{ file: File }>(),
    'Upload Profile Image Success': props<{ filePath: string }>(),
    'Upload Profile Image Failure': props<{ error: { error: HttpErrorResponse | Error | string } }>(),
  },
});
