import { User } from '../../signup/data-access/models/user';
import { UserProfileResponse } from '../models/auth.response';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isSignupSuccess: boolean;
  profile: UserProfileResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  password?: PasswordState;
}

export const initialPasswordState: PasswordState = {
  isChanging: false,
  success: false,
  message: null,
  error: null,
};

export const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isSignupSuccess: false,
  profile: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  password: initialPasswordState,
};

export interface PasswordState {
  isChanging: boolean;
  success: boolean;
  message: string | null;
  error: any;
}
