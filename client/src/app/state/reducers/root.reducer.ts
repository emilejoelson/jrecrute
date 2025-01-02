// root.reducer.ts
import { ActionReducerMap } from '@ngrx/store';
import { RootState } from '../root.state';
import { userReducer } from '../../features/cv-deposit/store/reducers/cv.reducer';
import { SharedReducer } from '../shared/shared.reducer';

export const rootReducer: ActionReducerMap<RootState> = {
  user: userReducer,
  shared: SharedReducer,
};
