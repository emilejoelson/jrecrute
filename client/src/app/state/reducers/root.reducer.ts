// root.reducer.ts
import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from '../../features/cv-deposit/store/reducers/cv.reducer';
import { State } from '../root.state';
import { recruitmentReducer } from '../../features/recruitment/store/reducers/recruitment.reducer';
import { authReducer } from '../../authentication/data-access/store/reducers/auth.reducer';

export const rootReducer: ActionReducerMap<State> = {
  user: userReducer,
  recruitment: recruitmentReducer,
  authentication: authReducer,
};
