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

    useEffect(() => {
        const fetchProblems = async () => {
            const response = await fetch(`/api/getCollectionProblems?collectionId=${collectionId}`);
            if (response.ok) {
                const data = await response.json();
                setProblems(data);
            } else {
                console.error('Failed to fetch problems');
            }
        };

        if (collectionId) {
            fetchProblems();
        }
    }, [collectionId]);

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
                        <span className="material-icons text-xl" onClick={() => toggleMenu(problem.id)}>more_vert</span>
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
