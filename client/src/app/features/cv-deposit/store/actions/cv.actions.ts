import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../data-access/models/user';
import { Congratulation } from '../../data-access/models/congratulation';

export const RootActions = createActionGroup({
  source: 'ROOT',
  events: {
    'Init app': emptyProps(),
  },
});

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
    // 'Display congratulation popup': props<{congratulationData: Congratulation}>(),
  },
});

export const UsersActions = createActionGroup({
  source: 'User API',
  events: {
    'load users': emptyProps(),
    'load user success': props<{ users: User[] }>(),
    'load user failure': props<{ error: HttpErrorResponse | Error | string }>(),
  },
});


