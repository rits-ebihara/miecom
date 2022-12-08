import { IQuestionIF } from '../question/IQuestionIF';
import { QuestionModel } from '../question/questionModel';

class QuestionIF implements IQuestionIF {
  async getQuestionById(_id: string): Promise<QuestionModel | null> {
    throw new Error('Method not implemented.');
  }

  getQuestions(_params: {
    limit: number;
    offset: number;
    searchText?: string;
    postUserId?: string;
  }): Promise<QuestionModel[]> {
    throw new Error('Method not implemented.');
  }

  async newSaveQuestion(_question: QuestionModel) {
    throw new Error('Method not implemented.');
  }

  async updateQuestion(_question: QuestionModel) {
    throw new Error('Method not implemented.');
  }
}

export const createQuestionIF = (): IQuestionIF => {
  return new QuestionIF();
};
