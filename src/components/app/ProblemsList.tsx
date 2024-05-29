import React, { useState, useEffect, useContext } from 'react';
import ProblemModal from './ProblemModal';
import Toast from './Toast';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '@/auth/AuthContext';
import { useRouter } from "next/router";


const ProblemsList = ({ collectionId }: { collectionId: any }) => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [problemToEdit, setProblemToEdit] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const router = useRouter();


  // to get the user ID to verify that user can only access collections they have created 
  const fetchUserSettings = async () => {
    if (!user) throw new Error("No user found");
    const response = await fetch(`/api/getUserSettings?userEmail=${user.email}`);
    if (!response.ok) throw new Error("Failed to fetch user settings");
    return response.json();
  };

  const fetchProblems = async (collectionId: any, userId: any) => {
    if (!collectionId || !userId) return null;
    const response = await fetch(`/api/getCollectionProblems?collectionId=${collectionId}&userId=${userId}`);
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Access Denied');
      } else {
        throw new Error('Network response was not ok');
      }
    }
    return response.json();
  };
  
  const { 
    isLoading: isLoadingUser, 
    data: currentUser, 
    error: userError, 
  } = useQuery(['userSettings', user?.email], fetchUserSettings, {
    enabled: !!user, 
  })


  // data: problems simply renames 'data' to 'problems' for readability 
  const { data: problems, isLoading, error } = useQuery(
    ['collectionDetails', collectionId, currentUser?.id],
    () => fetchProblems(collectionId, currentUser.id),
    {
      enabled: !!collectionId && !!currentUser,
    }
  );
  const getDifficultyColor = (difficulty: string) => {
      switch (difficulty.toLowerCase()) {
          case 'easy':
              return 'text-easy bg-easybg px-4'; 
          case 'medium':
              return 'text-medium bg-mediumbg px-2';
          case 'hard':
              return 'text-hard bg-hardbg px-4';
          default:
              return 'text-white';
      }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
        case 'new':
            return 'text-new bg-newbg px-4'; 
        case 'learning':
            return 'text-warning bg-warningbg px-2'; 
        case 'relearning':
            return 'text-warning bg-warningbg px-2'; 
        case 'review':
            return 'text-success bg-successbg px-2'; 
        default:
            return 'text-neutral dark:text-white'; 
    }
};

  const toggleMenu = (id:any) => {
      setVisibleMenuId(visibleMenuId === id ? null : id);
    };

    const deleteProblemMutation = useMutation(
      async (problemId: any) => {
        const response = await fetch(`/api/deleteProblem?problemId=${problemId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Problem deletion failed');
        return response.json();
      },
      {
        onSuccess: () => {
          // Invalidate and refetch to update the list
          queryClient.invalidateQueries(['collectionProblems']);
          queryClient.invalidateQueries(['dueTodayProblems', user?.email]);
          queryClient.invalidateQueries(['allProblems', user?.email]);
          showToast(
            <>
              <span className="inline-block mr-2 bg-error rounded-full" style={{ width: '10px', height: '10px' }}></span>
              Problem deleted successfully
            </>
          );
        },
      }
    );
  
    const deleteProblem = (problemId: any) => {
      deleteProblemMutation.mutate(problemId);
    };

    const openEditModal = (problem:any) => {
      setProblemToEdit(problem);
      setIsEditModalOpen(true);
    };

    const showToast = (message: any) => {
      setToastMessage(message);
      setIsToastVisible(true);
      setTimeout(() => setIsToastVisible(false), 5000); 
    };

    const chooseRandomProblemFromCollection = async () => {
      try {
        const problems = await fetchProblems(collectionId, currentUser.id);
        const randomProblem = problems[Math.floor(Math.random() * problems?.length)];
        router.push(`/app/collections/${collectionId}/problems/${randomProblem.id}`);
      } catch (error) {
        console.error('Error fetching random problem from collection:', error);
      }
    };
    
    const chooseRandomProblemFromAll = async () => {
      try {
        const response = await fetch(`/api/getAllProblemsFromUser?userEmail=${user?.email}`);
        if (!response.ok) throw new Error('Failed to fetch all problems');
        const problems = await response.json();
        const randomProblem = problems[Math.floor(Math.random() * problems?.length)];
        router.push(`/app/collections/${randomProblem.collectionId}/problems/${randomProblem.id}`);
      } catch (error) {
        console.error('Error fetching random problem from all problems:', error);
      }
    };
    
    if (error) return <div>Error: {(error as Error).message}</div>;
    if (isLoading || isLoadingUser) {
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
        <ProblemModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} collectionId={collectionId} isEditMode={true} problemToEdit={problemToEdit} showToast={showToast} />
        <ProblemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} collectionId={collectionId} showToast={showToast} />
        <div className='max-w-md mx-auto'>  
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-base_100 overflow-hidden m-5 transition-width duration-300">
            <div className="grid place-items-center h-full w-12 text-feintwhite">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="peer h-full w-full outline-none text-sm text-white pr-2 bg-base_100 transition-width duration-300"
            /> 
          </div>
        </div>
        {problems?.length <= 0 && (
          <>
            <p className="text-center text-lg text-primary italic">No problems in this collection yet. Click the '+' to add one!</p>
          </>
        )}
        {problems?.length > 0 && (
          <>
            <button onClick={chooseRandomProblemFromCollection} title="random problem from collection">
              <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-feintwhite mr-2" style={{ fontSize: '30px' }}>refresh</span>
            </button>
            <button onClick={chooseRandomProblemFromAll} title="random problem from all collections">
              <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-feintwhite" style={{ fontSize: '30px' }}>sync</span>
            </button>
          </>
        )}
        <ul className="max-w-full flex flex-col">
          {problems?.filter((problem:any) => problem.name.toLowerCase().includes(searchTerm.toLowerCase())).map((problem:any) => (
            <li key={problem.id} className="flex justify-between items-center py-3 px-4 text-sm font-medium bg-base_100 hover:bg-hover border border-divide text-white -mt-px first:rounded-t-lg last:rounded-b-lg transition-colors duration-100 cursor-pointer" onClick={() => router.push(`/app/collections/${collectionId}/problems/${problem.id}`)}>
              <div className="flex items-center gap-x-3.5">
                <span 
                  className="material-icons text-xl hover:cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(problem.id);
                  }}
                >
                  more_vert
                </span>
                {visibleMenuId === problem.id && (
                  <div className="hs-dropdown-enter relative inline-flex">
                    <button 
                      className="cursor:pointer text-error text-decoration-line: underline mr-2" 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProblem(problem.id);
                      }}
                    >
                      Delete
                    </button>
  
                    <button 
                      className="cursor:pointer text-link text-decoration-line: underline mr-2" 
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(problem);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
                <span>{problem.name}</span>
              </div>
              <div className="text-right">
                <span className={`${getDifficultyColor(problem.difficulty)} rounded-full py-1`}>
                  {problem.difficulty}
                </span> 
                <span className="text-divide"> / </span> 
                <span className={`${getTypeColor(problem.type)} rounded-full py-1`}>
                  {problem.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => { setIsModalOpen(true); setProblemToEdit(null); }}
            className="bg-pop text-white p-0 rounded-full h-12 w-12 flex items-center justify-center hover:scale-95 transition-transform duration-150 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
            </svg>
          </button>
        </div>
        <Toast message={toastMessage} isVisible={isToastVisible} />
      </>
    );
};

export default ProblemsList;
