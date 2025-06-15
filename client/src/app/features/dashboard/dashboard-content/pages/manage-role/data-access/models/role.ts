// models/role.interface.ts
export interface Role {
  _id?: string;
  name: string;
  description?: string;
  permissions: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  permissions?: string[];
}

export interface AssignRoleRequest {
  userId: string;
  roleId: string;
}

export interface RoleResponse {
  message: string;
  role?: Role;
  roles?: Role[];
}

export interface AssignRoleResponse {
  message: string;
  userId: string;
  roleId: string;
  roleName: string;
}

export interface ApiErrorResponse {
  message: string;
  error?: string;
  field?: string;
}
