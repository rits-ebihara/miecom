import { IAnswerIF } from './answer/IAnswerIF';
import { IQuestionIF } from './question/IQuestionIF';
import { IUserIF } from './user/IUserIF';

export type CommunityRepositories = {
  answerIF: IAnswerIF;
  questionIF: IQuestionIF;
  userIF: IUserIF;
};
