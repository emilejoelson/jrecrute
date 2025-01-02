import { UserState } from '../features/cv-deposit/store/reducers/cv.reducer';
import { SharedState } from './shared/shared.state';

// root.state.ts
export const ROOT_FEATURE_KEY = 'root'; // Define the constant


export interface State {
  readonly [ROOT_FEATURE_KEY]: RootState;
}

export interface RootState {
  user: UserState;
  shared: SharedState;
}
