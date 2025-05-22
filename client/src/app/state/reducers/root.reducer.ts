import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from '../../features/cv-deposit/store/reducers/cv.reducer';
import { State } from '../root.state';
import { recruitmentReducer } from '../../features/recruitment/store/reducers/recruitment.reducer';
import { authReducer } from '../../authentication/data-access/store/reducers/auth.reducer';
import { newsletterReducer } from '../../features/newsletter/data-access/store/reducers/newsletter.reducer';
import { newsletterContentReducer } from '../../features/newsletter/data-access/store/reducers/newsletter-content.reducer';

export const rootReducer: ActionReducerMap<State> = {
  user: userReducer,
  recruitment: recruitmentReducer,
  authentication: authReducer,
  newsletter: newsletterReducer,
  newsletterContent: newsletterContentReducer,
};
