// state.config.ts
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { rootReducer } from './reducers/root.reducer';
import { AppEffects } from './effects';
import { metaReducers } from './reducers/meta.reducer';
import { initialState } from './shared/shared.state';
import { initialUserState } from '../features/cv-deposit/store/reducers/cv.reducer';


export const storeConfig = {
  provideStore: provideStore(rootReducer, {
    metaReducers,
    runtimeChecks: {
      strictActionTypeUniqueness: false,
      strictActionImmutability: true,
      strictStateImmutability: true,
    },
    initialState: {
      shared: initialState,
      user: initialUserState,
    },
  }),
  provideEffects: provideEffects(AppEffects),
};
