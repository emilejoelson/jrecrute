import { AuthEffects } from '../../authentication/data-access/store/effects/auth.effects';
import { UserEffects } from '../../features/cv-deposit/store/effects/cv.effects';
import { RecruitmentEffects } from '../../features/recruitment/store/effects/recruitment.effects';
import { ErrorEffects } from './error.effects';

export const AppEffects = [ErrorEffects, UserEffects,RecruitmentEffects,AuthEffects];
