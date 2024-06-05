import admin from "../../firebaseAdmin";

// this function is used to authenticate API endpoints, so users cant use things like Postman
  // to access them 
export default async function authenticate(req: any, res: any, next: any) {
    const token = req.headers.authorization?.split('Bearer ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  }