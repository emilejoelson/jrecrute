import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AssignRoleRequest,
  AssignRoleResponse,
  CreateRoleRequest,
  RoleResponse,
} from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  createRole(roleData: CreateRoleRequest): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(`${this.apiUrl}/create-role`, roleData);
  }

  getAllRoles(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.apiUrl}/roles`);
  }

  getRoleById(roleId: string): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.apiUrl}/roles/${roleId}`);
  }

  assignRoleToUser(
    assignData: AssignRoleRequest
  ): Observable<AssignRoleResponse> {
    return this.http.post<AssignRoleResponse>(
      `${this.apiUrl}/role/assign-role-to-user`,
      assignData
    );
  }
}

