import prisma from "../../../prisma_client";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userEmail } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          newUser: false,
        },
      });

      console.log("CALLED: /updateNewUserStatus");
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Failed to update newUser status:', error);
      return res.status(500).json({ error: 'Failed to update newUser status' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}