import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig'

const CollectionPage = () => {
  const router = useRouter();
  const { collectionId } = router.query;
  const [collectionName, setCollectionName] = useState('');

  useEffect(() => {

    if(!auth.currentUser)
    {
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
  }, [collectionId]);

  return (
    <div>
      <h1>{collectionName}</h1>
      {/* Render the rest of your collection page content here */}
    </div>
  );
};

export default CollectionPage;