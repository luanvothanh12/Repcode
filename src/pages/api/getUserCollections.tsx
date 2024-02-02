import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { userEmail } = req.query;

    try {
      const collections = await prisma.collection.findMany({
        where: {
          user: {
            email: userEmail,
          },
        },
      });

      return res.status(200).json(collections);
    } catch (error) {
      console.error('Failed to fetch collections:', error);
      return res.status(500).json({ error: 'Failed to fetch collections' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}