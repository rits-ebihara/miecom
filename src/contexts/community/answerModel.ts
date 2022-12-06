import { nanoid } from 'nanoid';
import { z } from 'zod';
import { DeepReadonly } from '~/deepTypes';
import { Question } from './questionModel';
import { User, userSchema } from './user';

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
  postDate: z.date(),
  /** 投稿者 */
  postUser: userSchema,
  /** これで解決 */
  justResolved: z.boolean(),
});

export type AnswerType = z.infer<typeof answerSchema>;

class AnswerImpl implements AnswerType {
  public readonly id: string;
  public readonly questionId: string;
  public readonly body: string;
  public readonly postDate: Date;
  public readonly postUser: DeepReadonly<User>;
  public readonly justResolved: boolean;

  constructor(value: AnswerType) {
    // バリデーション
    const parsed = answerSchema.parse(value);
    this.id = parsed.id;
    this.questionId = parsed.questionId;
    this.body = parsed.body;
    this.postDate = parsed.postDate;
    this.postUser = parsed.postUser;
    this.justResolved = value.justResolved;
  }

  /** これで解決 */
  solvedByThis() {
    return new AnswerImpl({
      ...this,
      justResolved: true,
    });
  }
}

export const createAnswer = (
  body: string,
  postUser: User,
  question: Question,
) => {
  return new AnswerImpl({
    id: nanoid(),
    questionId: question.id,
    body,
    postDate: new Date(),
    postUser: postUser,
    justResolved: false,
  });
};

export const loadAnswer = (value: AnswerType) => {
  return new AnswerImpl(value);
};
