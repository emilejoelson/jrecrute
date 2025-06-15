import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, exhaustMap } from 'rxjs/operators';
import { NewsletterService } from '../../services/newsletter.service';
import { NewsletterActions } from '../actions/newsletter.actions';
import { Router } from '@angular/router';
import { NewsletterContentService } from '../../services/newsletter-content.service';
import { response } from 'express';

@Injectable()
export class NewsletterEffects {
  actions$ = inject(Actions);
  newsletterService = inject(NewsletterService);
  newselleterSrv = inject(NewsletterContentService);

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
  loadAllSubscribers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterActions.loadAllSubscribers),
      mergeMap(() =>
        this.newselleterSrv.getAllSubscribers().pipe(
          tap((response) => {
            console.log('Raw API response for subscribers:', response);
            console.log('Response type:', typeof response);
            console.log('Is array:', Array.isArray(response));
          }),
          map((response) => {
            // Make sure we're extracting the correct data
            const subscribers = Array.isArray(response)
              ? response
              : response || response || [];
            console.log('Mapped subscribers:', subscribers);

            return NewsletterActions.loadAllSubscribersSuccess({
              subscribers: response.subscribers,
            });
          }),
          catchError((error) =>
            of(
              NewsletterActions.loadAllSubscribersFailure({ error: { error } })
            )
          )
        )
      )
    )
  );

  loadAllUsersWithCv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterActions.loadUsersWithCv),
      mergeMap(() =>
        this.newselleterSrv.getUsersWithCv().pipe(
          tap((response) => {
            console.log('Raw API response for users:', response);
            console.log('Response type:', typeof response);
            console.log('Is array:', Array.isArray(response));
          }),
          map((response) => {
            // Make sure we're extracting the correct data
            const users = Array.isArray(response)
              ? response
              : response || response || [];
            console.log('Mapped users:', users);

            return NewsletterActions.loadUsersWithCvSuccess({
              users: response.users,
            });
          }),
          catchError((error) =>
            of(NewsletterActions.loadUsersWithCvFailure({ error: { error } }))
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
