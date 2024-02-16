import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        // Your Firebase project's admin SDK configuration
        // Replace these with your actual config values
        projectId: "flashcode-6cb10",
        clientEmail: "firebase-adminsdk-xns55@flashcode-6cb10.iam.gserviceaccount.com",
        privateKey: "REDACTED",
      }),
      // databaseURL: "https://your-database-url.firebaseio.com", // If you are using Firebase Realtime Database
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin;