import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from '../../data-access/services/user.service';
import { UserFormActions } from '../actions/cv.actions';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  userService = inject(UserService);
  router = inject(Router);
  store = inject(Store);

  submitUserForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserFormActions.submitUserForm),
      mergeMap(({ formData, userPayload }) =>
        this.userService.uploadFile(formData.get('cvFile') as File).pipe(
          mergeMap((uploadResponse) => {
            const updatedUserPayload = {
              ...userPayload,
              cvFile: uploadResponse.filePath,
            };

            return this.userService.addUser(updatedUserPayload).pipe(
              map((response) => {
                return UserFormActions.submitUserFormSuccess({
                  user: response.user,
                });
              }),
              catchError((error) =>
                of(UserFormActions.submitUserFormFailure({ error }))
              )
            );
          }),
          catchError((error) =>
            of(UserFormActions.submitUserFormFailure({ error }))
          )
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserFormActions.submitUserFormSuccess),
        tap(() => {
          this.router.navigate(['/deposer-un-cv-avec-succes']);
        })
      ),
    { dispatch: false }
  );
}
