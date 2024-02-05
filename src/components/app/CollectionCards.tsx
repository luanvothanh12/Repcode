import React, { useState, useEffect } from 'react';
import CollectionModal from './CollectionModal';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/router';

const CollectionCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState<{ id: string; title: string; }[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      if (auth.currentUser) {
        const response = await fetch(`/api/getUserCollections?userEmail=${auth.currentUser.email}`);
        if (response.ok) {
          const data = await response.json();
          setCollections(data);
        } else {
          console.error('Failed to fetch collections');
        }
      } else {
        // router.push('/home/SignInUp');
      }
      setIsLoading(false);
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
      const newCollection = await response.json();
      setCollections((prevCollections) => [...prevCollections, newCollection]);
      setIsModalOpen(false);
    } else {
      console.error('Failed to create collection');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin inline-block w-24 h-24 border-4 border-t-transparent border-white rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-20 gap-y-8">
        {collections.map((collection:any) => (
          <div key={collection.id} className="font-bold text-white text-2xl min-w-[20vw] aspect-square flex justify-center items-center bg-cards border border-divide rounded-lg shadow-md cursor-pointer gap-x-12 gap-y-8 transition duration-300 ease-in-out hover:scale-95" onClick={() => router.push(`/app/collections/${collection.id}`)}>
            {collection.title}
          </div>
        ))}
        <button 
          className="flex justify-center items-center bg-pop rounded-full h-20 w-20 shadow-md cursor-pointer m-auto transition duration-300 ease-in-out hover:scale-95"
          onClick={() => setIsModalOpen(true)}
        >
          {/* SVG for Plus Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
          </svg>
        </button>

      </div>
      <CollectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <label htmlFor="collectionName" className="block text-sm font-medium text-gray-700">Collection Name:</label>
          <input type="text" id="collectionName" name="collectionName" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <button type="button" onClick={handleCreateCollection} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Create
          </button>
        </form>
      </CollectionModal>
    </>
  );
};

export default CollectionCards;
