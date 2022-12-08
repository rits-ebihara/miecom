import { QuestionModel } from './questionModel';

export interface IQuestionIF {
  getQuestionById: (id: string) => Promise<QuestionModel | null>;
  getQuestions: (params: {
    limit: number;
    offset: number;
    searchText?: string;
    postedUserId?: QuestionModel['id'];
  }) => Promise<QuestionModel[]>;
  newSaveQuestion: (value: QuestionModel) => Promise<void>;
  updateQuestion: (value: QuestionModel) => Promise<void>;
}
