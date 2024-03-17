import prisma from "../../../prisma_client";

export default async function handler(req:any, res:any) {
  if (req.method === 'PUT') {
    const { userEmail, settings } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          ...settings,
        },
      });

      console.log("CALLED: /updateUserSettings");
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Failed to update user settings:', error);
      return res.status(500).json({ error: 'Failed to update user settings' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}