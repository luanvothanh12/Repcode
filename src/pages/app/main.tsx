// Entry point for the actual app, once user successfully logs in 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebaseConfig'; 
import CollectionCards from '../../components/app/CollectionCards';
import SideBar from '../../components/app/SideBar'; 
import '../../app/globals.css'; 
import firebaseAdmin from '../../../firebaseAdmin'; 
import { parseCookies } from 'nookies';

export const getServerSideProps = async (context:any) => {
  try {
    const cookies = parseCookies(context);
    const token = cookies.__session; // Assuming the token is stored in a cookie named '__session'
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    if (!decodedToken) {
      return {
        redirect: {
          destination: '/home/SignInUp', // Redirect to sign-in page if token is not valid
          permanent: false,
        },
      };
    }

    // Optionally, pass user data as props or perform other server-side logic
    return { props: { /* user data or other props */ } };
  } catch (err) {
    // In case of error or no token, redirect to sign-in page
    return {
      redirect: {
        destination: '/home/SignInUp',
        permanent: false,
      },
    };
  }
};

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

export default Main;

