import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from '../../../../environment/environment';
import { User } from '../../signup/data-access/models/user';
import { AuthResponse } from '../models/auth.response';
import { RefreshTokenResponse } from '../../login/data-access/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.initializeUser();
  }

 
  private initializeUser() {
    if (this.tokenService.hasToken() && !this.tokenService.isTokenExpired()) {
      const payload = this.tokenService.getTokenPayload();
      if (payload) {
        this.currentUserSubject.next({
          id: payload.userId,
          email: payload.email,
          role: payload.role,
          roles: payload.roles
        });
      }
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken() && !this.tokenService.isTokenExpired();
  }

  handleAuthentication(response: AuthResponse) {
    this.tokenService.setAccessToken(response.accessToken);

    const user: User = {
      id: response.userId,
      email: this.tokenService.getTokenPayload().email,
      role: response.role,
      roles: response.roles
    };
    
    this.currentUserSubject.next(user);
  }

  refreshToken(): Observable<boolean> {
    return this.http.post<RefreshTokenResponse>(`${this.API_URL}/auth/refresh-token`, {})
      .pipe(
        map(response => {
          this.tokenService.setAccessToken(response.accessToken);
          return true;
        }),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/logout`, {}).pipe(
      tap(() => {
        this.tokenService.removeAccessToken();
        this.currentUserSubject.next(null);
      }),
      catchError(error => {
        this.tokenService.removeAccessToken();
        this.currentUserSubject.next(null);
        return throwError(() => error);
      })
    );
  }

 
  hasRole(roleName: string): boolean {
    const user = this.currentUser;
    if (!user) return false;
  
    if (user.role === roleName) return true;
    
    return !!user.roles?.some(role => role.name === roleName);
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }
}