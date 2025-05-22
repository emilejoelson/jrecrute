import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap } from 'rxjs';
import { UserFormActions } from '../../features/cv-deposit/store/actions/cv.actions';
import { RecruitmentFormActions } from '../../features/recruitment/store/actions/recruitment.actions';
import { ErrorAction } from '../../core/models/error.action';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorTranslationService } from '../../core/services/error-translation.service';
import { AuthActions } from '../../authentication/data-access/store/actions/auth.actions';
import { NewsletterActions } from '../../features/newsletter/data-access/store/actions/newsletter.actions';
import { NewsletterContentActions } from '../../features/newsletter/data-access/store/actions/newsletter-content.actions';

@Injectable()
export class ErrorEffects {
  private toastService = inject(ToastService);
  private actions$ = inject(Actions);
  errorTransactionService = inject(ErrorTranslationService);

  handleErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          UserFormActions.submitUserFormFailure,
          RecruitmentFormActions.submitRecruitmentFormFailure,
          AuthActions.signupFailure,
          AuthActions.loginFailure,
          AuthActions.uploadProfileImageFailure,
          NewsletterActions.subscribeFailure,
          NewsletterContentActions.createNewsletterFailure,
        ),
        tap((action: ErrorAction) => {
          const error = action.error?.error ?? action.error;
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
