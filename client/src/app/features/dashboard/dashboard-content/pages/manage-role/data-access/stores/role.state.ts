import { ApiErrorResponse, Role } from "../models/role";


export interface RoleState {
  roles: Role[];
  selectedRole: Role | null;
  loading: boolean;
  creating: boolean;
  assigning: boolean;
  error: ApiErrorResponse | null;
  successMessage: string | null;
}

export const initialRoleState: RoleState = {
  roles: [],
  selectedRole: null,
  loading: false,
  creating: false,
  assigning: false,
  error: null,
  successMessage: null
};