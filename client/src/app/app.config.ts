import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { storeConfig } from './state/state.config';
import { environment } from '../environment/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
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
    provideHttpClient(),
  ],
};
