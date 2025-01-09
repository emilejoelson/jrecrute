import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecruitmentService } from '../../data-access/services/recruitment.service';
import { Store } from '@ngrx/store';
import { RecruitmentFormActions } from '../actions/recruitment.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class RecruitmentEffects {
  actions$ = inject(Actions);
  recruitmentService = inject(RecruitmentService);
  store = inject(Store);

  submitRecruitmentForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecruitmentFormActions.submitRecruitmentForm),
      mergeMap(({ recruitmentPayload }) =>
        this.recruitmentService.addRecruitmentRequest(recruitmentPayload).pipe(
          map((response) =>
            RecruitmentFormActions.submitRecruitmentFormSuccess({
              recruitment: response.recruitment,
            })
          ),
          catchError((error) =>
            of(
              RecruitmentFormActions.submitRecruitmentFormFailure({
                error: { error },
              })
            )
          )
        )
      )
    )
  );
}
