import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { RecruitmentRequest } from '../models/recruitment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  public addRecruitmentRequest(
    recruitment: Partial<RecruitmentRequest>
  ): Observable<{ message: string; recruitment: RecruitmentRequest }> {
    return this.http.post<{ message: string; recruitment: RecruitmentRequest }>(
      `${this.baseUrl}/addRecruitmentRequest`,
      recruitment
    );
  }
}
