import React, { useState, useEffect } from 'react';
import ProblemModal from './ProblemModal';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProblemsList = ({ collectionId }: { collectionId: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [problems, setProblems] = useState([]);
    const router = useRouter();

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
                return 'text-success';
            case 'medium':
                return 'text-warning';
            case 'hard':
                return 'text-error';
            default:
                return 'text-white';
        }
    };


    return (
        <>
            <ProblemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} collectionId={collectionId} setProblems={setProblems} />
            <ul className="max-w-full flex flex-col">
                {problems.map((problem: any) => (
                    <li key={problem.id} className="flex justify-between items-center py-3 px-4 text-sm font-medium bg-base_100 border border-divide text-white -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-slate-900 dark:border-gray-700 dark:text-white hover:bg-hover dark:hover:bg-gray-800 transition-colors duration-100">
                        <div className="flex items-center gap-x-3.5">
                            <span className="material-icons text-xl">more_vert</span>
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
