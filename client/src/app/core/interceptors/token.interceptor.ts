// core/interceptors/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take, finalize } from 'rxjs/operators';
import { TokenService } from '../../authentication/data-access/services/token.service';
import { AuthService } from '../../authentication/data-access/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip adding token for specific endpoints like login or refresh token
    if (this.shouldSkipTokenForUrl(request.url)) {
      return next.handle(request);
    }

    // Add token if available
    if (this.tokenService.hasToken()) {
      request = this.addToken(request, this.tokenService.getAccessToken());
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          this.refreshTokenSubject.next(true);
          return next.handle(this.addToken(request, this.tokenService.getAccessToken()));
        }),
        catchError(error => {
          // If refresh token fails, logout user
          this.authService.logout();
          return throwError(() => error);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => {
          return next.handle(this.addToken(request, this.tokenService.getAccessToken()));
        })
      );
    }
  }

  private shouldSkipTokenForUrl(url: string): boolean {
    const skipUrls = [
      '/api/auth/login',
      '/api/auth/refresh-token'
    ];
    return skipUrls.some(skipUrl => url.includes(skipUrl));
  }
}