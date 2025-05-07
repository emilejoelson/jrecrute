import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {  NewsletterSubscriptionRequest, NewsletterSubscriptionResponse } from '../../models/newsletter';

export const NewsletterActions = createActionGroup({
  source: 'Newsletter',
  events: {
    'Subscribe': props<{ request: NewsletterSubscriptionRequest }>(),
    'Subscribe Success': props<{ response: NewsletterSubscriptionResponse }>(),
    'Subscribe Failure': props<{
      error: { error: HttpErrorResponse | Error | string };
    }>(),
    'Reset Subscribe Status': emptyProps()
  }
});