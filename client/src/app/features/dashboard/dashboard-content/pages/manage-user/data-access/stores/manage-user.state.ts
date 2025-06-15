import { PaginationInfo } from '../../../../../../../common/model/pagination';
import { AuthUser } from '../models/authenticated';

export interface AuthenticatedState {
  authUsers: AuthUser[];
  pagination: PaginationInfo | null;
  loading: boolean;
  error: any;
}

export const initialAuthenticatedState: AuthenticatedState = {
  authUsers: [],
  pagination: null,
  loading: false,
  error: null,
};
