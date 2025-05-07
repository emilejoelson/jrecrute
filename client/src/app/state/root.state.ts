import { AuthState } from '../authentication/data-access/store/auth.state';
import { UserState } from '../features/cv-deposit/store/reducers/cv.reducer';
import { NewsletterState } from '../features/newsletter/data-access/store/newsletter.state';
import { RecruitmentState } from '../features/recruitment/store/reducers/recruitment.reducer';

export interface State {
  user: UserState;
  recruitment: RecruitmentState;
  authentication: AuthState;
  newsletter: NewsletterState;
}
