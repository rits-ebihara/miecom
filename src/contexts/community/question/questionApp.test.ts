import mockDate from 'mockdate';
import { IAnswerIF } from '../answer/IAnswerIF';
import { CommunityRepositories } from '../Repositories';
import { IUserIF } from '../user/IUserIF';
import { IQuestionIF } from './IQuestionIF';
import { getQuestionApp } from './questionApp';
import { loadQuestion, QuestionType } from './questionModel';

const user = {
  id: 'user001',
  name: 'ユーザー001',
  email: 'user001@example.com',
  organization: '組織001',
};

export const mockCommunityRepositories: CommunityRepositories = {
  answerIF: {} as IAnswerIF,
  questionIF: {
    getQuestionById: jest.fn(),
    getQuestions: jest.fn().mockResolvedValue([]),
    updateQuestion: jest.fn(),
    newSaveQuestion: jest.fn(),
  } as unknown as IQuestionIF,
  userIF: {
    getUserById: jest.fn().mockResolvedValue(user),
  } as IUserIF,
};
const app = getQuestionApp(mockCommunityRepositories);

beforeEach(() => {
  jest.clearAllMocks();
});
test('getQuestionById', async () => {
  await app.getQuestionById('0001');
  expect(mockCommunityRepositories.questionIF.getQuestionById).toBeCalledWith(
    '0001',
  );
});

test('getQuestions', async () => {
  await app.getQuestions(10, 0, 'search text');
  expect(mockCommunityRepositories.questionIF.getQuestions).toBeCalledWith({
    limit: 10,
    offset: 0,
    searchText: 'search text',
  });
});

test('getQuestionByUser', async () => {
  await app.getQuestionsByUser(10, 0, '0001');
  expect(mockCommunityRepositories.questionIF.getQuestions).toBeCalledWith({
    limit: 10,
    offset: 0,
    postedUserId: 'user001',
  });
  (
    mockCommunityRepositories.userIF.getUserById as jest.Mock
  ).mockResolvedValueOnce(null);

  expect(app.getQuestionsByUser(10, 0, '0001')).rejects.toThrow(
    'User not found',
  );
});

test('postQuestion', async () => {
  const question = await app.postQuestion({
    subject: '件名',
    body: '本文',
    userId: '0001',
  });
  expect(mockCommunityRepositories.questionIF.newSaveQuestion).toBeCalledWith({
    id: '012345678901234567890',
    subject: '件名',
    body: '本文',
    postedDate: expect.any(Date),
    postedUser: user,
    isSolved: false,
    update: null,
  });
  expect(question).toEqual({
    id: '012345678901234567890',
    subject: '件名',
    body: '本文',
    postedDate: expect.any(Date),
    postedUser: user,
    isSolved: false,
    update: null,
  });
});

test('updateQuestion', async () => {
  const baseQuestion: QuestionType = {
    id: '012345678901234567890',
    subject: '件名',
    body: '本文',
    postedDate: new Date('2022-12-07T00:00:00Z'),
    postedUser: user,
    isSolved: false,
    update: null,
  };
  (
    mockCommunityRepositories.questionIF.getQuestionById as jest.Mock
  ).mockResolvedValueOnce(loadQuestion(baseQuestion));

  mockDate.set('2023-01-01T00:00:00.000Z');

  const question = await app.updateQuestion('012345678901234567890', {
    subject: '件名update',
    body: '本文update',
  });
  expect(mockCommunityRepositories.questionIF.updateQuestion).toBeCalledWith({
    id: '012345678901234567890',
    subject: '件名update',
    body: '本文update',
    postedDate: new Date('2022-12-07T00:00:00.000Z'),
    postedUser: user,
    isSolved: false,
    update: new Date('2023-01-01T00:00:00.000Z'),
  });
  expect(question).toEqual({
    id: '012345678901234567890',
    subject: '件名update',
    body: '本文update',
    postedDate: new Date('2022-12-07T00:00:00.000Z'),
    postedUser: user,
    isSolved: false,
    update: new Date('2023-01-01T00:00:00.000Z'),
  });
});

test('loadQuestion', async () => {
  const data = {
    id: '012345678901234567890',
    subject: '件名',
    body: '本文',
    postedDate: new Date('2020-01-01T00:00:00.000Z'),
    postedUser: user,
    isSolved: false,
    update: null,
  };
  const question = loadQuestion(data);
  expect(question).toEqual(data);
});
