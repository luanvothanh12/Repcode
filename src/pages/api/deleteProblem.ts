import prisma from "../../../prisma_client"; 
import authenticate from "../../auth/Authenticate";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply authentication middleware
  authenticate(req, res, async () => {
    if (req.method === 'DELETE') {
      const { problemId } = req.query;

      // Ensure problemId is a string
      if (typeof problemId !== 'string') {
        return res.status(400).json({ error: 'Invalid problem ID' });
      }

      try {
        await prisma.problem.delete({
          where: { id: parseInt(problemId) },
        });
        console.log("CALLED: /deleteProblem"); 
        res.status(200).json({ message: 'Problem deleted successfully' });
      } catch (error) {
        console.error('Failed to delete problem:', error);
        res.status(500).json({ error: 'Failed to delete problem' });
      }
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}