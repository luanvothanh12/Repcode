import prisma from "../../../prisma_client"; 
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userEmail } = req.query;

    // Ensure userEmail is a string
    if (typeof userEmail !== 'string') {
      return res.status(400).json({ error: 'Invalid user email' });
    }

    try {
      const collections = await prisma.collection.findMany({
        where: {
          user: {
            email: userEmail,
          },
        },
      });

      console.log("CALLED: /getUserCollections")
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