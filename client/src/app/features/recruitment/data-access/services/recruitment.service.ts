import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { RecruitmentRequest } from '../models/recruitment';
import { Observable } from 'rxjs';
import {
  Result,
  TBaseResponse,
} from '../../../../shared/utils/definitions/response';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  public addRecruitmentRequest(
    recruitment: Partial<RecruitmentRequest>
  ): Observable<TBaseResponse<Result>> {
    return this.http.post<TBaseResponse<Result>>(
      `${this.baseUrl}/addRecruitmentRequest`,
      recruitment
    );
  }
}
