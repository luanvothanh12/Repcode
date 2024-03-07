import prisma from "../../../prisma_client"; 

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { email } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          email,
        },
      });
      console.log("CALLED: /createUser");
      res.status(200).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}