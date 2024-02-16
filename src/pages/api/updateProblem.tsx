import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'PUT') {
    const { problemId } = req.query; // Assuming problemId is passed as a query parameter
    const { name, question, solution, difficulty, collectionId } = req.body;

    try {
      const updatedProblem = await prisma.problem.update({
        where: {
          id: parseInt(problemId as string), // Ensure the id is an integer
        },
        data: {
          name,
          question,
          solution,
          difficulty: difficulty.toUpperCase(), // Assuming difficulty is stored in uppercase
          collectionId: parseInt(collectionId), 
        },
      });

      return res.status(200).json(updatedProblem);
    } catch (error) {
      console.error('Failed to update problem:', error);
      return res.status(500).json({ error: 'Failed to update problem' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}