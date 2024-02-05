// Entry point for the actual app, once user successfully logs in 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebaseConfig'; // Ensure this path matches where your firebaseConfig file is located
import CollectionCards from '../../components/app/CollectionCards';
import SideBar from '../../components/app/SideBar'; 
import '../../app/globals.css'; 

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

