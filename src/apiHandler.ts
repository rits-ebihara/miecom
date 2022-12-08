import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

export const api = nc<NextApiRequest, NextApiResponse>({
  attachParams: true,
});
