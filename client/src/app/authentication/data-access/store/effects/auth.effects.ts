import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthActions } from '../actions/auth.actions';
import { SignupService } from '../../../signup/data-access/signup.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  signupService = inject(SignupService);
  authService = inject(AuthService);
  tokenService = inject(TokenService);
  router = inject(Router);
  
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap((payload) => {
        // Process image if available
        if (payload.profileImage && payload.profileImage.includes('base64')) {
          // Convert base64 to file
          const base64 = payload.profileImage.split(',')[1];
          const blob = this.base64ToBlob(base64, 'image/jpeg');
          const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
          
          // First upload the image
          return this.signupService.uploadProfileImage(file).pipe(
            switchMap((imageResponse) => {
              // Then do the signup with the image path
              const signupData = {
                ...payload,
                profileImage: imageResponse.filePath
              };
              
              return this.signupService.signup(signupData).pipe(
                map((response) => AuthActions.signupSuccess({ response })),
                catchError((error) => of(AuthActions.signupFailure({ error })))
              );
            }),
            catchError((error) => of(AuthActions.uploadProfileImageFailure({ error })))
          );
        } else {
          // Just do the signup without image upload
          return this.signupService.signup(payload).pipe(
            map((response) => AuthActions.signupSuccess({ response })),
            catchError((error) => of(AuthActions.signupFailure({ error })))
          );
        }
      })
    )
  );

  uploadProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.uploadProfileImage),
      switchMap(({ file }) =>
        this.signupService.uploadProfileImage(file).pipe(
          map((response) => AuthActions.uploadProfileImageSuccess({ filePath: response.filePath })),
          catchError((error) => of(AuthActions.uploadProfileImageFailure({ error })))
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(({ response }) => {
          // Store tokens in localStorage
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          
          // Navigate to dashboard after successful signup
          setTimeout(() => {
            this.router.navigate(['/connexion']);
            window.scrollTo(0, 0);
          }, 1500);
        })
      ),
    { dispatch: false }
  );

  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    return new Blob(byteArrays, { type: contentType });
  }
}