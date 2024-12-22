import React, { useState, useEffect, useContext } from "react";
import CollectionModal from "./CollectionModal";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { AuthContext } from "@/auth/AuthContext";
import Toast from "./Toast";
import { useQuery, useMutation, useQueryClient } from 'react-query'; 
import { formatDistanceToNow } from 'date-fns'; 

const CollectionCards = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleMenuId, setVisibleMenuId] = useState(null); // Added state to manage visibility of dropdown
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState<any>(null);
  const [deletingCollections, setDeletingCollections] = useState<Set<number>>(new Set()); // Track deleting collections, so that users cant click inside collection they just deleted 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [collectionToEdit, setCollectionToEdit] = useState<any>(null);
  const { user } = useContext(AuthContext); 
  const queryClient = useQueryClient();

  const router = useRouter();

  const fetchCollections = async () => {
    if (!user) return null; 
    const response = await fetch(`/api/getUserCollections?userEmail=${user.email}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };


  const { isLoading, data: collections = [], error } = useQuery(['collections', user?.email], fetchCollections, {
    enabled: !!user?.email,
  })

  const toggleMenu = (id: any) => {
    setVisibleMenuId(visibleMenuId === id ? null : id);
  };

  // Function to open the delete confirmation modal
  const openDeleteConfirmation = (collection: any) => {
    setCollectionToDelete(collection);
    setDeleteConfirmationOpen(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setCollectionToDelete(null);
  };

  const [isDeletingCollection, setIsDeletingCollection] = useState(false);

  const deleteCollectionMutation = useMutation(
    async (collectionId: any) => {
      setIsDeletingCollection(true);
      const token = await auth.currentUser?.getIdToken();
  
      if (!token) {
        throw new Error('Authentication token is not available.');
      }
  
      const response = await fetch(`/api/deleteCollection?collectionId=${collectionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error('Problem deletion failed');
      return response.json();
    },
    {
      onSuccess: () => {
        setDeleteConfirmationOpen(false);
        
        queryClient.invalidateQueries(['collections', user?.email]);
        queryClient.invalidateQueries(['allProblems', user?.email]);
        queryClient.invalidateQueries(['userSettings', user?.email]);
        showToast(
          <>
            <span className="inline-block mr-2 bg-error rounded-full" style={{ width: '10px', height: '10px' }}></span>
            Collection deleted successfully
          </>
        );
      },
      onSettled: () => {
        setIsDeletingCollection(false);
      }
    }
  );

  const deleteCollection = () => {
    if (collectionToDelete) {
      setDeletingCollections((prev) => new Set(prev).add(collectionToDelete.id));
      deleteCollectionMutation.mutate(collectionToDelete.id);
    }
  }

  const openEditModal = (collection: any) => {
    setCollectionToEdit(collection);
    setIsEditModalOpen(true);
    setVisibleMenuId(null);
  };

  const showToast = (message: any) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000); // Hide after 3 seconds
  };

  
  const totalCollections = collections.length;
  const totalProblems = collections.reduce((acc: number, collection: any) => {
    return acc + collection.newCount + collection.learningCount + collection.reviewCount;
  }, 0);


  console.log(user?.getIdToken())
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-base_100 animate-spin dark:text-base_100 fill-load"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-left mb-4">
        <div className="text-secondary text-lg">Total collections: <span className="text-primary">{totalCollections}</span></div>
        <div className="text-secondary text-lg">Total problems: <span className="text-primary">{totalProblems}</span></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-8">
        {collections.map((collection: any) => (
          
          <div
            key={collection.id}
            className="border border-[#2a2a2d] relative text-secondary text-2xl min-w-[20vw] aspect-square flex flex-col justify-center items-center bg-[#1e1e20] rounded-lg shadow-md transition duration-300 ease-in-out hover:border-feintwhite hover:text-pop cursor-pointer"
            onClick={() => {
              if (!deletingCollections.has(collection.id)) {
                router.push(`/app/collections/${collection.id}`);
              }
            }}
          >
            {/* 3 Dots Menu (Top Left) */}
            <span
              className="material-icons text-3xl text-primary absolute top-0 left-0 m-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(collection.id);
              }}
            >
              more_vert
            </span>
            
            {visibleMenuId === collection.id && (
              <div className={`absolute top-8 left-2 mt-2 flex flex-col bg-[#2a2a2d] rounded-lg p-2 shadow-lg z-10`}>
                <button
                  className="text-error py-1 px-2 text-left text-sm hover:bg-[#38383d] rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteConfirmation(collection);
                    setVisibleMenuId(null);
                  }}
                >
                  Delete
                </button>
                <button
                  className="text-link py-1 px-2 text-left text-sm hover:bg-[#38383d] rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(collection);
                    setVisibleMenuId(null);
                  }}
                >
                  Edit
                </button>
              </div>
            )}
  
            {/* Collection Name */}
            <div className="text-center text-primary text-2xl font-bold">{collection.title}</div>
            {/* Last Added Info */}
            <div className="text-secondary text-sm mt-2">
              Last added to: {collection.lastAdded ? formatDistanceToNow(new Date(collection.lastAdded), { addSuffix: true }) : 'N/A'}
            </div>
  
            {/* Progress Info */}
            <div className="flex justify-between items-center w-full px-4 mt-4">
              <span className="text-secondary text-sm">Problem Types</span>
            </div>
  
            {/* Multi-colored Progress Bar */}
            <div className="w-full px-4 mt-2">
              <div className="flex w-full h-2 bg-feintwhite rounded-full">
                <div className="h-full bg-new rounded-full" style={{ width: `${(collection.newCount / (collection.newCount + collection.learningCount + collection.reviewCount)) * 100}%` }}></div>
                <div className="h-full bg-learning rounded-full" style={{ width: `${(collection.learningCount / (collection.newCount + collection.learningCount + collection.reviewCount)) * 100}%` }}></div>
                <div className="h-full bg-review rounded-full" style={{ width: `${(collection.reviewCount / (collection.newCount + collection.learningCount + collection.reviewCount)) * 100}%` }}></div>
              </div>
            </div>
  
            {/* Bottom Text */}
            <div className="absolute bottom-4 text-center w-full text-secondary text-sm">
            <span className="inline-block bg-new mr-1 rounded-full" style={{ width: '10px', height: '10px' }}></span><span className="mr-4">{collection.newCount}</span> 
            <span className="inline-block bg-learning rounded-full" style={{ width: '10px', height: '10px' }}></span> <span className="mr-4">{collection.learningCount}</span>
            <span className="inline-block bg-review rounded-full" style={{ width: '10px', height: '10px' }}></span> <span className="mr-2">{collection.reviewCount}</span>
            </div>
          </div>
        ))}
  
        {/* Add New Collection Button */}
        <div
          className="border border-[#2a2a2d] relative text-secondary text-2xl min-w-[20vw] aspect-square flex flex-col justify-center items-center bg-[#1e1e20] rounded-lg shadow-md transition duration-300 ease-in-out hover:border-feintwhite hover:text-pop cursor-pointer"
          onClick={() => {
            setIsModalOpen(true);
            setVisibleMenuId(null);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
          </svg>
        </div>
      </div>
  
      {/* Modal Components */}
      <CollectionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        isEditMode={true}
        collectionToEdit={collectionToEdit}
        showToast={showToast}
      />
      <CollectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showToast={showToast}
      />
  
      {/* Delete Confirmation */}
      {deleteConfirmationOpen && (
        <div className="fixed inset-0 bg-base_100 bg-opacity-50 flex items-center justify-center">
          <div className="relative w-96 bg-[#1E1E20] rounded-lg shadow-lg p-5 modalBounceFadeIn">
            <button onClick={closeDeleteConfirmation} className="absolute top-3 right-3 text-secondary hover:text-primary transition duration-150 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-primary">Delete collection?</h3>
              <div className="mt-4">
                <p className="text-secondary text-sm">This will delete all the problems inside as well.</p>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeDeleteConfirmation}
                  className="bg-transparent hover:border-feintwhite border border-divide text-primary py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteCollection}
                  disabled={isDeletingCollection}
                  className={`
                    flex items-center gap-2 py-2 px-6 rounded-md transition ease-in-out duration-150
                    ${isDeletingCollection 
                      ? 'bg-disabled text-disabledText cursor-not-allowed' 
                      : 'bg-error text-white'}
                  `}
                >
                  {isDeletingCollection ? (
                    <>
                      <span className="material-icons animate-spin text-xl">sync</span>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Toast Notifications */}
      <Toast message={toastMessage} isVisible={isToastVisible} />
    </>
  );
  
};

export default CollectionCards;

