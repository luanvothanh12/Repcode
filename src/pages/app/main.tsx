// Entry point for the actual app, once user successfully logs in 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebaseConfig'; // Ensure this path matches where your firebaseConfig file is located
import CollectionCards from '../../components/app/CollectionCards';

  const Main = () => {

  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CollectionCards />
      </div>
      
    );
  };

export default Main;

