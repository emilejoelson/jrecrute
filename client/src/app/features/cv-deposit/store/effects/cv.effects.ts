import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from '../../data-access/services/user.service';
import { UserFormActions, UsersActions } from '../actions/cv.actions';
import { User } from '../../data-access/models/user';
import { Router } from '@angular/router';

// import img from '../../../../../assets/images/congratulation.png';
import { Store } from '@ngrx/store';
@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  userService = inject(UserService);
  router = inject(Router);
  store = inject(Store);

  isDepositConfirmationPopupOpen: WritableSignal<boolean> = signal(false);

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
              map((response) =>
                UserFormActions.submitUserFormSuccess({
                  user: response.user,
                })
              ),
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
