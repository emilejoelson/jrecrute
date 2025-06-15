import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { storeConfig } from './state/state.config';
import { environment } from '../environment/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { authInterceptor } from './core/interceptors/token.interceptor';
import { Store } from '@ngrx/store';
import { AuthActions } from './authentication/data-access/store/actions/auth.actions';
import { filter, take, Subscription } from 'rxjs';
import { selectIsAuthenticated } from './authentication/data-access/store/selectors/auth.selectors';
import { State } from './state/root.state';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/langs/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    storeConfig.provideStore,
    storeConfig.provideEffects,
    provideStoreDevtools({
      name: 'CC Recrutement',
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),

    provideHttpClient(withInterceptors([authInterceptor])),

    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
    ...(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers ?? []),

    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<State>) => {
        return () => {
          store.dispatch(AuthActions.initializeAuth());

          return new Promise<void>((resolve) => {
            let subscription: Subscription | undefined;

            try {
              subscription = store
                .select((state: State) => selectIsAuthenticated(state))
                .pipe(
                  filter((isAuthenticated) => isAuthenticated !== null),
                  take(1)
                )
                .subscribe({
                  next: () => {
                    try {
                      if (subscription) {
                        subscription.unsubscribe();
                      }
                      resolve();
                    } catch (error) {
                      console.error('Error unsubscribing:', error);
                      resolve();
                    }
                  },
                  error: (err) => {
                    console.error('Auth subscription error:', err);
                    resolve();
                  },
                });
            } catch (error) {
              console.error('Error setting up auth subscription:', error);
              resolve();
              return;
            }

            const timeoutId = setTimeout(() => {
              try {
                if (subscription && !subscription.closed) {
                  subscription.unsubscribe();
                }
              } catch (error) {
                console.error('Error in timeout cleanup:', error);
              } finally {
                resolve();
              }
            }, 5000);
          });
        };
      },
      deps: [Store],
      multi: true,
    },
  ],
};
