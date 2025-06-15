import { AuthState } from '../authentication/data-access/store/auth.state';
import { UserState } from '../features/cv-deposit/store/reducers/cv.reducer';
import { RoleState } from '../features/dashboard/dashboard-content/pages/manage-role/data-access/stores/role.state';
import { AuthenticatedState } from '../features/dashboard/dashboard-content/pages/manage-user/data-access/stores/manage-user.state';
import { NewsletterContentState } from '../features/newsletter/data-access/store/newsletter-content.state';
import { NewsletterState } from '../features/newsletter/data-access/store/newsletter.state';
import { RecruitmentState } from '../features/recruitment/store/reducers/recruitment.reducer';

export interface State {
  user: UserState;
  recruitment: RecruitmentState;
  authentication: AuthState;
  newsletter: NewsletterState;
  newsletterContent: NewsletterContentState;
  authenticated: AuthenticatedState;
  role: RoleState;
}
