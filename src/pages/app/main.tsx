// Entry point for the actual app, once user successfully logs in 

import React, { useEffect, useState, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { AuthContext } from "@/auth/AuthContext"; 
import CollectionCards from '../../components/app/CollectionCards';
import SideBar from '../../components/app/SideBar'; 
import '../../app/globals.css'; 
import firebaseAdmin from '../../../firebaseAdmin'; 
import nookies from "nookies"; 
import FirstTimeLogIn from '@/components/app/FirstTimeLogin';
import { useQuery, useQueryClient } from 'react-query'; 


  const Main = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext); 
    const queryClient = useQueryClient(); 

    const fetchUserStatus = async () => {
      if (!user) throw new Error("No user found");
      const response = await fetch(`/api/getUserStatus?userEmail=${user.email}`);
      if (!response.ok) throw new Error("Failed to fetch user status");
      return response.json();
    };
  
    const { data, error, isLoading } = useQuery(
      ['userStatus', user?.email],
      fetchUserStatus,
      {
        enabled: !!user, 
        onSuccess: (data) => {
          if (data.newUser) {
            setIsModalOpen(true);  // Open the modal if newUser is true
          }
        },
      }
    );

    const handleCloseModal = async () => {
      try {
        await fetch('/api/updateNewUserStatus', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail: user?.email }), 
        });
  
        // Invalidate the cache after updating newUser status to false
        queryClient.invalidateQueries(['userStatus', user?.email]);
  
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating newUser status:', error);
      }
    };

    return (
      <>
        <FirstTimeLogIn isOpen={isModalOpen} onClose={handleCloseModal} />
        <div className="flex min-h-screen bg-base_100 transition-width duration-300"> 
          <SideBar /> 
          <div className="flex-grow p-8">
            <div className="text-primary text-4xl font-bold mb-4 flex justify-center">Collections</div>
            <hr className="border-divide mb-8 transition-width duration-300"/>
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
          destination: '/login',
          permanent: false,
        },
      };
    }
  }

export default Main;

