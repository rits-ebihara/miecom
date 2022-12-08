// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

export const handler = nc({
  attachParams: true,
  onError: (err, _req: NextApiRequest, res: NextApiResponse) => {
    console.error(err);
    res.status(500).json({ error: 'internal server error.' });
  },
  onNoMatch: (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).json({ error: 'Api path not found.' });
  },
});

export default handler;
