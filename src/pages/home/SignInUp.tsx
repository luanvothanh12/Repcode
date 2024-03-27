import React, { useState, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useRouter } from 'next/router'; 
import nookies from "nookies"; 
import firebaseAdmin from "../../../firebaseAdmin";
import Link from 'next/link'; 



import '../../app/globals.css';

const SignInUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); 

  const signUp = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence); // Set persistence before signing up
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
  
      await router.push('/app/main');
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up. Please check your details and try again.'); 
    }
  };

  const signIn = async () => {

    try {
      await setPersistence(auth, browserLocalPersistence); // Set persistence before signing in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);
      router.push('/app/main');
    } catch (error:any) {
      console.error('Error signing in:', error);
      setError(error.message); 
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(credential)
      {
        const token = credential.accessToken;
      }
      // The signed-in user info.
      const user = result.user;
  
      console.log('User signed in with Google:', user);
  
      // Optional: Call your backend API to create/update the user in your database
      await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
  
      router.push('/app/main');
    } catch (error:any) {
      console.error('Error signing in with Google:', error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // Show error message to user here
      setError(errorCode);
    }
  };
  


  return (
    
      <div className="bg-white dark:bg-base_100 flex h-full items-center justify-center py-16">
        <main className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white border border-feintwhite rounded-xl shadow-sm dark:bg-neutral dark:border-neutral">
          <div className="m-4">
          <Link href="/">
            <div className="text-grey text-sm hover:underline dark:text-primary">Go Back</div>
          </Link>
        </div>
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-3xl font-bold text-neutral dark:text-white">
                  {showSignUp ? "Sign Up" : "Sign In"}
                </h1>
                <p className="mt-2 text-sm text-grey dark:text-primary">
                  {showSignUp ? "Already have an account? " : "Don't have an account yet? "}
                  <span 
                    className="text-grey decoration-2 hover:underline font-medium dark:text-primary cursor-pointer"
                    onClick={() => setShowSignUp(!showSignUp)}
                  >
                    {showSignUp ? "Sign in here" : "Sign up here"}
                  </span>
                </p>
              </div>
              <div className="mt-8 grid">
        <button onClick={googleSignIn} type="button" className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-divide2 bg-white hover:bg-feintwhite shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:text-neutral">
          <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
            <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
            <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
            <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
            <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
          </svg>
          Sign in with Google
        </button>
        <div className="py-6 flex items-center text-sm text-grey uppercase before:flex-[1_1_0%] before:border-t before:me-6 after:flex-[1_1_0%] after:border-t after:ms-6 dark:text-primary">Or</div>

      </div>
    
              <div className="mt-5">
              {error && <div className="text-error">{error}</div>}
                <form onSubmit={(e) => {
                  e.preventDefault();
                  showSignUp ? signUp() : signIn();
                }}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 text-neutral dark:text-white">Email address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="py-3 px-4 block w-full border border-divide2 rounded-lg text-sm disabled:pointer-events-none" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
    
                    <div>
                      <label htmlFor="password" className="block text-sm mb-2 text:neutral dark:text-white">Password</label>
                      <input 
                        type="password" 
                        id="password" 
                        className="py-3 px-4 block w-full border border-divide2 rounded-lg text-sm" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                      />
                    </div>
    
                    <button 
                      type="submit" 
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-pop2 text-neutral dark:bg-pop transition-transform duration-200 hover:scale-95"
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

export async function getServerSideProps(context:any) {
  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // If the token is valid, it means the user is signed in. 
    // Therefore, redirect them to /app/main.
    return {
      redirect: {
        destination: '/app/main', // Adjust the path as needed.
        permanent: false,
      },
    };
  } catch (err) {
    // If token verification fails or token doesn't exist,
    // it means the user is not signed in, so we render the page as intended.
    return {
      props: {}, // You can pass props to the page if needed.
    };
  }
}


export default SignInUp;