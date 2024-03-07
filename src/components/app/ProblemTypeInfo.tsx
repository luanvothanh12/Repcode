import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/auth/AuthContext';

const ProblemTypeInfo = () => {
    const router = useRouter(); 
  
    const [isLoading, setIsLoading] = useState(true);
    const [problemCounts, setProblemCounts] = useState({ New: 0, Learning: 0, Relearning: 0, Review: 0 });
    const [dueTodayCount, setDueTodayCount] = useState(0);
    const { user } = useContext(AuthContext);
    
  
    useEffect(() => {
      const fetchAllProblems = async () => {
        if (!user) {
          console.log("No user found, skipping fetch");
          return;
        }
        setIsLoading(true); 
        try {
          const response = await fetch(
            `/api/getAllProblemsFromUser?userEmail=${user.email}`
          );
          if (response.ok) {
            const data = await response.json();
            // Count the problems by type
            const counts = data.reduce((acc:any, problem:any) => {
              const type = problem.type; 
              acc[type] = (acc[type] || 0) + 1;
              return acc;
            }, { New: 0, Learning: 0, Relearning: 0, Review: 0 });
            setProblemCounts(counts);
  
          // Logic to find problems due today
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normalize today's date
          const dueToday = data.filter((problem: any) => {
            const dueDateLocal = new Date(problem.dueDate); // This is automatically in local time due to JavaScript
            return dueDateLocal < today || dueDateLocal.getDate() === today.getDate() && dueDateLocal.getMonth() === today.getMonth() && dueDateLocal.getFullYear() === today.getFullYear();
          });
          setDueTodayCount(dueToday.length);
          } else {
            throw new Error("Failed to fetch all problems");
          }
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchAllProblems();
    }, [user]);
  
    const goDueProblems = () => {
      router.push('/app/study/dueproblems');
    }
    
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

    return (
        <div className="flex flex-col items-center">
        <div className="text-neutral dark:text-white text-lg mb-4 text-center">
            <p>New: <span className="text-new">{problemCounts.New}</span></p>
            <p>Learning: <span className="text-learning">{problemCounts.Learning + (problemCounts.Relearning || 0)}</span></p>
            <p className="mb-5">Review: <span className="text-review">{problemCounts.Review}</span></p>
            <p>Due today: <span className="text-error">{dueTodayCount}</span></p> 
        </div>
        {dueTodayCount > 0 ? (
            <button onClick={goDueProblems} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
            Study Now
            </button>
        ) : (
            <p className="text:neutral dark:text-primary">You do not have any problems due today, go relax and drink a sody pop!</p>
        )}
        </div>
    );
};

export default ProblemTypeInfo;
