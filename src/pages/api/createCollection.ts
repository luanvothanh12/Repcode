import prisma from "../../../prisma_client"; 

export default async function handler(req: any, res: any) {

  if (req.method === 'POST') {
    const { title, userEmail } = req.body;
    const images = ['pattern1.svg', 'pattern2.svg', 'pattern3.svg', 'pattern4.svg'];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create the collection with the found userId
      const collection = await prisma.collection.create({
        data: {
          title,
          userId: user.id,
          image: randomImage,
        },
      });

      console.log("CALLED: /createCollection")
      return res.status(200).json(collection);
    } catch (error) {
      console.error('Failed to create collection:', error);
      return res.status(500).json({ error: 'Failed to create collection' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}