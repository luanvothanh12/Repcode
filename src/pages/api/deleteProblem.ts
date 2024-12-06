import prisma from "../../../prisma_client";
import authenticate from "../../auth/Authenticate";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: any, res: any) {
  authenticate(req, res, async () => {
    if (req.method === 'DELETE') {
      const { problemId } = req.query;

      try {
        // Fetch the problem and user info, to make sure user can only delete problems belonging to them
        const problem = await prisma.problem.findUnique({
          where: { id: parseInt(problemId as string) },
          include: { collection: true }, 
        });

        const userObject = await prisma.user.findUnique({
          where: {
            email: req.user?.email as string,
          },
        });

        if (!problem) {
          return res.status(404).json({ error: 'Problem not found' });
        }

        // Check if the problem belongs to the authenticated user
        if (problem.collection.userId !== userObject?.id) {
          return res.status(403).json({ error: 'Forbidden: You do not own this problem' });
        }

        // Delete the problem
        await prisma.problem.delete({
          where: { id: parseInt(problemId as string) },
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