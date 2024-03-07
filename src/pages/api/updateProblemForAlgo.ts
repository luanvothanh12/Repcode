import prisma from "../../../prisma_client"; 

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { id, updates } = req.body;

    try {
      const updatedProblem = await prisma.problem.update({
        where: { id },
        data: updates,
      });

      console.log("CALLED: /updateProblemForAlgo"); 
      return res.status(200).json(updatedProblem);
    } catch (error) {
      console.error('Failed to update problem:', error);
      return res.status(500).json({ error: 'Failed to update problem' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}