import prisma from "../../../prisma_client"; 
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const collectionId = Number(req.query.collectionId);

    try {
      const collection = await prisma.collection.findUnique({
        where: {
          id: collectionId,
        },
        select: {
          title: true, 
          lastAdded: true, 
          problems: true, 
        },
      });

      if (collection) {
        console.log("CALLED: /getCollectionDetails"); 
        return res.status(200).json(collection);
      } else {
        return res.status(404).json({ error: 'Collection not found' });
      }
    } catch (error) {
      console.error('Failed to fetch collection details:', error);
      return res.status(500).json({ error: 'Failed to fetch collection details' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}