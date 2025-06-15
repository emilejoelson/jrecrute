// store/role/role.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiErrorResponse, AssignRoleRequest, CreateRoleRequest, Role } from '../../models/role';


export const RoleActions = createActionGroup({
  source: 'Role',
  events: {
    // Create Role Actions
    'Create Role': props<{ roleData: CreateRoleRequest }>(),
    'Create Role Success': props<{ role: Role; message: string }>(),
    'Create Role Failure': props<{ error: ApiErrorResponse }>(),

    // Load All Roles Actions
    'Load Roles': emptyProps(),
    'Load Roles Success': props<{ roles: Role[] }>(),
    'Load Roles Failure': props<{ error: ApiErrorResponse }>(),

    // Load Role By ID Actions
    'Load Role By Id': props<{ roleId: string }>(),
    'Load Role By Id Success': props<{ role: Role }>(),
    'Load Role By Id Failure': props<{ error: ApiErrorResponse }>(),

    // Assign Role Actions
    'Assign Role To User': props<{ assignData: AssignRoleRequest }>(),
    'Assign Role To User Success': props<{ 
      userId: string; 
      roleId: string; 
      roleName: string; 
      message: string 
    }>(),
    'Assign Role To User Failure': props<{ error: ApiErrorResponse }>(),

    // UI Actions
    'Clear Error': emptyProps(),
    'Clear Success Message': emptyProps(),
    'Reset Role State': emptyProps()
  }
});