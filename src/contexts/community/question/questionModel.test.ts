import mockdate from 'mockdate';
import { createQuestion } from './questionModel';

mockdate.set('2020-01-01T00:00:00.000Z');

jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => '012345678901234567890'),
}));

const user = {
  id: 'use001',
  name: 'ユーザー001',
  email: 'user001@example.com',
  organization: '組織001',
};

test('create', () => {
  const question = createQuestion(
    {
      subject: '件名',
      body: '本文',
    },
    user,
  );
  expect(question).toEqual({
    id: '012345678901234567890',
    subject: '件名',
    body: '本文',
    isSolved: false,
    postedDate: new Date('2020-01-01T00:00:00.000Z'),
    postedUser: user,
    update: null,
  });
});

test('update', () => {
  const question = createQuestion(
    {
      subject: '件名',
      body: '本文',
    },
    user,
  );
  mockdate.set('2020-01-02T00:00:00.000Z');
  const q1 = question.updateBody('本文2');
  expect(q1).toEqual({
    id: '012345678901234567890',
    subject: '件名',
    body: '本文2',
    isSolved: false,
    postedDate: new Date('2020-01-01T00:00:00.000Z'),
    postedUser: user,
    update: new Date('2020-01-02T00:00:00.000Z'),
  });

  mockdate.set('2020-01-03T00:00:00.000Z');
  const q2 = q1.updateSubject('件名2');
  expect(q2).toEqual({
    id: '012345678901234567890',
    subject: '件名2',
    body: '本文2',
    isSolved: false,
    postedDate: new Date('2020-01-01T00:00:00.000Z'),
    postedUser: user,
    update: new Date('2020-01-03T00:00:00.000Z'),
  });

  mockdate.set('2020-01-04T00:00:00.000Z');
  const q3 = q2.solve();
  expect(q3).toEqual({
    id: '012345678901234567890',
    subject: '件名2',
    body: '本文2',
    isSolved: true,
    postedDate: new Date('2020-01-01T00:00:00.000Z'),
    postedUser: user,
    // 解決する、は投稿内容の更新ではないので日付は変更されない
    update: new Date('2020-01-03T00:00:00.000Z'),
  });
});
