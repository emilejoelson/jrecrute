import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import {
  ApiErrorResponse,
  CreateRoleRequest,
  Role,
} from './data-access/models/role';
import {
  selectActiveRoles,
  selectAllRoles,
  selectAnyRoleLoading,
  selectRoleAssigning,
  selectRoleCreating,
  selectRoleError,
  selectRoleLoading,
  selectRolesCount,
  selectRoleSuccessMessage,
  selectSelectedRole,
} from './data-access/stores/selectors/role.selector';
import { RoleActions } from './data-access/stores/actions/role.actions';
import { State } from '../../../../../state/root.state';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-manage-role',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IconComponent],
  templateUrl: './manage-role.component.html',
  styleUrl: './manage-role.component.scss',
})
export class ManageRoleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Form groups
  createRoleForm!: FormGroup;
  assignRoleForm!: FormGroup;

  // Observables - using definite assignment assertion
  roles$!: Observable<Role[]>;
  activeRoles$!: Observable<Role[]>;
  selectedRole$!: Observable<Role | null>;
  loading$!: Observable<boolean>;
  creating$!: Observable<boolean>;
  assigning$!: Observable<boolean>;
  error$!: Observable<ApiErrorResponse | null>;
  successMessage$!: Observable<string | null>;
  rolesCount$!: Observable<number>;
  anyLoading$!: Observable<boolean>;

  // Component state
  showCreateForm = false;
  showAssignForm = false;
  searchTerm = '';
  filteredRoles: Role[] = [];
  selectedRoleForAssign: Role | null = null;

  // Available permissions (you can customize these based on your app)
  availablePermissions = [
    'read_users',
    'write_users',
    'delete_users',
    'read_roles',
    'write_roles',
    'delete_roles',
    'read_reports',
    'write_reports',
    'admin_access',
    'manage_settings',
  ];

  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.initializeForms();
    this.initializeObservables();
  }

  ngOnInit(): void {
    this.loadRoles();
    this.setupFormSubscriptions();
    this.subscribeToRoles();
    this.clearMessages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForms(): void {
    this.createRoleForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      description: ['', [Validators.maxLength(255)]],
      permissions: [[], [Validators.required, Validators.minLength(1)]],
    });

    this.assignRoleForm = this.fb.group({
      userId: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
    });
  }

  private initializeObservables(): void {
    this.roles$ = this.store.select(selectAllRoles);
    this.activeRoles$ = this.store.select(selectActiveRoles);
    this.selectedRole$ = this.store.select(selectSelectedRole);
    this.loading$ = this.store.select(selectRoleLoading);
    this.creating$ = this.store.select(selectRoleCreating);
    this.assigning$ = this.store.select(selectRoleAssigning);
    this.error$ = this.store.select(selectRoleError);
    this.successMessage$ = this.store.select(selectRoleSuccessMessage);
    this.rolesCount$ = this.store.select(selectRolesCount);
    this.anyLoading$ = this.store.select(selectAnyRoleLoading);
  }

  private setupFormSubscriptions(): void {
    // Auto-clear messages when user starts typing
    this.createRoleForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(() => {
        this.clearMessages();
      });

    this.assignRoleForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(() => {
        this.clearMessages();
      });
  }

  private subscribeToRoles(): void {
    this.roles$.pipe(takeUntil(this.destroy$)).subscribe((roles) => {
      this.filteredRoles = this.filterRoles(roles);
    });
  }

  private filterRoles(roles: Role[]): Role[] {
    if (!this.searchTerm.trim()) {
      return roles;
    }

    const term = this.searchTerm.toLowerCase();
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(term) ||
        role.description?.toLowerCase().includes(term) ||
        role.permissions.some((permission) =>
          permission.toLowerCase().includes(term)
        )
    );
  }

  // Actions
  loadRoles(): void {
    this.store.dispatch(RoleActions.loadRoles());
  }

  loadRoleById(roleId: string): void {
    this.store.dispatch(RoleActions.loadRoleById({ roleId }));
  }

  createRole(): void {
    if (this.createRoleForm.valid) {
      const roleData: CreateRoleRequest = {
        name: this.createRoleForm.value.name,
        description: this.createRoleForm.value.description,
        permissions: this.createRoleForm.value.permissions,
      };

      this.store.dispatch(RoleActions.createRole({ roleData }));

      // Subscribe to success to close form
      this.successMessage$
        .pipe(takeUntil(this.destroy$))
        .subscribe((message) => {
          if (message) {
            this.showCreateForm = false;
            this.createRoleForm.reset();
            this.createRoleForm.patchValue({ permissions: [] });
          }
        });
    }
  }

  assignRole(): void {
    if (this.assignRoleForm.valid) {
      const assignData = {
        userId: this.assignRoleForm.value.userId,
        roleId: this.assignRoleForm.value.roleId,
      };

      this.store.dispatch(RoleActions.assignRoleToUser({ assignData }));

      // Subscribe to success to close form
      this.successMessage$
        .pipe(takeUntil(this.destroy$))
        .subscribe((message) => {
          if (message) {
            this.showAssignForm = false;
            this.assignRoleForm.reset();
            this.selectedRoleForAssign = null;
          }
        });
    }
  }

  // UI Actions
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.createRoleForm.reset();
      this.createRoleForm.patchValue({ permissions: [] });
    }
    this.clearMessages();
  }

  toggleAssignForm(): void {
    this.showAssignForm = !this.showAssignForm;
    if (!this.showAssignForm) {
      this.assignRoleForm.reset();
      this.selectedRoleForAssign = null;
    }
    this.clearMessages();
  }

  onSearchChange(): void {
    this.roles$.pipe(takeUntil(this.destroy$)).subscribe((roles) => {
      this.filteredRoles = this.filterRoles(roles);
    });
  }

  selectRoleForAssign(role: Role): void {
    this.selectedRoleForAssign = role;
    this.assignRoleForm.patchValue({ roleId: role._id });
  }

  togglePermission(permission: string): void {
    const currentPermissions = this.createRoleForm.value.permissions || [];
    const index = currentPermissions.indexOf(permission);

    if (index > -1) {
      currentPermissions.splice(index, 1);
    } else {
      currentPermissions.push(permission);
    }

    this.createRoleForm.patchValue({ permissions: currentPermissions });
  }

  isPermissionSelected(permission: string): boolean {
    const permissions = this.createRoleForm.value.permissions || [];
    return permissions.includes(permission);
  }

  clearMessages(): void {
    this.store.dispatch(RoleActions.clearError());
    this.store.dispatch(RoleActions.clearSuccessMessage());
  }

  resetState(): void {
    this.store.dispatch(RoleActions.resetRoleState());
    this.showCreateForm = false;
    this.showAssignForm = false;
    this.createRoleForm.reset();
    this.assignRoleForm.reset();
    this.selectedRoleForAssign = null;
    this.searchTerm = '';
  }

  // Utility methods
  get isCreateFormValid(): boolean {
    return this.createRoleForm.valid;
  }

  get isAssignFormValid(): boolean {
    return this.assignRoleForm.valid;
  }

  getFieldError(formGroup: FormGroup, fieldName: string): string | null {
    const field = formGroup.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      const errors = field.errors;
      if (errors) {
        if (errors['required']) return `${fieldName} is required`;
        if (errors['minlength'])
          return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
        if (errors['maxlength'])
          return `${fieldName} cannot exceed ${errors['maxlength'].requiredLength} characters`;
      }
    }
    return null;
  }

  trackByRoleId(index: number, role: Role): string {
    return role._id || index.toString();
  }
}
