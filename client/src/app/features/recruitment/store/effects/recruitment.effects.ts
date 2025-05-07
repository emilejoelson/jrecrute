import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecruitmentService } from '../../data-access/services/recruitment.service';
import { Store } from '@ngrx/store';
import { RecruitmentFormActions } from '../actions/recruitment.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RecruitmentEffects {
  actions$ = inject(Actions);
  recruitmentService = inject(RecruitmentService);
  router = inject(Router);
  submitRecruitmentForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecruitmentFormActions.submitRecruitmentForm),
      mergeMap(({ recruitmentPayload }) =>
        this.recruitmentService.addRecruitmentRequest(recruitmentPayload).pipe(
          map((response) => {
            return RecruitmentFormActions.submitRecruitmentFormSuccess({
              recruitment: response.recruitment,
            });
          }),
          catchError((error) =>
            of(
              RecruitmentFormActions.submitRecruitmentFormFailure({
                error,
              })
            )
          )
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecruitmentFormActions.submitRecruitmentFormSuccess),
        tap(() => {
          this.router.navigate(['/fiche-de-poste-remplie-avec-succes']);
        })
      ),
    { dispatch: false }
  );
}
