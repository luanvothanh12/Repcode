import React, { useState, useEffect } from 'react';
import ProblemModal from './ProblemModal';
import { useRouter } from 'next/router'; 
import Link from 'next/link';


const ProblemsList = ({ collectionId }: {collectionId:any}) => {
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


    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Problem
            </button>
            <ProblemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} collectionId={collectionId} setProblems={setProblems} />
            <div>
                {problems.map((problem:any) => (
                    <div key={problem.id} style={{cursor: 'pointer'}}>
                        <Link href={`/app/collections/${collectionId}/problems/${problem.id}`}>
                            {problem.name} - {problem.difficulty}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProblemsList; 