import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import {
  map,
  catchError,
  exhaustMap,
  tap,
  switchMap,
  concatMap,
  mergeMap,
} from 'rxjs/operators';
import { NewsletterContentService } from '../../services/newsletter-content.service';
import { Router } from '@angular/router';
import { NewsletterContentActions } from '../actions/newsletter-content.actions';
import { CreateNewsletterContentRequest } from '../../models/newsletter-content';

@Injectable()
export class NewsletterContentEffects {
  private actions$ = inject(Actions);
  private newsletterContentService = inject(NewsletterContentService);
  private router = inject(Router);

  // Load newsletters
  loadNewsletters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.loadNewsletters),
      exhaustMap(({ page, limit, status }) =>
        this.newsletterContentService.getNewsletters(page, limit, status).pipe(
          map((response) =>
            NewsletterContentActions.loadNewslettersSuccess({ response })
          ),
          catchError((error) =>
            of(NewsletterContentActions.loadNewslettersFailure({ error }))
          )
        )
      )
    )
  );

  // Load single newsletter
  loadNewsletter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.loadNewsletter),
      exhaustMap(({ id }) =>
        this.newsletterContentService.getNewsletterById(id).pipe(
          map((newsletter) =>
            NewsletterContentActions.loadNewsletterSuccess({ newsletter })
          ),
          catchError((error) =>
            of(NewsletterContentActions.loadNewsletterFailure({ error }))
          )
        )
      )
    )
  );

  createNewsletter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.createNewsletter),
      switchMap((payload) => {
        if (payload.request.image && payload.request.image.includes('base64')) {
          const base64 = payload.request.image.split(',')[1];
          const blob = this.base64ToBlob(base64, 'image/jpeg');
          const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });

          return this.newsletterContentService.uploadNewsletterImage(file).pipe(
            switchMap((imageResponse) => {
              const createNewsletterData = {
                ...payload.request,
                image: imageResponse.filePath,
              };

              return this.newsletterContentService
                .createNewsletter(createNewsletterData)
                .pipe(
                  map((response) =>
                    NewsletterContentActions.createNewsletterSuccess({
                      response,
                    })
                  ),
                  catchError((error) =>
                    of(
                      NewsletterContentActions.createNewsletterFailure({
                        error,
                      })
                    )
                  )
                );
            }),
            catchError((error) =>
              of(NewsletterContentActions.uploadImageFailure({ error }))
            )
          );
        } else {
          return this.newsletterContentService
            .createNewsletter(payload.request)
            .pipe(
              map((response) =>
                NewsletterContentActions.createNewsletterSuccess({ response })
              ),
              catchError((error) =>
                of(NewsletterContentActions.createNewsletterFailure({ error }))
              )
            );
        }
      })
    )
  );

  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  // Navigate after create
  navigateAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NewsletterContentActions.createNewsletterSuccess),
        tap(({ response }) => {
          setTimeout(() => {
            this.router.navigate(['/dashboard/newsletter']);
            window.scrollTo(0, 0);
          }, 1000);
        })
      ),
    { dispatch: false }
  );

  // Update newsletter
  // updateNewsletter$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(NewsletterContentActions.updateNewsletter),
  //     switchMap(({ id, request }) => {
  //       // Check if we have a file to upload
  //       if (request.imagePath ) {
  //         const file = request.imagePath as unknown as File;

  //         // First upload the image, then update the newsletter with the image path
  //         return this.newsletterContentService.uploadNewsletterImage(file).pipe(
  //           switchMap(imageResponse => {
  //             // Create a new request with the image path
  //             const newsletterRequest = {
  //               ...request,
  //               imagePath: imageResponse.imagePath
  //             };

  //             // Now update the newsletter
  //             return this.newsletterContentService.updateNewsletter(id, newsletterRequest).pipe(
  //               map((response) =>
  //                 NewsletterContentActions.updateNewsletterSuccess({ newsletter: response.newsletter })
  //               ),
  //               catchError((error) =>
  //                 of(NewsletterContentActions.updateNewsletterFailure({ error }))
  //               )
  //             );
  //           }),
  //           catchError((error) =>
  //             of(NewsletterContentActions.updateNewsletterFailure({ error }))
  //           )
  //         );
  //       } else {
  //         // No image, just update the newsletter
  //         return this.newsletterContentService.updateNewsletter(id, request).pipe(
  //           map((response) =>
  //             NewsletterContentActions.updateNewsletterSuccess({ newsletter: response.newsletter })
  //           ),
  //           catchError((error) =>
  //             of(NewsletterContentActions.updateNewsletterFailure({ error }))
  //           )
  //         );
  //       }
  //     })
  //   )
  // );

  // Delete newsletter
  deleteNewsletter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.deleteNewsletter),
      exhaustMap(({ id }) =>
        this.newsletterContentService.deleteNewsletter(id).pipe(
          map(() => NewsletterContentActions.deleteNewsletterSuccess({ id })),
          catchError((error) =>
            of(NewsletterContentActions.deleteNewsletterFailure({ error }))
          )
        )
      )
    )
  );

  
  navigateAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NewsletterContentActions.deleteNewsletterSuccess),
        tap(() => {
          setTimeout(() => {
            this.router.navigate(['/dashboard/newsletter']);
            window.scrollTo(0, 0);
          }, 1000);
        })
      ),
    { dispatch: false }
  );

  // Send newsletter
  sendNewsletter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.sendNewsletter),
      exhaustMap(({ id }) =>
        this.newsletterContentService.sendNewsletter(id).pipe(
          map((response) =>
            NewsletterContentActions.sendNewsletterSuccess({ response })
          ),
          catchError((error) =>
            of(NewsletterContentActions.sendNewsletterFailure({ error }))
          )
        )
      )
    )
  );

  // Upload image
  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.uploadImage),
      exhaustMap(({ file }) =>
        this.newsletterContentService.uploadNewsletterImage(file).pipe(
          map((response) =>
            NewsletterContentActions.uploadImageSuccess({
              filePath: response.filePath,
            })
          ),
          catchError((error) =>
            of(NewsletterContentActions.uploadImageFailure({ error }))
          )
        )
      )
    )
  );

  // Update image
  updateImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.updateImage),
      exhaustMap(({ id, file }) =>
        this.newsletterContentService.updateNewsletterImage(id, file).pipe(
          map((response) =>
            NewsletterContentActions.updateImageSuccess({ response })
          ),
          catchError((error) =>
            of(NewsletterContentActions.updateImageFailure({ error }))
          )
        )
      )
    )
  );

  // Delete image
  deleteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.deleteImage),
      exhaustMap(({ id }) =>
        this.newsletterContentService.deleteNewsletterImage(id).pipe(
          map(() => NewsletterContentActions.deleteImageSuccess({ id })),
          catchError((error) =>
            of(NewsletterContentActions.deleteImageFailure({ error }))
          )
        )
      )
    )
  );

  // Load analytics
  loadAnalytics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsletterContentActions.loadAnalytics),
      exhaustMap(() =>
        this.newsletterContentService.getNewsletterAnalytics().pipe(
          map((analytics) =>
            NewsletterContentActions.loadAnalyticsSuccess({ analytics })
          ),
          catchError((error) =>
            of(NewsletterContentActions.loadAnalyticsFailure({ error }))
          )
        )
      )
    )
  );
}
