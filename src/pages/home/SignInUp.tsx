import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'; 

import '../../app/globals.css';

const SignInUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const router = useRouter(); 

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User created:', user);
  
      // Call your API endpoint to create the user in your MySQL database
      await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
  
      router.push('/app/main');
    } catch (error) {
      console.error('Error signing up:', error);
      // Show error message to user here
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      const user = userCredential.user;
      console.log('User signed in:', user);
      router.push('/app/main');
    } catch (error) {
      console.error('Error signing in:', error);
      // Show error message to user here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-8">
        <img src="/logo.png" alt="Logo" className="mx-auto w-20 h-20" />
        <h1 className="text-xl font-bold">Welcome to Flashcode</h1>
      </div>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => { setShowSignIn(false); setShowSignUp(true); }}
        >
          Sign Up
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => { setShowSignUp(false); setShowSignIn(true); }}
        >
          Log In
        </button>
      </div>
      {(showSignUp || showSignIn) && (
        <div className="mt-8">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {showSignUp && (
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={signUp}
            >
              Sign Up
            </button>
          )}
          {showSignIn && (
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={signIn}
            >
              Log In
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SignInUp;