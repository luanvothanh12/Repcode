import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../../firebaseConfig'; 
import ProblemsList from '../../../components/app/ProblemsList'; 
import SideBar from '../../../components/app/SideBar'; 
import '../../../app/globals.css'; 
import nookies from "nookies"; 
import firebaseAdmin from "../../../../firebaseAdmin"; 
import { useQuery } from 'react-query';


const CollectionPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;


  const fetchCollectionDetails = async () => {
    const response = await fetch(`/api/getCollectionDetails?collectionId=${collectionId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const { data, isLoading, error } = useQuery(['collectionDetails', collectionId], fetchCollectionDetails, {
    enabled: !!collectionId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <div className="flex min-h-screen bg-white dark:bg-base_100 transition-width duration-300"> 
        <SideBar /> 
        <div className="flex-grow p-8">
          <div className="text-neutral dark:text-white text-4xl font-bold mb-4 flex justify-center">:collections/{data.title}</div>
          <hr className="border-feintwhite dark:border-divide mb-8 transition-width duration-300"/>
          <ProblemsList collectionId={collectionId} />
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

export default CollectionPage;
