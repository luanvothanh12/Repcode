import prisma from "../../../prisma_client"; 
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { collectionId, userId } = req.query;

        try {
            // Fetch collection to verify ownership
            const collection = await prisma.collection.findUnique({
                where: {
                    id: Number(collectionId),
                },
                select: {
                    userId: true,
                },
            });

            if (!collection) {
                return res.status(404).json({ error: 'Collection not found' });
            }

            if (collection.userId !== Number(userId)) {
                return res.status(403).json({ error: 'Access denied' });
            }

            // Fetch all problems associated with the collectionId
            const problems = await prisma.problem.findMany({
                where: {
                    collectionId: Number(collectionId),
                },
            });

            // Return the fetched problems
            console.log("CALLED: /getCollectionProblems");
            return res.status(200).json(problems);
        } catch (error) {
            console.error('Failed to fetch problems:', error);
            return res.status(500).json({ error: 'Failed to fetch problems' });
        }
    } else {
        // Handle any non-GET requests
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
