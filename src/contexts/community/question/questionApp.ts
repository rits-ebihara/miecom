import { CommunityRepositories } from '../Repositories';
import { UserModel } from '../user/userModel';
import { createQuestion, QuestionModel, QuestionType } from './questionModel';

class QuestionApp {
  // eslint-disable-next-line no-useless-constructor
  constructor(private repositories: CommunityRepositories) {}

  /**
   * IDを指定して、質問を取得する
   * @param id 質問ID
   */
  async getQuestionById(id: string): Promise<QuestionModel | null> {
    const question = await this.repositories.questionIF.getQuestionById(id);
    return question;
  }

  /**
   * 質問の一覧を取得する
   * @param limit 取得する質問の数
   * @param offset 取得する質問の開始位置
   * @param searchText 検索文字列
   * @returns 質問の一覧
   */
  async getQuestions(
    limit: number,
    offset: number,
    searchText: string,
  ): Promise<QuestionType[]> {
    const questions = await this.repositories.questionIF.getQuestions({
      limit,
      offset,
      searchText,
    });
    return questions;
  }

  /**
   * 指定ユーザーの質問の一覧を取得する
   * @param limit 取得する質問の数
   * @param offset 取得する質問の開始位置
   * @param user 質問者
   * @returns 質問の一覧
   */
  async getQuestionsByUser(
    limit: number,
    offset: number,
    postUserId: UserModel['id'],
  ) {
    const user = await this.repositories.userIF.getUserById(postUserId);
    if (!user) throw new Error('User not found');
    const questions = await this.repositories.questionIF.getQuestions({
      limit,
      offset,
      postedUserId: user.id,
    });
    return questions;
  }

  /**
   * 新しい質問を投稿する
   * @params subject 質問のタイトル
   * @params body 質問の本文
   * @params userId 質問者のID
   * @returns 投稿された質問
   */
  async postQuestion(params: {
    subject: QuestionModel['subject'];
    body: QuestionModel['body'];
    userId: UserModel['id'];
  }) {
    const { userId, ...rest } = params;
    const user = await this.repositories.userIF.getUserById(userId);
    if (!user) throw new Error('User not found');
    const question = createQuestion(rest, user);
    await this.repositories.questionIF.newSaveQuestion(question);
    return question;
  }

  /**
   * 質問を更新する
   * @param id 質問ID
   * @param value 変更する表題及び本文
   * @returns 更新された質問
   */
  async updateQuestion(
    id: QuestionType['id'],
    value: Pick<QuestionType, 'subject' | 'body'>,
  ) {
    const question = await this.repositories.questionIF.getQuestionById(id);
    if (!question) throw new Error('Question not found');
    const updatedQuestion = question
      .updateSubject(value.subject)
      .updateBody(value.body);
    await this.repositories.questionIF.updateQuestion(updatedQuestion);
    return updatedQuestion;
  }
}

let _app: QuestionApp;

export const getQuestionApp = (
  repositories: CommunityRepositories,
): QuestionApp => {
  if (_app) return _app;
  _app = new QuestionApp(repositories);
  return _app;
};
