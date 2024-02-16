import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig';

const CollectionModal = ({ isOpen, onClose, setCollections, isEditMode = false, collectionToEdit = null }: { isOpen: boolean, isEditMode?:any, collectionToEdit?:any, onClose: any, setCollections: any }) => {
  const [collectionName, setCollectionName] = useState(isEditMode && collectionToEdit ? collectionToEdit.title : '');

  useEffect(() => {
    if (isEditMode && collectionToEdit) {
      setCollectionName(collectionToEdit.title);
    } else {

      setCollectionName('');
    }
  }, [isEditMode, collectionToEdit]);

  const handleCreateCollection = async () => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }

    const url = isEditMode ? `/api/updateCollection?collectionId=${collectionToEdit.id}` : '/api/createCollection';
    const method = isEditMode ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: collectionName,
          userEmail: auth.currentUser.email,
        }),
      });
  
      if (response.ok) {
        const newOrUpdatedCollection = await response.json();
        if (isEditMode) {
          // Update the collection in the existing state
          setCollections((prevCollections:any) => {
            return prevCollections.map((collection:any) => 
              collection.id === collectionToEdit.id ? newOrUpdatedCollection : collection
            );
          });
        } else {
          // Add the new collection to the state
          setCollections((prevCollections:any) => [...prevCollections, newOrUpdatedCollection]);
        }
        onClose(); // Close modal after creation or update
      } else {
        console.error('Failed to create or update collection');
      }
    } catch (error) {
      console.error('Failed to submit collection:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`${isOpen ? '' : 'hidden'} fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-neutral">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-white">{isEditMode ? 'Edit Collection' : 'New Collection'}</h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <label htmlFor="collectionName" className="block text-sm font-medium text-white">Collection Name:</label>
              <input type="text" id="collectionName" name="collectionName" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <button type="button" onClick={handleCreateCollection} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isEditMode ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-error">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;