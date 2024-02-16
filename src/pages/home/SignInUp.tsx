import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useRouter } from 'next/router'; 
import { setCookie } from 'nookies';


import '../../app/globals.css';

const SignInUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const router = useRouter(); 

  const signUp = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Set persistence before signing up
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userToken = await user.getIdToken();
      setCookie(null, '__session', userToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: true, // Ensure this is true to send the cookie over HTTPS only
        httpOnly: true, // Optional based on your security requirements
      });
      console.log('User created:', user);
  
      // Call your API endpoint to create the user in your MySQL database
      await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
  
      await router.push('/app/main');
    } catch (error) {
      console.error('Error signing up:', error);
      // Show error message to user here
    }
  };

  const signIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Set persistence before signing in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userToken = await user.getIdToken();
      setCookie(null, '__session', userToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: true, // Ensure this is true to send the cookie over HTTPS only
        httpOnly: true, // Optional based on your security requirements
      });
      console.log('User signed in:', user);
      router.push('/app/main');
    } catch (error) {
      console.error('Error signing in:', error);
      // Show error message to user here
    }
  };


  return (
    
      <div className="dark:bg-slate-900 flex h-full items-center justify-center py-16">
        <main className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-neutral rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-3xl font-bold text-white dark:text-white">
                  {showSignUp ? "Sign Up" : "Sign In"}
                </h1>
                <p className="mt-2 text-sm text-primary dark:text-gray-400">
                  {showSignUp ? "Already have an account? " : "Don't have an account yet? "}
                  <span 
                    className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 cursor-pointer"
                    onClick={() => setShowSignUp(!showSignUp)}
                  >
                    {showSignUp ? "Sign in here" : "Sign up here"}
                  </span>
                </p>
              </div>
    
              <div className="mt-5">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  showSignUp ? signUp() : signIn();
                }}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 dark:text-white text-white">Email address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
    
                    <div>
                      <label htmlFor="password" className="block text-sm mb-2 dark:text-white text-white">Password</label>
                      <input 
                        type="password" 
                        id="password" 
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
    
                    <button 
                      type="submit" 
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-pop text-neutral disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 transition-transform duration-200 hover:scale-95"
                    >
                      {showSignUp ? "Sign Up" : "Sign In"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
};

export default SignInUp;