import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../../firebaseConfig'; // Ensure the path is correct
import ProblemsList from '../../../components/app/ProblemsList'; 
import SideBar from '../../../components/app/SideBar'; // Ensure you import SideBar correctly
import '../../../app/globals.css'; 

const CollectionPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  const [collectionName, setCollectionName] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/home/SignInUp');
    }
    const fetchCollectionDetails = async () => {
      const response = await fetch(`/api/getCollectionDetails?collectionId=${collectionId}`);
      if (response.ok) {
        const data = await response.json();
        setCollectionName(data.title);
      }
    };

    if (collectionId) {
      fetchCollectionDetails();
    }
  }, [collectionId, router]);

  return (
    <>
      <div className="flex min-h-screen"> 
        <SideBar /> 
        <div className="flex-grow p-8">
          <div className="text-white text-4xl font-bold mb-4 flex justify-center">:collections/{collectionName}</div>
          <hr className="border-divide mb-8"/>
          <ProblemsList collectionId={collectionId} />
        </div>
      </div>
    </>
  );
};

export default CollectionPage;
