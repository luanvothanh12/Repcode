import prisma from "../../../prisma_client"; 
import authenticate from "../../auth/Authenticate";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply authentication middleware
  authenticate(req, res, async () => {
    if (req.method === 'POST') {
      const { name, question, solution, difficulty, collectionId, functionSignature, language, link, notes } = req.body;
  
      try {
        // Calculate tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Create the problem and link it to the collection by collectionId
        const problem = await prisma.problem.create({
          data: {
            name,
            question,
            solution,
            difficulty, 
            collectionId: parseInt(collectionId), // Convert collectionId to integer
            functionSignature,
            language,
            link,
            notes, 
            dueDate: tomorrow, 
          },
        });

        // Update the lastAdded field in the collection
        await prisma.collection.update({
          where: { id: parseInt(collectionId) },
          data: { lastAdded: new Date() },
        });

        console.log("CALLED: /createProblem")
        return res.status(200).json(problem);
      } catch (error) {
        console.error('Failed to create problem:', error);
        return res.status(500).json({ error: 'Failed to create problem' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}