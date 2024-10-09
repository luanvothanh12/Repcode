import prisma from "../../../prisma_client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { collectionId } = req.body;

    try {
      const collection = await prisma.collection.findUnique({
        where: { id: parseInt(collectionId) },
        include: { problems: true },
      });

      if (!collection) {
        return res.status(404).json({ error: 'Collection not found' });
      }

      const newCount = collection.problems.filter(problem => problem.type === 'New').length;
      const learningCount = collection.problems.filter(problem => problem.type === 'Learning' || problem.type === 'Relearning').length;
      const reviewCount = collection.problems.filter(problem => problem.type === 'Review').length;

      await prisma.collection.update({
        where: { id: parseInt(collectionId) },
        data: {
          newCount,
          learningCount,
          reviewCount,
        },
      });

      console.log(`Updated collection ${collectionId}: newCount=${newCount}, learningCount=${learningCount}, reviewCount=${reviewCount}`);
      return res.status(200).json({ message: 'Problem counts updated successfully' });
    } catch (error) {
      console.error('Failed to update problem counts:', error);
      return res.status(500).json({ error: 'Failed to update problem counts' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}