import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import "../../../app/globals.css"; 
import SideBar from '@/components/app/SideBar';
import nookies from "nookies"; 
import firebaseAdmin from "../../../../firebaseAdmin"; 
import Settings from '@/components/app/Settings';
import Link from 'next/link';

const StudyProblemPage = () => {
  const router = useRouter(); 

  return ( 
    <div className="flex min-h-screen bg-base_100">
      <SideBar />
      <div className="flex-grow p-8">
        <div className="text-primary text-4xl font-bold mb-4 flex justify-center">Settings</div>
        <hr className="border-divide mb-8 transition-width duration-300"/>
        <div className="mb-8 text-center text-secondary w-full">
          Note: for most users, the default algorithm settings should be the most optimal and don&apos;t need to be adjusted. <br /> If you want to learn more about these settings and what they do, check out our comprehensive  <Link className="text-blue underline" href="/guide" target="_blank" rel="noopener noreferrer">Guide</Link>
        </div>
        <Settings />

      </div>
    </div>
  );
};

export async function getServerSideProps(context:any) {
  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    
    // Optionally fetch more data for your page using token.uid or other identifiers

    // If the token is valid, return empty props (or props based on token/user data)
    return {
      props: {},
    };
  } catch (err) {
    // If token verification fails or token doesn't exist, redirect to sign-in page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}


export default StudyProblemPage;
