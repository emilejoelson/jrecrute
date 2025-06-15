// store/auth-users/auth-users.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthenticatedService } from '../../services/manage-user.service';
import { AuthUsersActions } from '../actions/manage-users.actions';

@Injectable()
export class AuthUsersEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthenticatedService);

  loadAuthenticatedUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthUsersActions.loadAuthUsers),
      switchMap(({ queryParams }) =>
        this.authService.getAllAuthenticatedUsers(queryParams).pipe(
          map((response) =>
            AuthUsersActions.loadAuthUsersSuccess({ response })
          ),
          catchError((error) =>
            of(AuthUsersActions.loadAuthUsersFailure({ error }))
          )
        )
      )
    )
  );
}
