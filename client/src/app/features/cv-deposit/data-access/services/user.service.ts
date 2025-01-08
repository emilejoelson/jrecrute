import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { delay, Observable, map, tap, catchError, finalize } from 'rxjs';
import { FileUploadResponse, User, UserResponse } from '../models/user';

import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  baseUr = environment.apiUrl;

  public uploadFile(file: File): Observable<{ filePath: string }> {
    const formData = new FormData();
    formData.append('cvFile', file);

    return this.http.post<{ filePath: string }>(
      `${this.baseUr}/uploadFile`,
      formData
    );
  }



  public addUser(
    user: Partial<User>
  ): Observable<{ message: string; user: User }> {
    return this.http.post<{ message: string; user: User }>(
      `${this.baseUr}/adduser`,
      user
    );
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<UserResponse>(`${this.baseUr}/getusers`).pipe(
      map((response) => response.users),
      delay(3000)
    );
  }
}
