import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import "../../../app/globals.css"; 
import SideBar from '@/components/app/SideBar';
import nookies from "nookies"; 
import firebaseAdmin from "../../../../firebaseAdmin"; 
import ProblemTypeInfo from '@/components/app/ProblemTypeInfo';
import BarGraph from '@/components/app/BarGraph';
import Link from 'next/link';

const StudyProblemPage = () => {
  const router = useRouter(); 

  return (
    <div className="flex min-h-screen bg-white dark:bg-base_100 transition-width duration-300">
      <SideBar />
      <div className="flex-grow p-8">
        <div className="text-neutral dark:text-white text-4xl font-bold mb-4 flex justify-center">Study</div>
        <hr className="border-feintwhite dark:border-divide mb-8 transition-width duration-300"/>
        <div className="mb-8 text-center text-neutral dark:text-primary">
          To learn more about Study Mode, check out our comprehensive <Link className="text-blue underline" href="/guide">Guide</Link>
        </div>
        <ProblemTypeInfo />
        <div className="flex justify-center">
          <BarGraph />
        </div>

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
        destination: '/home/SignInUp',
        permanent: false,
      },
    };
  }
}


export default StudyProblemPage;
