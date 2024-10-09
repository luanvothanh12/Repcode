import prisma from "../../../prisma_client"; 
import authenticate from "../../auth/Authenticate";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply authentication middleware
  authenticate(req, res, async () => {
    // Existing handler code here...
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
  
        console.log("CALLED: /deleteCollection"); 
        res.status(200).json({ message: 'Collection and associated problems deleted successfully' });
      } catch (error) {
        console.error('Failed to delete collection:', error);
        res.status(500).json({ error: 'Failed to delete collection' });
      }
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}
