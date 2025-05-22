import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, exhaustMap } from 'rxjs/operators';
import { NewsletterService } from '../../services/newsletter.service';
import { NewsletterActions } from '../actions/newsletter.actions';
import { Router } from '@angular/router';

@Injectable()
export class NewsletterEffects {
  actions$ = inject(Actions);
  newsletterService = inject(NewsletterService);
  router = inject(Router);

  loadSubscribers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterActions.loadSubscribers),
      mergeMap(() =>
        this.newsletterService.getAllSubscribers().pipe(
          map((response) =>
            NewsletterActions.loadSubscribersSuccess({
              subscribers: response.subscribers,
            })
          ),
          catchError((error) =>
            of(NewsletterActions.loadSubscribersFailure({ error: { error } }))
          )
        )
      )
    )
  );

  subscribe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterActions.subscribe),
      exhaustMap(({ request }) =>
        this.newsletterService.subscribe(request).pipe(
          map((response) => NewsletterActions.subscribeSuccess({ response })),
          catchError((error) =>
            of(NewsletterActions.subscribeFailure({ error: { error } }))
          )
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NewsletterActions.subscribeSuccess),
        tap(() => {
          this.router.navigate(['/email-de-confirmation']);
        })
      ),
    { dispatch: false }
  );
}
