import { UserModel } from '../user/userModel';
import { AnswerModel, createAnswer } from './answerModel';
import { getQuestionApp } from '../question/questionApp';
import { CommunityRepositories } from '../Repositories';

class AnswerApp {
  // eslint-disable-next-line no-useless-constructor
  constructor(private dataRepos: CommunityRepositories) {}

  /**
   * 新しい回答を登録する
   * @param content 回答の内容(Markdown)
   * @param user 回答ユーザー
   * @param questionId 対象の質問ID
   * @returns
   */
  async createAnswer(
    content: string,
    postUserId: UserModel['id'],
    questionId: string,
  ): Promise<AnswerModel> {
    const questionApp = getQuestionApp(this.dataRepos);
    const question = await questionApp.getQuestionById(questionId);
    if (!question) throw new Error('Question not found');
    const user = await this.dataRepos.userIF.getUserById(postUserId);
    if (!user) throw new Error('User not found');
    const answer = createAnswer(content, user, question);
    this.dataRepos.answerIF.newSaveAnswer(answer);
    return answer;
  }
}

let _app: AnswerApp;

export const getAnswerApp = (
  communityRepositories: CommunityRepositories,
): AnswerApp => {
  if (_app) return _app;
  _app = new AnswerApp(communityRepositories);
  return _app;
};
