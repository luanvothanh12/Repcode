import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig'; 
import { signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import Link from 'next/link';

const SideBar = () => {
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [masterCollectionsDropdownOpen, setMasterCollectionsDropdownOpen] = useState(false);
  const [collections, setCollections] = useState<{id: any; title: any; isLoading: boolean; problems:any}[]>([]);
  const [expandedCollectionId, setExpandedCollectionId] = useState(null); // Track expanded collection
  


  useEffect(() => {
    const fetchCollections = async () => {
      if (auth.currentUser) {
        const response = await fetch(`/api/getUserCollections?userEmail=${auth.currentUser.email}`);
        if (response.ok) {
          const data = await response.json();
          // Initialize collections with problems property
          const collectionsWithProblems = data.map((collection: any) => ({
            ...collection,
            problems: [],
            isLoading: false, // Track loading state for problems
          }));
          setCollections(collectionsWithProblems);
        } else {
          console.error('Failed to fetch collections');
        }
      }
    };

    fetchCollections();
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
    // Optionally, reset the expandedCollectionId state if you want all collections to be collapsed when toggling the master dropdown
    setExpandedCollectionId(null);
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
      <button onClick={() => setIsExpanded(!isExpanded)} className="m-2 p-1 text-neutral rounded">
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          {isExpanded && <span className="ml-2">Brand</span>}
        </div>
      </button>
  
      {/* Sidebar content */}
      <div className="px-4 py-2 flex flex-col items-start"> {/* Changed from items-center to items-start */}
        <hr className="my-2 w-full text-divide" />
        <div className="flex items-center my-2 w-full"> {/* Ensure full width for alignment */}
            <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-white" onClick={goHome} style={{ fontSize: '50px' }}>home</span>
            {isExpanded && <span className="ml-2 text-white">Dashboard</span>}
        </div>
  
        {/* Master Collections Dropdown */}
        <div className="w-full">
          <div onClick={toggleMasterCollectionsDropdown} className="flex items-center my-2 hover:bg-hover dark:hover:bg-gray-800 transition-colors duration-100 cursor-pointer">
            <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-white" style={{ fontSize: '50px' }}>style</span>
            {isExpanded && <span className="ml-2 text-white">Collections</span>}
          </div>
          {masterCollectionsDropdownOpen && (
            collections.map((collection) => (
              <div key={collection.id} className="pl-4 flex flex-col w-full"> {/* Ensure full width for alignment */}
                <div
                  className="flex items-center my-2 hover:bg-hover dark:hover:bg-gray-800 transition-colors duration-100 cursor-pointer"
                  onClick={() => fetchProblemsForCollection(collection.id)}
                >
                  <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-white" style={{ fontSize: '20px' }}>folder_open</span>
                  {isExpanded && <span className="ml-2 text-white">{collection.title}</span>}
                  {collection.isLoading && <span>Loading...</span>}
                </div>
                {expandedCollectionId === collection.id && (
                  <div className="pl-4">
                    {collection.problems.length > 0 ? (
                      collection.problems.map((problem: any) => (
                        <div key={problem.id} className="text-white my-1">
                             <Link href={`/app/collections/${collection.id}/problems/${problem.id}`}>
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
            ))
          )}
         <div className="flex items-center my-2 w-full"> {/* Ensure full width for alignment */}
            <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-white" style={{ fontSize: '55px' }}>bar_chart</span>
            {isExpanded && <span className="ml-2 text-white">Stats</span>}
        </div>
        <div className="flex items-center my-2 w-full"> {/* Ensure full width for alignment */}
            <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-error" onClick={logOut} style={{ fontSize: '50px' }}>person</span>
            {isExpanded && <span className="ml-2 text-white">Log Out</span>}
        </div>
        </div>
      </div>
    </div>
  );
  
};

export default SideBar;
