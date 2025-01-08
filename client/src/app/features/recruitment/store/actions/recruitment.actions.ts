import { createActionGroup, props } from '@ngrx/store';
import { RecruitmentRequest } from '../../data-access/models/recruitment';
import { HttpErrorResponse } from '@angular/common/http';

export const RecruitmentFormActions = createActionGroup({
  source: 'Recruitment Form API',
  events: {
    'Submit recruitment form': props<{
      recruitmentPayload: Partial<RecruitmentRequest>;
    }>(),
    'Submit recruitment form success': props<{
      recruitment: RecruitmentRequest;
    }>(),
    'Submit recruitment form failure': props<{
      error: { error: HttpErrorResponse | Error | string };
    }>(),
  },
});
