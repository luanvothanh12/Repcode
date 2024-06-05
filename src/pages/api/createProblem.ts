import prisma from "../../../prisma_client"; 
import authenticate from "../../auth/Authenticate";

export default async function handler(req: any, res: any) {
  // Apply authentication middleware
  authenticate(req, res, async () => {
    // Existing handler code here...
    if (req.method === 'POST') {
      const { name, question, solution, difficulty, collectionId, functionSignature, language, link, notes } = req.body;
  
      try {
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
            notes
          },
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

