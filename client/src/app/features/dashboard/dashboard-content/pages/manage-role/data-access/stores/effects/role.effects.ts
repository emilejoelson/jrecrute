// store/role/role.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { RoleService } from '../../services/role.service';
import { RoleActions } from '../actions/role.actions';

@Injectable()
export class RoleEffects {
  private actions$ = inject(Actions);
  private roleService = inject(RoleService);

  // Create Role Effect
  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.createRole),
      switchMap(({ roleData }) =>
        this.roleService.createRole(roleData).pipe(
          map((response) =>
            RoleActions.createRoleSuccess({
              role: response.role!,
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              RoleActions.createRoleFailure({
                error: {
                  message: error.error?.message || 'Failed to create role',
                  field: error.error?.field,
                },
              })
            )
          )
        )
      )
    )
  );

  // Load All Roles Effect
  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRoles),
      switchMap(() =>
        this.roleService.getAllRoles().pipe(
          map((response) =>
            RoleActions.loadRolesSuccess({
              roles: response.roles || [],
            })
          ),
          catchError((error) =>
            of(
              RoleActions.loadRolesFailure({
                error: {
                  message: error.error?.message || 'Failed to load roles',
                },
              })
            )
          )
        )
      )
    )
  );

  // Load Role By ID Effect
  loadRoleById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRoleById),
      switchMap(({ roleId }) =>
        this.roleService.getRoleById(roleId).pipe(
          map((response) =>
            RoleActions.loadRoleByIdSuccess({
              role: response.role!,
            })
          ),
          catchError((error) =>
            of(
              RoleActions.loadRoleByIdFailure({
                error: {
                  message: error.error?.message || 'Failed to load role',
                },
              })
            )
          )
        )
      )
    )
  );

  // Assign Role to User Effect
  assignRoleToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.assignRoleToUser),
      switchMap(({ assignData }) =>
        this.roleService.assignRoleToUser(assignData).pipe(
          map((response) =>
            RoleActions.assignRoleToUserSuccess({
              userId: response.userId,
              roleId: response.roleId,
              roleName: response.roleName,
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              RoleActions.assignRoleToUserFailure({
                error: {
                  message:
                    error.error?.message || 'Failed to assign role to user',
                },
              })
            )
          )
        )
      )
    )
  );
}
