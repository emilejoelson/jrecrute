import { User } from '../../signup/data-access/models/user';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isSignupSuccess: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isSignupSuccess: false,
};
