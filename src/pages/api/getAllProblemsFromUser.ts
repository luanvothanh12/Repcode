import prisma from "../../../prisma_client"; 

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { userEmail } = req.query;

    try {
      // Fetch all collections associated with the user
      const collections = await prisma.collection.findMany({
        where: {
          user: {
            email: userEmail,
          },
        },
        include: {
          problems: true, // Include all problems in the response
        },
      });

      // Flatten the problems from all collections
      const problems = collections.reduce((acc:any, collection:any) => [...acc, ...collection.problems], []);

      console.log("CALLED: /getAllProblemsFromUser")
      return res.status(200).json(problems);
    } catch (error) {
      console.error('Failed to fetch problems for user:', error);
      return res.status(500).json({ error: 'Failed to fetch problems for user' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}