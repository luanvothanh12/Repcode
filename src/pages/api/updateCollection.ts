import prisma from "../../../prisma_client"; 
import authenticate from "../../auth/Authenticate";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply authentication middleware
  authenticate(req, res, async () => {
    // Existing handler code here...
    if (req.method === 'PUT') {
      const { collectionId } = req.query; // Assuming collectionId is passed as a query parameter
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
        const updatedCollection = await prisma.collection.update({
          where: {
              id: parseInt(collectionId as string), // Ensure the id is an integer
            },
          data: {
            title,
            userId: user.id,
          },
        });
  
        console.log("CALLED: /updateCollection"); 
        return res.status(200).json(updatedCollection);
      } catch (error) {
        console.error('Failed to update collection:', error);
        return res.status(500).json({ error: 'Failed to update collection' });
      }
    } else {
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}