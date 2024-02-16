import React, { createContext, useState, useEffect } from 'react';
import nookies from 'nookies';
import { auth } from '../firebaseConfig';
import { User } from 'firebase/auth';

export const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000); // Refresh token every 10 minutes

    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}