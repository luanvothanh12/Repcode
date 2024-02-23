import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig'; 
import { signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import Link from 'next/link';
import "../../app/globals.css"; 

const SideBar = () => {
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [masterCollectionsDropdownOpen, setMasterCollectionsDropdownOpen] = useState(false);
  const [collections, setCollections] = useState<{id: any; title: any; isLoading: boolean; problems:any}[]>([]);
  const [expandedCollectionId, setExpandedCollectionId] = useState(null); // Track expanded collection
  


  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // Proceed to fetch collections if the user is authenticated
        const fetchCollections = async () => {
          try {
            const response = await fetch(`/api/getUserCollections?userEmail=${user.email}`);
            if (!response.ok) {
              throw new Error('Failed to fetch collections');
            }
            const data = await response.json();
            const collectionsWithProblems = data.map((collection:any) => ({
              ...collection,
              problems: [],
              isLoading: false,
            }));
            setCollections(collectionsWithProblems);
          } catch (error) {
            console.error('Failed to fetch collections', error);
          }
        };
        fetchCollections();
      } else {
        // Handle user not signed in or other actions as necessary
        console.log('User not signed in');
        // Optionally clear collections
        setCollections([]);
      }
    });
  
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const fetchProblemsForCollection = async (collectionId:any) => {
    // Find collection index
    const collectionIndex = collections.findIndex(c => c.id === collectionId);
    if (collectionIndex === -1) return;

    // Set loading state for the collection
    let updatedCollections = [...collections];
    updatedCollections[collectionIndex].isLoading = true;
    setCollections(updatedCollections);

    const response = await fetch(`/api/getCollectionProblems?collectionId=${collectionId}`);
    if (response.ok) {
      const problems = await response.json();
      updatedCollections = updatedCollections.map(collection =>
        collection.id === collectionId ? { ...collection, problems, isLoading: false } : collection
      );
      setCollections(updatedCollections);
      // Expand or collapse collection view
      setExpandedCollectionId(expandedCollectionId === collectionId ? null : collectionId);
    } else {
      console.error('Failed to fetch problems');
      updatedCollections[collectionIndex].isLoading = false;
      setCollections(updatedCollections);
    }
  };

  const toggleMasterCollectionsDropdown = () => {
    setMasterCollectionsDropdownOpen(!masterCollectionsDropdownOpen);
    // Automatically expand the sidebar if the dropdown is being opened
    if (!masterCollectionsDropdownOpen) {
      setIsExpanded(true);
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    // Automatically close the master collections dropdown if the sidebar is being collapsed
    if (isExpanded) {
      setMasterCollectionsDropdownOpen(false);
    }
  };
  
  

  const goHome = () => {
    router.push('/app/main');
  }

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      // Redirect to login page or root after logging out
      router.push('/'); 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className={`h-100vh bg-base_100 border-r border-divide flex-shrink-0 transition-width duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Toggle button and logo */}
      <button onClick={() => { setIsExpanded(!isExpanded); setMasterCollectionsDropdownOpen(false); }} className="m-2 p-1 text-neutral rounded">
        <div className="flex items-center">
        <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-white" style={{ fontSize: '46px' }}>open_in_full</span>
        </div>
      </button>
  
      {/* Sidebar content */}
      <div className="px-4 py-2 flex flex-col items-start">
        <hr className="my-2 w-full text-divide" />
        <div className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-hover dark:hover:bg-gray-800' : ''} transition-colors duration-100 cursor-pointer rounded`} onClick={goHome}>
          <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-white" style={{ fontSize: '35px' }}>home</span>
          {isExpanded && <span className={`ml-2 text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Dashboard</span>}
        </div>
  
        {/* Master Collections Dropdown */}
        <div className="w-full">
          <div onClick={toggleMasterCollectionsDropdown} className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-hover dark:hover:bg-gray-800' : ''} transition-colors duration-100 cursor-pointer rounded justify-between width-full`}>
            <div className="flex items-center">
              <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-white" style={{ fontSize: '35px' }}>style</span>
              {isExpanded && <span className={`ml-2 text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Collections</span>}
            </div>
            {isExpanded && (
              <span className="material-icons transition duration-300 ease-in-out text-white" style={{ fontSize: '24px' }}>
                {masterCollectionsDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            )}
          </div>
          <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${masterCollectionsDropdownOpen ? 'max-h-96' : 'max-h-0'}`}>
          {collections.map((collection) => (
  <div key={collection.id} className="pl-4 flex flex-col w-full">
    <div className="flex items-center my-2 hover:bg-hover dark:hover:bg-gray-800 transition-colors duration-100 cursor-pointer rounded justify-between" onClick={() => fetchProblemsForCollection(collection.id)}>
      <div className="flex items-center">
        <span className="material-icons transition duration-300 ease-in-out text-white" style={{ fontSize: '30px' }}>folder_open</span>
        {isExpanded && <span className="ml-2 text-white">{collection.title}</span>}
        {collection.isLoading && <span>Loading...</span>}
      </div>
      {isExpanded && (
        <span className="material-icons transition duration-300 ease-in-out text-white" style={{ fontSize: '24px' }}>
          {expandedCollectionId === collection.id ? 'expand_less' : 'expand_more'}
        </span>
      )}
    </div>
    <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${expandedCollectionId ? 'max-h-96' : 'max-h-0'}`}>
    {expandedCollectionId === collection.id && (
      <div className="pl-4">
        {collection.problems.length > 0 ? (
          collection.problems.map((problem: any) => (
            <div key={problem.id} className="text-white my-1 hover:bg-hover cursor:pointer rounded">
              <Link href={`/app/collections/${collection.id}/problems/${problem.id}`}>
              <span className={`material-icons transition duration-300 ease-in-out ${problem.difficulty === 'EASY' ? 'text-easy' : problem.difficulty === 'MEDIUM' ? 'text-medium' : 'text-hard'}`} style={{ fontSize: '20px' }}>description</span>
                {problem.name}
              </Link>
            </div>
          ))
        ) : (
          <div className="text-white my-1">No problems found.</div>
        )}
      </div>
    )}
    </div>
  </div>
))}
          </div>
        </div>
  
        <div className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-hover dark:hover:bg-gray-800' : ''} transition-colors duration-100 cursor-pointer rounded`}>
          <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-white" style={{ fontSize: '35px' }}>query_stats</span>
          {isExpanded && <span className={`ml-2 text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Statistics</span>}
        </div>
        <div onClick={logOut} className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-hover dark:hover:bg-gray-800' : ''} transition-colors duration-100 cursor-pointer rounded`}>
          <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-error" style={{ fontSize: '35px' }}>person</span>
          {isExpanded && <span className={`ml-2 text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Logout</span>}
        </div>
      </div>
    </div>
  );
  
  
};

export default SideBar;