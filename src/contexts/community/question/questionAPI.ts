import { api } from '~/apiHandler';
import { communityRepositories } from '../repositories';
import { getQuestionApp } from './questionApp';

/**
 * ID を指定して、質問を取得する
 */
api.get<{ query: { id: string } }>(async (req, res) => {
  const { id } = req.query;
  const question = await getQuestionApp(communityRepositories).getQuestionById(
    id,
  );
  if (!question) {
    res.status(404).json({ error: 'Question not found.' });
    return;
  }
  res.json(question);
});

/**
 * 質問を投稿する
 */
api.post('/', async (req, res) => {
  const { subject, body } = req.body;
  const question = await getQuestionApp(communityRepositories).postQuestion({
    subject,
    body,
    userId: '1',
  });
  res.json(question);
});

/**
 * 質問を更新する
 */
api.put<{ query: { id: string } }>('/:id', async (req, res) => {
  const { id } = req.query;
  const { subject, body } = req.body;
  const question = await getQuestionApp(communityRepositories).updateQuestion(
    id,
    {
      subject,
      body,
    },
  );
  res.json(question);
});
