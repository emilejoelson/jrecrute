import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../data-access/models/user';


export const UserFormActions = createActionGroup({
  source: 'User Form API',
  events: {
    'Submit user form': props<{
      formData: FormData;
      userPayload: Partial<User>;
    }>(),
    'Submit user form success': props<{ user: User }>(),
    'Submit user form failure': props<{
      error: { error: HttpErrorResponse | Error | string };
    }>(), 
  },
});




