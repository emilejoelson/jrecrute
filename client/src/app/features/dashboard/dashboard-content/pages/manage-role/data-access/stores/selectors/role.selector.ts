// store/role/role.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../../../../../../../../state/root.state';
import { RoleState } from '../role.state';


export const selectRoleState = (state: State) => state.role;

export const selectAllRoles = createSelector(
  selectRoleState,
  (state: RoleState) => state.roles
);

export const selectSelectedRole = createSelector(
  selectRoleState,
  (state: RoleState) => state.selectedRole
);

export const selectRoleLoading = createSelector(
  selectRoleState,
  (state: RoleState) => state.loading
);

export const selectRoleCreating = createSelector(
  selectRoleState,
  (state: RoleState) => state.creating
);

export const selectRoleAssigning = createSelector(
  selectRoleState,
  (state: RoleState) => state.assigning
);

export const selectRoleError = createSelector(
  selectRoleState,
  (state: RoleState) => state.error
);

export const selectRoleSuccessMessage = createSelector(
  selectRoleState,
  (state: RoleState) => state.successMessage
);

// Computed selectors
export const selectActiveRoles = createSelector(selectAllRoles, (roles) =>
  roles.filter((role) => role.isActive !== false)
);

export const selectRoleById = (roleId: string) =>
  createSelector(selectAllRoles, (roles) =>
    roles.find((role) => role._id === roleId)
  );

export const selectRoleByName = (roleName: string) =>
  createSelector(selectAllRoles, (roles) =>
    roles.find((role) => role.name.toLowerCase() === roleName.toLowerCase())
  );

export const selectRolesCount = createSelector(
  selectAllRoles,
  (roles) => roles.length
);

export const selectActiveRolesCount = createSelector(
  selectActiveRoles,
  (roles) => roles.length
);

// Loading states
export const selectAnyRoleLoading = createSelector(
  selectRoleLoading,
  selectRoleCreating,
  selectRoleAssigning,
  (loading, creating, assigning) => loading || creating || assigning
);

// Error and success states
export const selectHasRoleError = createSelector(
  selectRoleError,
  (error) => !!error
);

export const selectHasRoleSuccess = createSelector(
  selectRoleSuccessMessage,
  (message) => !!message
);
