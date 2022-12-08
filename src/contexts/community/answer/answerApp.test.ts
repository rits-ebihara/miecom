/* eslint-disable @typescript-eslint/no-explicit-any */
import { IQuestionIF } from '../question/IQuestionIF';
import { CommunityRepositories } from '../Repositories';
import { IUserIF } from '../user/IUserIF';
import { getAnswerApp } from './answerApp';
import { IAnswerIF } from './IAnswerIF';
import mockDate from 'mockdate';

mockDate.set('2022-12-07T08:00:00.000Z');

export const mockCommunityRepositories = {
  questionIF: {
    getQuestionById: jest.fn().mockResolvedValue({
      id: 'q01234567890123456789',
      title: '質問タイトル',
    }),
  } as unknown as IQuestionIF,
  userIF: {
    getUserById: jest.fn().mockResolvedValue({
      id: 'u01234567890123456789',
      name: 'ユーザー名',
      email: 'user001@example.com',
      organization: '組織001',
    }),
  } as IUserIF,
  answerIF: {
    newSaveAnswer: jest.fn(),
  } as unknown as IAnswerIF,
} as CommunityRepositories;

const app = getAnswerApp(mockCommunityRepositories);

test('createAnswer', async () => {
  const answer = await app.createAnswer(
    '本文',
    'u01234567890123456789',
    'q01234567890123456789',
  );
  expect(mockCommunityRepositories.answerIF.newSaveAnswer).toBeCalledWith({
    body: '本文',
    id: '012345678901234567890',
    postedDate: new Date('2022-12-07T08:00:00Z'),
    postedUser: {
      email: 'user001@example.com',
      id: 'u01234567890123456789',
      name: 'ユーザー名',
      organization: '組織001',
    },
    questionId: 'q01234567890123456789',
    solvedThis: false,
  });
  expect(answer).toEqual({
    body: '本文',
    id: '012345678901234567890',
    postedDate: new Date('2022-12-07T08:00:00Z'),
    postedUser: {
      email: 'user001@example.com',
      id: 'u01234567890123456789',
      name: 'ユーザー名',
      organization: '組織001',
    },
    questionId: 'q01234567890123456789',
    solvedThis: false,
  });
});
