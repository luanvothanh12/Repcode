// Entry point for the actual app, once user successfully logs in 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebaseConfig'; 
import CollectionCards from '../../components/app/CollectionCards';
import SideBar from '../../components/app/SideBar'; 
import '../../app/globals.css'; 
import firebaseAdmin from '../../../firebaseAdmin'; 
import nookies from "nookies"; 


  const Main = () => {

    return (
      <>
        <div className="flex min-h-screen"> 
          <SideBar /> 
          <div className="flex-grow p-8">
            <div className="text-white text-4xl font-bold mb-4 flex justify-center">:collections</div>
            <hr className="border-divide mb-8"/>
            <CollectionCards />
          </div>
        </div>
      </>
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

export default Main;

