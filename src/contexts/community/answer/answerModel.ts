import { nanoid } from 'nanoid';
import { z } from 'zod';
import { DeepReadonly } from '~/typeUtils';
import { QuestionModel } from '../question/questionModel';
import { UserModel, userSchema } from '../user/userModel';

export const answerSchema = z.object({
  /** 回答の一意性を保証するID
   * @description nanoid で生成される21桁の文字列とする
   */
  id: z.string().length(21),
  /** 対象の質問ID */
  questionId: z.string().length(21),
  /** 回答の本文(markdown) */
  body: z.string().min(1).max(10000),
  /** 投稿日 */
  postedDate: z.date(),
  /** 投稿者 */
  postedUser: userSchema,
  /** これで解決 */
  solvedThis: z.boolean(),
});

export type AnswerType = z.infer<typeof answerSchema>;

class AnswerImpl implements AnswerType {
  public readonly id: string;
  public readonly questionId: string;
  public readonly body: string;
  public readonly postedDate: Date;
  public readonly postedUser: DeepReadonly<UserModel>;
  public readonly solvedThis: boolean;

  constructor(value: AnswerType) {
    // バリデーション
    const parsed = answerSchema.parse(value);
    this.id = parsed.id;
    this.questionId = parsed.questionId;
    this.body = parsed.body;
    this.postedDate = parsed.postedDate;
    this.postedUser = parsed.postedUser;
    this.solvedThis = value.solvedThis;
  }

  /** これで解決 */
  solvedByThis() {
    return new AnswerImpl({
      ...this,
      solvedThis: true,
    });
  }
}

export type AnswerModel = AnswerImpl;

export const createAnswer = (
  body: string,
  postUser: UserModel,
  question: QuestionModel,
) => {
  return new AnswerImpl({
    id: nanoid(),
    questionId: question.id,
    body,
    postedDate: new Date(),
    postedUser: postUser,
    solvedThis: false,
  });
};

export const loadAnswer = (value: AnswerType) => {
  return new AnswerImpl(value);
};
