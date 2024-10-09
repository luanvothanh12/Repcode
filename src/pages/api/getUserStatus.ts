import prisma from "../../../prisma_client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userEmail } = req.query;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail as string,
        },
        select: {
          newUser: true,
        },
      });

      if (user) {
        return res.status(200).json({ newUser: user.newUser });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Failed to get user status:', error);
      return res.status(500).json({ error: 'Failed to get user status' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}