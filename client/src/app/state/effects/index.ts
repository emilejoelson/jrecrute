import { AuthEffects } from '../../authentication/data-access/store/effects/auth.effects';
import { UserEffects } from '../../features/cv-deposit/store/effects/cv.effects';
import { RoleEffects } from '../../features/dashboard/dashboard-content/pages/manage-role/data-access/stores/effects/role.effects';
import { AuthUsersEffects } from '../../features/dashboard/dashboard-content/pages/manage-user/data-access/stores/effects/manage-user.effects';
import { NewsletterContentEffects } from '../../features/newsletter/data-access/store/effects/newsletter-content.effects';
import { NewsletterEffects } from '../../features/newsletter/data-access/store/effects/newsletter.effects';
import { RecruitmentEffects } from '../../features/recruitment/store/effects/recruitment.effects';
import { ErrorEffects } from './error.effects';

export const AppEffects = [
  ErrorEffects,
  UserEffects,
  RecruitmentEffects,
  AuthEffects,
  NewsletterEffects,
  NewsletterContentEffects,
  AuthUsersEffects,
  RoleEffects,
];
