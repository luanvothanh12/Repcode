// Home page, entry point of the application 

import React from 'react';
import Logo from '@/components/home/Logo';
import Description from '@/components/home/Description';
import NavBar from '@/components/home/NavBar';
import nookies from "nookies";
import firebaseAdmin from "../../firebaseAdmin"; 
import "../app/globals.css";

export default function Home() {
  return (
    <div>
      <NavBar />
    <div className="flex justify-center items-center h-screen"> 
        <Logo />
      </div>
      <Description /> 
    </div>
  );
}

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