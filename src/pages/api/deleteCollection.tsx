import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'DELETE') {
    const { collectionId } = req.query;

    try {
      // Delete all problems associated with the collection
      await prisma.problem.deleteMany({
        where: {
          collectionId: parseInt(collectionId as string),
        },
      });

      // Delete the collection itself
      await prisma.collection.delete({
        where: {
          id: parseInt(collectionId as string),
        },
      });

      res.status(200).json({ message: 'Collection and associated problems deleted successfully' });
    } catch (error) {
      console.error('Failed to delete collection:', error);
      res.status(500).json({ error: 'Failed to delete collection' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}