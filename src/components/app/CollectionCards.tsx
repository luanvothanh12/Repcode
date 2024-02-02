import React, { useState, useEffect } from 'react';
import CollectionModal from './CollectionModal';
import { auth } from '../../firebaseConfig'
import { useRouter } from 'next/router';

const CollectionCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');


  const router = useRouter();
  const [collections, setCollections] = useState<{ id: string; title: string; }[]>([])


  useEffect(() => {
    const fetchCollections = async () => {
      if (auth.currentUser) {
        const response = await fetch(`/api/getUserCollections?userEmail=${auth.currentUser.email}`);
        if (response.ok) {
          const data = await response.json();
          setCollections(data);
        } else {
          console.error('Failed to fetch collections');
        }
      } else {
        router.push('/home/SignInUp');
      }
    };

    fetchCollections();
  }, [router]);


  const handleCreateCollection = async () => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }

    const response = await fetch('/api/createCollection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: collectionName,
        userEmail: auth.currentUser.email, 
      }),
    });

    if (response.ok) {
      const newCollection = await response.json(); // Assuming the response includes the new collection data
      setCollections(prevCollections => [...prevCollections, newCollection]);
      setIsModalOpen(false); 
    } else {
      // Handle error
      console.error('Failed to create collection');
    }
  };

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    width: '200px',
    backgroundColor: '#f0f0f0',
    color: '#000',
    fontSize: '20px',
    margin: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  };

  return (
    <>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      <div style={cardStyle} onClick={() => setIsModalOpen(true)}>
        Add New
      </div>
      {collections.map((collection) => (
        <div 
          style={cardStyle} 
          key={collection.id} 
          onClick={() => router.push(`/collections/${collection.id}`)}
        >
          {collection.title}
        </div>
      ))}
    </div>
      <CollectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="collectionName">Collection Name:</label>
          <input
            type="text"
            id="collectionName"
            name="collectionName"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
          <button type="button" onClick={handleCreateCollection}>Create</button>
        </form>
      </CollectionModal>
    </>
  );
};

export default CollectionCards;