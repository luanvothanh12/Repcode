import prisma from "../../../prisma_client"; 

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { problemId, userId  } = req.query;

    try {
      // Convert problemId to a number and fetch problem details
      const problem = await prisma.problem.findUnique({
        where: {
          id: Number(problemId),
        },
        // make sure only the user who created the problem can see it 
        include: {
          collection: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
      }
  
      if (problem.collection.userId !== Number(userId)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      if (problem) {
        console.log("CALLED: /getProblemDetails"); 
        return res.status(200).json(problem);
      } else {
        // If no problem is found with the given ID
        return res.status(404).json({ message: 'Problem not found' });
      }
    } catch (error) {
      console.error('Failed to fetch problem details:', error);
      return res.status(500).json({ message: 'Failed to fetch problem details' });
    }
  } else {
    // Restrict the HTTP method to GET
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
