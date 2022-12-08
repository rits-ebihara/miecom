import mockDate from 'mockdate';
import { QuestionModel } from '../question/questionModel';
import { AnswerType, createAnswer, loadAnswer } from './answerModel';

mockDate.set('2020-01-01T00:00:00.000Z');

const user = {
  id: 'use001',
  name: 'ユーザー001',
  email: 'user001@example.com',
  organization: '組織001',
};

const question = {
  id: 'Q01234567890123456789',
  subject: '件名',
  body: '本文',
  isSolved: false,
  postedDate: new Date('2020-01-01T00:00:00.000Z'),
  postedUser: user,
  update: null,
} as QuestionModel;

test('createAnswer', () => {
  const answer = createAnswer('body', user, question);
  expect(answer).toEqual({
    id: '012345678901234567890',
    body: 'body',
    questionId: 'Q01234567890123456789',
    postedDate: new Date('2020-01-01T00:00:00.000Z'),
    postedUser: user,
    solvedThis: false,
  });
});

test('solvedByThis', () => {
  const answer = createAnswer('body', user, question);
  const answer2 = answer.solvedByThis();
  expect(answer2).toEqual({
    id: '012345678901234567890',
    body: 'body',
    questionId: 'Q01234567890123456789',
    postedDate: new Date('2020-01-01T00:00:00.000Z'),
    postedUser: user,
    solvedThis: true,
  });
});

test('load answer', () => {
  const data: AnswerType = {
    id: '012345678901234567890',
    body: 'body',
    questionId: 'Q01234567890123456789',
    postedDate: new Date('2020-01-01T00:00:00.000Z'),
    postedUser: user,
    solvedThis: false,
  };
  const answer = loadAnswer(data);
  expect(answer).toEqual(data);
});
