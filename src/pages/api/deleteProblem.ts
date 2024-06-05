import prisma from "../../../prisma_client"; 
import authenticate from "../../auth/Authenticate";

export default async function handler(req: any, res: any) {
  // Apply authentication middleware
  authenticate(req, res, async () => {
    // Existing handler code here...
    if (req.method === 'DELETE') {
      const { problemId } = req.query;
      try {
        await prisma.problem.delete({
          where: { id: parseInt(problemId) },
        });
        console.log("CALLED: /deleteProblem"); 
        res.status(200).json({ message: 'Problem deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete problem' });
      }
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
}