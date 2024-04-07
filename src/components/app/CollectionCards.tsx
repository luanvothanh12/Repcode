import React, { useState, useEffect, useContext } from "react";
import CollectionModal from "./CollectionModal";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/router";
import { AuthContext } from "@/auth/AuthContext";
import Link from 'next/link'; // Import Link from Next.js
import Toast from "./Toast";
import { useQuery, useMutation, useQueryClient } from 'react-query'; 


const CollectionCards = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleMenuId, setVisibleMenuId] = useState(null); // Added state to manage visibility of dropdown
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [collectionToDelete, setCollectionToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [collectionToEdit, setCollectionToEdit] = useState(null);
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
  const openDeleteConfirmation = (collectionId: any) => {
    setCollectionToDelete(collectionId);
    setDeleteConfirmationOpen(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setCollectionToDelete(null);
  };

  const deleteCollectionMutation = useMutation(
    async (collectionId: any) => {
      setDeleteConfirmationOpen(false);
      const response = await fetch(`/api/deleteCollection?collectionId=${collectionId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Problem deletion failed');
      return response.json();
    },
    {
      onSuccess: () => {
        // Invalidate and refetch to update the list
        queryClient.invalidateQueries(['collections', user?.email]);
        queryClient.invalidateQueries(['allProblems', user?.email]);
        showToast(
          <>
            <span className="inline-block mr-2 bg-error rounded-full" style={{ width: '10px', height: '10px' }}></span>
            Collection deleted successfully
          </>
        );
      },
    }
  );

  const deleteCollection = () => {
    deleteCollectionMutation.mutate(collectionToDelete);
  };

  const openEditModal = (collection: any) => {
    setCollectionToEdit(collection);
    setIsEditModalOpen(true);
  };

  const showToast = (message: any) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000); // Hide after 3 seconds
  };
  if (error) return <div>Error: {(error as Error).message}</div>;
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-white animate-spin dark:text-base_100 fill-load"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-20 gap-y-8">
        {collections.map((collection:any) => (
          <div
            key={collection.id}
            className="relative font-bold text-white text-2xl min-w-[20vw] aspect-square flex justify-center items-center bg-cards rounded-lg shadow-md transition duration-200 ease-in-out hover:scale-105 cursor-pointer" 
            onClick={() => router.push(`/app/collections/${collection.id}`)}
          >
            <img src={`/${collection.image}`} alt="Collection" className="absolute top-0 left-0 w-full h-3/4 object-cover" />
            <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black to-transparent flex justify-center items-end h-1/4">
                <div className="text-lg font-bold text-center">{collection.title}</div>
            </div>
            <span
              className="material-icons text-3xl text-white absolute top-0 left-0 m-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(collection.id);
              }}
            >
              more_vert
            </span>
            {visibleMenuId === collection.id && (
            <div className={`absolute top-0 left-10 mt-2 ml-2 flex flex-row cursor-pointer bg-neutral px-2 ${visibleMenuId === collection.id ? 'hs-dropdown-enter' : ''}`}>
                <button
                  className="mr-2 py-2 text-error text-decoration-line: underline text-sm"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    openDeleteConfirmation(collection.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="py-2 text-link text-decoration-line: underline text-sm"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    openEditModal(collection);
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          className="flex justify-center items-center bg-pop2 dark:bg-pop rounded-full h-20 w-20 shadow-md cursor-pointer m-auto transition duration-300 ease-in-out hover:scale-95"
          onClick={() => setIsModalOpen(true)}
        >
          {/* SVG for Plus Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v12m6-6H6"
            />
          </svg>
        </button>
      </div>

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

      {deleteConfirmationOpen && (
        <div className="fixed inset-0 bg-base_100 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white dark:bg-base_100 p-4 rounded-lg shadow-lg text-neutral dark:text-white">
            <h2>Delete collection?</h2>
            <p>This will delete all the problems inside as well</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeDeleteConfirmation}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteCollection}
                className="inline-flex justify-center items-center gap-x-3 text-center bg-error border border-error text-neutral text-lg font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-1 px-4 dark:focus:ring-offset-gray-800 transition-transform duration-200 hover:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
          <Toast message={toastMessage} isVisible={isToastVisible} />
    </>
  );
};

export default CollectionCards;

