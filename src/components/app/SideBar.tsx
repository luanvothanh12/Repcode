import React, { useState, useEffect } from 'react';
import { auth } from '../../firebaseConfig'; 
import { signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import Link from 'next/link';
import "../../app/globals.css"; 
import useDarkMode from '../../../useDarkMode';
import { useQuery, useMutation, useQueryClient } from 'react-query'; 

const SideBar = () => {
  const [colorTheme, setTheme] = useDarkMode() as any; 
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [masterCollectionsDropdownOpen, setMasterCollectionsDropdownOpen] = useState(false);
  const [collections, setCollections] = useState<{id: any; title: any; isLoading: boolean; problems:any}[]>([]);
  const [expandedCollectionId, setExpandedCollectionId] = useState(null); // Track expanded collection
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   // Listen for authentication state changes
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       // Proceed to fetch collections if the user is authenticated
  //       const fetchCollections = async () => {
  //         try {
  //           const response = await fetch(`/api/getUserCollections?userEmail=${user.email}`);
  //           if (!response.ok) {
  //             throw new Error('Failed to fetch collections');
  //           }
  //           const data = await response.json();
  //           const collectionsWithProblems = data.map((collection:any) => ({
  //             ...collection,
  //             problems: [],
  //             isLoading: false,
  //           }));
  //           setCollections(collectionsWithProblems);
  //         } catch (error) {
  //           console.error('Failed to fetch collections', error);
  //         }
  //       };
  //       fetchCollections();
  //     } else {
  //       // Handle user not signed in or other actions as necessary
  //       console.log('User not signed in');
  //       // Optionally clear collections
  //       setCollections([]);
  //     }
  //   });
  
  //   // Cleanup subscription on component unmount
  //   return () => unsubscribe();
  // }, []);

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
  

  const goHome = () => {
    router.push('/app/main');
  }

  const goStudy = () => {
    router.push('/app/study/dashboard');
  }

  const goSettings = () => {
    router.push('/app/settings/UserSettings');
  }


  const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      // Redirect to login page or root after logging out
      queryClient.clear();
      router.push('/'); 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className={`h-100vh bg-white border-r border-feintwhite dark:border-divide flex-shrink-0 transition-width duration-300 dark:bg-base_100 ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Toggle button and logo */}
      <button onClick={() => { setIsExpanded(!isExpanded); setMasterCollectionsDropdownOpen(false); }} className="m-2 p-1 text-neutral rounded dark:text-white">
        <div className="flex items-center">
        <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-neutral dark:text-white" style={{ fontSize: '46px' }}>open_in_full</span>
        </div>
      </button>
  
      {/* Sidebar content */}
      <div className="px-4 py-2 flex flex-col items-start">
        <hr className="my-2 w-full text-feintwhite dark:text-divide transition-width duration-300" />
        <div className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-feintwhite dark:hover:bg-hover' : ''} transition-colors duration-100 cursor-pointer rounded`} onClick={goHome}>
          <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-neutral dark:text-white" style={{ fontSize: '35px' }}>style</span>
          {isExpanded && <span className={`ml-2 text-neutral dark:text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Collections</span>}
        </div>
  
        {/* Master Collections Dropdown */}
        {/* <div className="w-full">
          <div onClick={toggleMasterCollectionsDropdown} className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-feintwhite dark:hover:bg-hover' : ''} transition-colors duration-100 cursor-pointer rounded justify-between width-full`}>
            <div className="flex items-center">
              <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-neutral dark:text-white" style={{ fontSize: '35px' }}>style</span>
              {isExpanded && <span className={`ml-2 text-neutral dark:text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Collections</span>}
            </div>
            {isExpanded && (
              <span className="material-icons transition duration-300 ease-in-out text-neutral dark:text-white" style={{ fontSize: '24px' }}>
                {masterCollectionsDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            )}
          </div>
          <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${masterCollectionsDropdownOpen ? 'max-h-96' : 'max-h-0'}`}>
          {collections.map((collection) => (
  <div key={collection.id} className="pl-4 flex flex-col w-full">
    <div className="flex items-center my-2 hover:bg-feintwhite dark:hover:bg-hover transition-colors duration-100 cursor-pointer rounded justify-between" onClick={() => fetchProblemsForCollection(collection.id)}>
      <div className="flex items-center">
        <span className="material-icons transition duration-300 ease-in-out text-neutral dark:text-white" style={{ fontSize: '30px' }}>folder_open</span>
        {isExpanded && <span className="ml-2 text-neutral dark:text-white">{collection.title}</span>}
        {collection.isLoading && <span>Loading...</span>}
      </div>
      {isExpanded && (
        <span className="material-icons transition duration-300 ease-in-out text-neutral dark:text-white" style={{ fontSize: '24px' }}>
          {expandedCollectionId === collection.id ? 'expand_less' : 'expand_more'}
        </span>
      )}
    </div>
    <div className={`transition-max-height duration-700 ease-in-out overflow-hidden ${expandedCollectionId ? 'max-h-96' : 'max-h-0'}`}>
    {expandedCollectionId === collection.id && (
      <div className="pl-4">
        {collection.problems.length > 0 ? (
          collection.problems.map((problem: any) => (
            <div key={problem.id} className="text-neutral dark:text-white my-1 hover:bg-feintwhite dark:hover:bg-hover cursor:pointer rounded">
              <Link href={`/app/collections/${collection.id}/problems/${problem.id}`}>
              <span className={`material-icons transition duration-300 ease-in-out ${problem.difficulty === 'Easy' ? 'text-easy' : problem.difficulty === 'Medium' ? 'text-medium' : 'text-hard'}`} style={{ fontSize: '20px' }}>description</span>
                {problem.name}
              </Link>
            </div>
          ))
        ) : (
          <div className="text-neutral dark:text-white my-1">No problems found.</div>
        )}
      </div>
    )}
    </div>
  </div>
))}
          </div>
        </div>
   */}
        <div className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-feintwhite dark:hover:bg-hover' : ''} transition-colors duration-100 cursor-pointer rounded`} onClick={goStudy}>
          <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-neutral dark:text-white" style={{ fontSize: '35px' }}>local_library</span>
          {isExpanded && <span className={`ml-2 text-neutral dark:text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Study</span>}
        </div>
        <div className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-feintwhite dark:hover:bg-hover' : ''} transition-colors duration-100 cursor-pointer rounded`} onClick={goSettings}>
          <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-neutral dark:text-white" style={{ fontSize: '35px' }}>settings</span>
          {isExpanded && <span className={`ml-2 text-neutral dark:text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Settings</span>}
        </div>
        <div onClick={logOut} className={`flex items-center my-2 w-full ${isExpanded ? 'hover:bg-feintwhite dark:hover:bg-hover' : ''} transition-colors duration-100 cursor-pointer rounded`}>
          <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-error" style={{ fontSize: '35px' }}>person</span>
          {isExpanded && <span className={`ml-2 text-neutral dark:text-white ${isExpanded ? 'hs-dropdown-enter' : ''}`}>Logout</span>}
        </div>
        <div className={`flex items-center my-2 w-full`}>
  {colorTheme === "light" ? (
    <svg
      onClick={() => setTheme("light")}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-warning hover:cursor-pointer transition duration-300 ease-in-out hover:scale-110"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{ width: '35px', height: '35px', marginRight: '8px' }} // Adjust size and margin to match Material icons
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ) : (
    <svg
      onClick={() => setTheme("dark")}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-new hover:cursor-pointer transition duration-300 ease-in-out hover:scale-110"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{ width: '35px', height: '35px', marginRight: '8px' }} // Adjust size and margin to match Material icons
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )}
</div>

      </div>
    </div>
  );
  
  
};

export default SideBar;