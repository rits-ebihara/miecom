import { IAnswerIF } from './answer/IAnswerIF';
import { IQuestionIF } from './question/IQuestionIF';
import { CommunityRepositories } from './Repositories';
import { IUserIF } from './user/IUserIF';

export const mockCommunityRepositories: CommunityRepositories = {
  answerIF: {} as IAnswerIF,
  questionIF: {} as IQuestionIF,
  userIF: {} as IUserIF,
};
