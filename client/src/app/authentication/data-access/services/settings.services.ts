import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
} from '../models/auth.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  changePassword(
    payload: ChangePasswordPayload
  ): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(
      `${this.apiUrl}/settings/change-password`,
      payload
    );
  }

}
