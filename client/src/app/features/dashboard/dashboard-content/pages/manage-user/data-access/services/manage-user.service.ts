// services/auth.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../../environment/environment';
import {
  AuthUsersQueryParams,
  AuthUsersResponse,
} from '../models/authenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedService {
  private baseUrl = environment.apiUrl;
  http = inject(HttpClient);

  getAllAuthenticatedUsers(
    queryParams?: AuthUsersQueryParams
  ): Observable<AuthUsersResponse> {
    let params = new HttpParams();

    if (queryParams) {
      if (queryParams.page) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.limit) {
        params = params.set('limit', queryParams.limit.toString());
      }
    }

    return this.http.get<AuthUsersResponse>(
      `${this.baseUrl}/auth/all-authenticated-users`,
      { params }
    );
  }
}
