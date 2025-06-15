import { createActionGroup, props } from '@ngrx/store';
import { AuthUsersQueryParams, AuthUsersResponse } from '../../models/authenticated';

export const AuthUsersActions = createActionGroup({
  source: 'Auth Users',
  events: {
    'Load Auth Users': props<{ queryParams?: AuthUsersQueryParams }>(),
    'Load Auth Users Success': props<{ response: AuthUsersResponse }>(),
    'Load Auth Users Failure': props<{ error: any }>(),
  },
});
