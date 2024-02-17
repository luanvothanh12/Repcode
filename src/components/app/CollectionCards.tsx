import React, { useState, useEffect, useContext } from 'react';
import CollectionModal from './CollectionModal';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/router';
import { AuthContext } from '@/auth/AuthContext';

const CollectionCards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState<{ id: string; title: string; }[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [visibleMenuId, setVisibleMenuId] = useState(null); // Added state to manage visibility of dropdown
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [collectionToEdit, setCollectionToEdit] = useState(null);
  const { user } = useContext(AuthContext); // Access the user from AuthContext


  const router = useRouter();

  useEffect(() => {
    const fetchCollections = async () => {
      if (!user) {
        console.log('No user found, skipping fetch');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`/api/getUserCollections?userEmail=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setCollections(data);
        } else {
          throw new Error('Failed to fetch collections');
        }
      } catch (error:any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, [user]); // Depend on the user state

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin inline-block w-24 h-24 border-4 border-t-transparent border-white rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  

  const toggleMenu = (id:any) => {
    setVisibleMenuId(visibleMenuId === id ? null : id);
  };

    // Function to open the delete confirmation modal
    const openDeleteConfirmation = (collectionId:any) => {
      setCollectionToDelete(collectionId);
      setDeleteConfirmationOpen(true);
    };
  
    // Function to close the delete confirmation modal
    const closeDeleteConfirmation = () => {
      setDeleteConfirmationOpen(false);
      setCollectionToDelete(null);
    };
  
    const deleteCollection = async () => {
      closeDeleteConfirmation();
      if (!collectionToDelete) return;
    
      try {
        const response = await fetch(`/api/deleteCollection?collectionId=${collectionToDelete}`, { method: 'DELETE' });
        if (response.ok) {
          // Successfully deleted the collection
          // Update your state or UI accordingly
          setCollections(collections.filter(collection => collection.id !== collectionToDelete));
          closeDeleteConfirmation();
        } else {
          console.error('Failed to delete collection');
          // Handle failure
        }
      } catch (error) {
        console.error('Error deleting collection:', error);
      }
    };

    const openEditModal = (collection:any) => {
      setCollectionToEdit(collection);
      setIsEditModalOpen(true);
    };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-20 gap-y-8">

      {collections.map((collection) => (
        <div key={collection.id} className="relative font-bold text-white text-2xl min-w-[20vw] aspect-square flex justify-center items-center bg-cards border border-divide rounded-lg shadow-md">
          <span className="material-icons text-3xl absolute top-0 left-0 m-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleMenu(collection.id); }}>more_vert</span>
          {visibleMenuId === collection.id && (
            <div className="absolute top-0 left-10 mt-2 flex flex-row cursor-pointer">
              <button className="mr-2 py-2 text-error text-decoration-line: underline text-sm" onClick={() => openDeleteConfirmation(collection.id)}>Delete</button>
              <button className="py-2 text-link text-decoration-line: underline text-sm" onClick={() => openEditModal(collection)}>Edit</button>
            </div>
          )}
            <div className="cursor-pointer" onClick={() => router.push(`/app/collections/${collection.id}`)}>{collection.title}</div>
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
      
<CollectionModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} setCollections={setCollections} isEditMode={true} collectionToEdit={collectionToEdit}/>
<CollectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setCollections={setCollections} />

{deleteConfirmationOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2>Delete collection?</h2>
            <p>This will delete all the problems inside as well</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={closeDeleteConfirmation} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded">
                Cancel
              </button>
              <button onClick={deleteCollection} className="bg-error text-white py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionCards;
