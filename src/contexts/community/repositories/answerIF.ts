import { AnswerModel } from './answerModel';
import { IAnswerIF } from './IAnswerIF';

class AnswerIF implements IAnswerIF {
  async getAnswerById(_id: string): Promise<AnswerModel> {
    throw new Error('Method not implemented.');
  }

  async newSaveAnswer(_answer: AnswerModel): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async updateAnswer(_answer: AnswerModel): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const createAnswerIF = (): IAnswerIF => {
  return new AnswerIF();
};
