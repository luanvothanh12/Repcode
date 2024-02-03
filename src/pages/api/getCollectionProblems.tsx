import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      // Extract collectionId from the query parameters
      const { collectionId } = req.query;
  
      try {
        // Fetch all problems associated with the collectionId
        const problems = await prisma.problem.findMany({
          where: {
            collectionId: Number(collectionId), // Convert collectionId to number as it's received as a string
          },
        });
  
        // Return the fetched problems
        return res.status(200).json(problems);
      } catch (error) {
        console.error('Failed to fetch problems:', error);
        return res.status(500).json({ error: 'Failed to fetch problems' });
      }
    } else {
      // Handle any non-GET requests
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  