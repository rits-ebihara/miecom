import { nanoid } from 'nanoid';
import { z } from 'zod';
import { DeepReadonly } from '~/typeUtils';
import { createUser, UserModel, userSchema } from '../user/userModel';

const questionSchema = z.object({
  /** 質問の一意性を保証するID
   * @description nanoid で生成される21桁の文字列とする
   */
  id: z.string().length(21),
  /** 質問の表題 */
  subject: z.string().min(1).max(125),
  /** 質問の本文(markdown) */
  body: z.string().min(1).max(10000),
  /** 投稿日 */
  postedDate: z.date(),
  /** 投稿者 */
  postedUser: userSchema,
  /** 更新日 */
  update: z.date().nullable(),
  /** 解決状態 */
  isSolved: z.boolean().default(false),
});

export type QuestionType = z.infer<typeof questionSchema>;

const questionForInputSchema = questionSchema.pick({
  subject: true,
  body: true,
});

export type QuestionForInputType = z.infer<typeof questionForInputSchema>;

class QuestionImpl implements DeepReadonly<z.infer<typeof questionSchema>> {
  public static Schema = questionSchema;

  public readonly id: string;
  public readonly subject: string;
  public readonly body: string;
  public readonly postedDate: Date;
  public readonly postedUser: DeepReadonly<UserModel>;
  public readonly update: Date | null;
  public readonly isSolved: boolean;

  constructor(value: QuestionType) {
    const parsed = questionSchema.parse(value);
    const postUser = createUser(parsed.postedUser);
    this.id = parsed.id;
    this.subject = parsed.subject;
    this.body = parsed.body;
    this.postedDate = parsed.postedDate;
    this.postedUser = postUser;
    this.update = value.update;
    this.isSolved = value.isSolved;
  }

  /**
   * タイトルを更新する
   * @param subject タイトル
   * @return 更新された新しいQuestion
   */
  updateSubject(subject: string) {
    const parsedSubject = questionSchema.shape.subject.parse(subject);
    return new QuestionImpl({
      ...this,
      subject: parsedSubject,
      update: new Date(),
    });
  }

  /**
   * 本文を更新する
   * @param body 本文
   * @return 更新された新しいQuestion
   */
  updateBody(body: string) {
    const parsed = questionSchema.shape.body.parse(body);
    return new QuestionImpl({ ...this, body: parsed, update: new Date() });
  }

  /**
   * 解決済みにする
   * @return 更新された新しいQuestion
   */
  solve() {
    return new QuestionImpl({ ...this, isSolved: true });
  }
}

export type QuestionModel = QuestionImpl;

/**
 * 新しいQuestionを作成する
 * @param value 件名、本文
 * @param postUser 投稿者
 * @return 新しいQuestion
 */
export const createQuestion = (
  value: QuestionForInputType,
  postUser: UserModel,
) => {
  return new QuestionImpl({
    ...value,
    id: nanoid(),
    postedDate: new Date(),
    postedUser: postUser,
    isSolved: false,
    update: null,
  });
};

/**
 * 既存の質問データのロードによるオブジェクトの作成
 * @param value Questionデータ
 * @returns Questionオブジェクト
 */
export const loadQuestion = (value: QuestionType) => {
  return new QuestionImpl(value);
};
