import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap } from 'rxjs';
import { UserFormActions } from '../../features/cv-deposit/store/actions/cv.actions';
import { ErrorAction } from '../../core/models/error.action';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorTranslationService } from '../../core/services/error-translation.service';

@Injectable()
export class ErrorEffects {
  private toastService = inject(ToastService);
  private actions$ = inject(Actions);

  errorTransactionService = inject(ErrorTranslationService);

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserFormActions.submitUserFormFailure),
        tap((action: ErrorAction) => {
          const error = action.error?.error;
          let errorMessage: string | undefined;

          if (typeof error === 'string') {
            errorMessage = error;
          } else if (error instanceof HttpErrorResponse) {
            errorMessage = error.message;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          } else if (error && typeof error === 'object' && 'message' in error) {
            errorMessage = (error as { message?: string }).message;
          }

          if (errorMessage) {
            this.toastService.createToast(
              'error',
              this.errorTransactionService.translateError(errorMessage)
            );
          }
        })
      ),
    { dispatch: false }
  );
}
