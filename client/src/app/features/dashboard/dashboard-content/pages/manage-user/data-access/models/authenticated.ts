import { User } from '../../../../../../../authentication/signup/data-access/models/user';
import { PaginationInfo } from '../../../../../../../common/model/pagination';

export interface UserRole {
  _id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  userId: User;
  roles: UserRole[];
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthUsersResponse {
  success: boolean;
  data: AuthUser[];
  pagination: PaginationInfo;
}

export interface AuthUsersQueryParams {
  page?: number;
  limit?: number;
}
