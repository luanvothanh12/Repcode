import React, { useState, useEffect } from 'react';
import ProblemModal from './ProblemModal';
import Toast from './Toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from 'react-query';


const ProblemsList = ({ collectionId }: { collectionId: any }) => {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [visibleMenuId, setVisibleMenuId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [problemToEdit, setProblemToEdit] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();


    const fetchProblems = async () => {
      const response = await fetch(`/api/getCollectionProblems?collectionId=${collectionId}`);
      if (!response.ok) throw new Error('Failed to fetch problems');
      return response.json();
    };
  
    const { data: problems, isLoading, error } = useQuery(['collectionProblems', collectionId], fetchProblems, {
      enabled: !!collectionId,
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return 'text-easy';
            case 'medium':
                return 'text-medium';
            case 'hard':
                return 'text-hard';
            default:
                return 'text-white';
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
            queryClient.invalidateQueries(['collectionProblems', collectionId]);
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
        if (error) return <div>Error: {(error as Error).message}</div>;
    return (
        <>
            <ProblemModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} collectionId={collectionId} isEditMode={true} problemToEdit={problemToEdit} showToast={showToast} />
            <ProblemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} collectionId={collectionId} showToast={showToast} />
            <div className='max-w-md mx-auto'>
              
    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white dark:bg-base_100 overflow-hidden m-5 transition-width duration-300">
        <div className="grid place-items-center h-full w-12 text-feintwhite">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        <input
        type="text"
        placeholder="Search problems..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="peer h-full w-full outline-none text-sm text-neutral pr-2 bg-white dark:bg-base_100 dark:text-white transition-width duration-300"
        /> 
    </div>
</div>
            <ul className="max-w-full flex flex-col">
                {problems.filter((problem:any) => problem.name.toLowerCase().includes(searchTerm.toLowerCase())).map((problem:any) => (
                    <li key={problem.id} className="flex justify-between items-center py-3 px-4 text-sm font-medium bg-white hover:bg-feintwhite border border-feintwhite text-neutral -mt-px first:rounded-t-lg last:rounded-b-lg transition-colors duration-100 dark:bg-base_100 dark:hover:bg-hover dark:border-divide dark:text-white">
                        <div className="flex items-center gap-x-3.5">
                        <span className="material-icons text-xl hover:cursor-pointer" onClick={() => toggleMenu(problem.id)}>more_vert</span>
                            {visibleMenuId === problem.id && (
                            <div className="hs-dropdown-enter relative inline-flex">
                                <button className="cursor:pointer text-error text-decoration-line: underline mr-2" onClick={() => deleteProblem(problem.id)}>Delete</button>
                                <button className="cursor:pointer text-link text-decoration-line: underline mr-2" onClick={() => openEditModal(problem)}>Edit</button>
                            </div>
                            )}
                            <Link href={`/app/collections/${collectionId}/problems/${problem.id}`}>
                                {problem.name}
                            </Link>
                        </div>
                        <div className={`text-right ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty.toUpperCase()}
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-8">
  <button 
    onClick={() => setIsModalOpen(true)} 
    className="bg-pop2 dark:bg-pop text-white p-0 rounded-full h-12 w-12 flex items-center justify-center hover:scale-95 transition-transform duration-150 ease-in-out"
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
