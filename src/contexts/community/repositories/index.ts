import { createAnswerIF } from './answerIF';
import { createQuestionIF } from './questionIF';
import { createUserIF } from './userIf';

export const communityRepositories = {
  answerIF: createAnswerIF(),
  questionIF: createQuestionIF(),
  userIF: createUserIF(),
};
