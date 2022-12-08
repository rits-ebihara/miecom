import { AnswerModel } from './answerModel';

export interface IAnswerIF {
  getAnswerById(id: string): Promise<AnswerModel>;
  newSaveAnswer(answer: AnswerModel): Promise<void>;
  updateAnswer(answer: AnswerModel): Promise<void>;
}
