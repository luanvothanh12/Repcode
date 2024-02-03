// pages/api/createProblem.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, question, solution, difficulty, collectionId } = req.body;

    try {
      // Create the problem and link it to the collection by collectionId
      const problem = await prisma.problem.create({
        data: {
          name,
          question,
          solution,
          difficulty: difficulty.toUpperCase(), // Ensure the difficulty is in uppercase to match the enum
          collectionId: parseInt(collectionId), // Convert collectionId to integer
        },
      });

      return res.status(200).json(problem);
    } catch (error) {
      console.error('Failed to create problem:', error);
      return res.status(500).json({ error: 'Failed to create problem' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
