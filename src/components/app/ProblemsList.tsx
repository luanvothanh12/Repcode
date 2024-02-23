import React, { useState, useEffect } from 'react';
import ProblemModal from './ProblemModal';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProblemsList = ({ collectionId }: { collectionId: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [problems, setProblems] = useState<{id: any}[]>([]);
    const [visibleMenuId, setVisibleMenuId] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [problemToEdit, setProblemToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchProblems = async () => {
          setIsLoading(true); // Ensure loading state is true at the start of data fetching
          try {
              const response = await fetch(`/api/getCollectionProblems?collectionId=${collectionId}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch problems');
              }
              const data = await response.json();
              setProblems(data);
          } catch (error:any) {
              console.error(error.message);
          } finally {
              setIsLoading(false); // Set loading state to false after fetching is complete or fails
          }
      };
  
      if (collectionId) {
          fetchProblems();
      }
  }, [collectionId]);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-white animate-spin dark:text-gray-600 fill-load"
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

      const deleteProblem = async (problemId:any) => {
        const response = await fetch(`/api/deleteProblem?problemId=${problemId}`, { method: 'DELETE' });
        if (response.ok) {
          // Remove the problem from your state to update the UI
          // Assuming you have a state called `problems` that holds the list
          setProblems(problems.filter(problem => problem.id !== problemId));
        }
      };

      const openEditModal = (problem:any) => {
        setProblemToEdit(problem);
        setIsEditModalOpen(true);
      };

    return (
        <>
            <ProblemModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} collectionId={collectionId} setProblems={setProblems} isEditMode={true} problemToEdit={problemToEdit} />
            <ProblemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} collectionId={collectionId} setProblems={setProblems} />
            <ul className="max-w-full flex flex-col">
                {problems.map((problem: any) => (
                    <li key={problem.id} className="flex justify-between items-center py-3 px-4 text-sm font-medium bg-base_100 border border-divide text-white -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white hover:bg-hover dark:hover:bg-gray-800 transition-colors duration-100">
                        <div className="flex items-center gap-x-3.5">
                        <span className="material-icons text-xl hover:cursor-pointer" onClick={() => toggleMenu(problem.id)}>more_vert</span>
                            {visibleMenuId === problem.id && (
                            <div className="hs-dropdown relative inline-flex">
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
    className="bg-pop hover:bg-orange-700 text-white p-0 rounded-full h-12 w-12 flex items-center justify-center hover:scale-95 transition-transform duration-150 ease-in-out"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
    </svg>
  </button>
</div>
        </>
    );
};

export default ProblemsList;
