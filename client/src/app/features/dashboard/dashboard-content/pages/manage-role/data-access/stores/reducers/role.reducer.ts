import { createReducer, on } from '@ngrx/store';
import { initialRoleState } from '../role.state';
import { RoleActions } from '../actions/role.actions';

export const roleReducer = createReducer(
  initialRoleState,

  // Create Role
  on(RoleActions.createRole, (state) => ({
    ...state,
    creating: true,
    error: null,
    successMessage: null
  })),

  on(RoleActions.createRoleSuccess, (state, { role, message }) => ({
    ...state,
    roles: [...state.roles, role],
    creating: false,
    successMessage: message,
    error: null
  })),

  on(RoleActions.createRoleFailure, (state, { error }) => ({
    ...state,
    creating: false,
    error,
    successMessage: null
  })),

  // Load All Roles
  on(RoleActions.loadRoles, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(RoleActions.loadRolesSuccess, (state, { roles }) => ({
    ...state,
    roles,
    loading: false,
    error: null
  })),

  on(RoleActions.loadRolesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    roles: []
  })),

  // Load Role By ID
  on(RoleActions.loadRoleById, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedRole: null
  })),

  on(RoleActions.loadRoleByIdSuccess, (state, { role }) => ({
    ...state,
    selectedRole: role,
    loading: false,
    error: null
  })),

  on(RoleActions.loadRoleByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    selectedRole: null
  })),

  // Assign Role to User
  on(RoleActions.assignRoleToUser, (state) => ({
    ...state,
    assigning: true,
    error: null,
    successMessage: null
  })),

  on(RoleActions.assignRoleToUserSuccess, (state, { message }) => ({
    ...state,
    assigning: false,
    successMessage: message,
    error: null
  })),

  on(RoleActions.assignRoleToUserFailure, (state, { error }) => ({
    ...state,
    assigning: false,
    error,
    successMessage: null
  })),

  // UI Actions
  on(RoleActions.clearError, (state) => ({
    ...state,
    error: null
  })),

  on(RoleActions.clearSuccessMessage, (state) => ({
    ...state,
    successMessage: null
  })),

  on(RoleActions.resetRoleState, () => initialRoleState)
);