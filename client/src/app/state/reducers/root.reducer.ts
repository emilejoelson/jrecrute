// root.reducer.ts
import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from '../../features/cv-deposit/store/reducers/cv.reducer';
import { State } from '../root.state';

export const rootReducer: ActionReducerMap<State> = {
  user: userReducer,
};
