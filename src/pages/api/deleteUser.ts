import prisma from "../../../prisma_client";
import admin from "../../../firebaseAdmin";

export default async function handler(req: any, res: any) {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.DELETE_USER_API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method === 'DELETE') {
    const { email } = req.body;

    try {
      // Fetch the user from the database
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Delete all problems associated with the user's collections
      await prisma.problem.deleteMany({
        where: {
          collection: {
            userId: user.id,
          },
        },
      });

      // Delete all collections associated with the user
      await prisma.collection.deleteMany({
        where: { userId: user.id },
      });

      // Delete the user from the database
      const deletedUser = await prisma.user.delete({
        where: { id: user.id },
      });

      // Delete the user from Firebase Authentication
      await admin.auth().getUserByEmail(email)
        .then((userRecord) => {
          return admin.auth().deleteUser(userRecord.uid);
        })
        .then(() => {
          console.log('Successfully deleted user from Firebase');
        })
        .catch((error) => {
          console.error('Error deleting user from Firebase:', error);
        });

      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error:any) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}