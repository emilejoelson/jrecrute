import { UserEffects } from '../../features/cv-deposit/store/effects/cv.effects';
import { ErrorEffects } from './error.effects';

export const AppEffects = [ErrorEffects, UserEffects];
