import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Newsletter,
  NewsletterSubscriptionRequest,
  NewsletterSubscriptionResponse,
} from '../../models/newsletter';
import { Subscriber, User } from '../../models/newsletter.types';

export const NewsletterActions = createActionGroup({
  source: 'Newsletter',
  events: {
    Subscribe: props<{ request: NewsletterSubscriptionRequest }>(),
    'Subscribe Success': props<{ response: NewsletterSubscriptionResponse }>(),
    'Subscribe Failure': props<{
      error: { error: HttpErrorResponse | Error | string };
    }>(),
    'Reset Subscribe Status': emptyProps(),

    'Load Subscribers': emptyProps(),
    'Load Subscribers Success': props<{ subscribers: Newsletter[] }>(),
    'Load Subscribers Failure': props<{
      error: { error: HttpErrorResponse | Error | string };
    }>(),

    'Load All Subscribers': emptyProps(),
    'Load All Subscribers Success': props<{ subscribers: Subscriber[] }>(),
    'Load All Subscribers Failure': props<{
      error: { error: HttpErrorResponse | Error | string };
    }>(),

    'Load Users With Cv': emptyProps(),
    'Load Users With Cv Success': props<{ users: User[] }>(),
    'Load Users With Cv Failure': props<{
      error: { error: HttpErrorResponse | Error | string };
    }>(),

    'Reset Subscribers Loading': emptyProps(),
    'Reset Users Loading': emptyProps(),
  },
});
