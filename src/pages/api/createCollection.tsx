import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, userEmail } = req.body;

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create the collection with the found userId
      const collection = await prisma.collection.create({
        data: {
          title,
          userId: user.id,
        },
      });

      return res.status(200).json(collection);
    } catch (error) {
      console.error('Failed to create collection:', error);
      return res.status(500).json({ error: 'Failed to create collection' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}