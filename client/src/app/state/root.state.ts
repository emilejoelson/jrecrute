import { UserState } from '../features/cv-deposit/store/reducers/cv.reducer';
import { RecruitmentState } from '../features/recruitment/store/reducers/recruitment.reducer';
export interface State {
  user: UserState;
  recruitment: RecruitmentState;
}
