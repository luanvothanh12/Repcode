// pages/api/getProblemDetails.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    // Extract problem ID from query parameters
    const { problemId } = req.query;

    try {
      // Convert problemId to a number and fetch problem details
      const problem = await prisma.problem.findUnique({
        where: {
          id: Number(problemId),
        },
      });

      if (problem) {
        return res.status(200).json(problem);
      } else {
        // If no problem is found with the given ID
        return res.status(404).json({ message: 'Problem not found' });
      }
    } catch (error) {
      console.error('Failed to fetch problem details:', error);
      // Handle potential errors, such as database connectivity issues
      return res.status(500).json({ message: 'Failed to fetch problem details' });
    }
  } else {
    // Restrict the HTTP method to GET
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
