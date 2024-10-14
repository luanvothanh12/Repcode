import React, { useState, useContext } from 'react';
import ProblemModal from './ProblemModal';
import Toast from './Toast';
import { auth } from '../../firebaseConfig';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '@/auth/AuthContext';
import { useRouter } from 'next/router';
import ProblemStatsModal from './ProblemStatsModal';
import DonutChart from './DonutChart';

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
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [problemToViewStats, setProblemToViewStats] = useState(null);

  const fetchUserSettings = async () => {
    if (!user) throw new Error('No user found');
    const response = await fetch(`/api/getUserSettings?userEmail=${user.email}`);
    if (!response.ok) throw new Error('Failed to fetch user settings');
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

  const { isLoading: isLoadingUser, data: currentUser, error: userError } = useQuery(
    ['userSettings', user?.email],
    fetchUserSettings,
    { enabled: !!user }
  );

  const { data: problems, isLoading, error } = useQuery(
    ['collectionDetails', collectionId, currentUser?.id],
    () => fetchProblems(collectionId, currentUser.id),
    { enabled: !!collectionId && !!currentUser }
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
        return 'text-secondary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'new':
        return 'text-new bg-newbg px-4';
      case 'learning':
        return 'text-learning bg-warningbg px-2';
      case 'relearning':
        return 'text-learning bg-warningbg px-2';
      case 'review':
        return 'text-review bg-successbg px-2';
      default:
        return 'text-neutral dark:text-secondary';
    }
  };

  const toggleMenu = (id: any) => {
    setVisibleMenuId(visibleMenuId === id ? null : id);
  };

  const getProblemCounts = (problems: any[]) => {
    const difficultyCounts: { [key: string]: number } = { Easy: 0, Medium: 0, Hard: 0 };
    const typeCounts: { [key: string]: number } = { New: 0, Learning: 0, Relearning: 0, Review: 0 };

    problems.forEach(problem => {
      difficultyCounts[problem.difficulty] += 1;
      typeCounts[problem.type] += 1;
    });

    return { difficultyCounts, typeCounts };
  };

  const { difficultyCounts, typeCounts } = getProblemCounts(problems || []);

  const deleteProblemMutation = useMutation(
    async (problemId: any) => {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error('Authentication token is not available.');
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`/api/deleteProblem?problemId=${problemId}`, {
        method: 'DELETE',
        headers: headers,
      });
      if (!response.ok) throw new Error('Problem deletion failed');
      return response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['collectionDetails']);
        queryClient.invalidateQueries(['dueTodayProblems', user?.email]);
        queryClient.invalidateQueries(['allProblems', user?.email]);
        queryClient.invalidateQueries(['userSettings', user?.email]);
        queryClient.invalidateQueries(['collectionProblems', collectionId]);
        showToast(
          <>
            <span
              className='inline-block mr-2 bg-error rounded-full'
              style={{ width: '10px', height: '10px' }}
            ></span>
            Problem deleted successfully
          </>
        );
      },
    }
  );

  const deleteProblem = (problemId: any, collectionId: any) => {
    deleteProblemMutation.mutate(problemId, {
      onSuccess: async () => {
        try {
          const updateResponse = await fetch('/api/updateCollectionCounts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ collectionId: collectionId }),
          });
          if (!updateResponse.ok) throw new Error('Failed to update collection counts');
        } catch (error) {
          console.error('Failed to update collection counts:', error);
        }
        queryClient.invalidateQueries(['collections', user?.email]);
      },
    });
  };

  const openEditModal = (problem: any) => {
    setProblemToEdit(problem);
    setIsEditModalOpen(true);
  };

  const openStatsModal = (problem: any) => {
    setProblemToViewStats(problem);
    setIsStatsModalOpen(true);
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
      <div className='flex justify-center items-center h-screen'>
        <div role='status'>
          <svg
            aria-hidden='true'
            className='w-12 h-12 text-base_100 animate-spin dark:text-base_100 fill-load'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProblemModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        collectionId={collectionId}
        isEditMode={true}
        problemToEdit={problemToEdit}
        showToast={showToast}
      />
      <ProblemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collectionId={collectionId}
        showToast={showToast}
      />
      <ProblemStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        problem={problemToViewStats}
      />

      <div className='flex'>
        <div className='flex-1'>
          <div className='flex justify-start mb-4'>
            <div className='relative flex items-center w-full max-w-sm h-12 rounded-lg focus-within:shadow-lg bg-tertiary overflow-hidden transition-width duration-300 border border-tertiary'>
              <div className='grid place-items-center h-full w-12 text-feintwhite'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <input
                type='text'
                placeholder='Search problems...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='peer h-full w-full outline-none text-sm text-secondary pr-2 bg-tertiary transition-width duration-300'
              />
            </div> 
          </div>
          <table className='table-auto w-full text-left'>
            <thead>
              <tr className='text-secondary border-b border-divide'>
                <th className='w-10 py-4'></th>
                <th className='py-4'>Problem</th>
                <th className='text-right py-4'>Difficulty</th>
                <th className='text-right py-4'>Type</th>
              </tr>
            </thead>
            <tbody>
              {problems
                ?.filter((problem: any) =>
                  problem.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((problem: any, index: number) => (
                  <tr
                    key={problem.id}
                    className={`cursor-pointer relative bg-base_100 hover:bg-hover2 text-secondary transition-colors duration-100 border-b border-divide`}
                    onClick={() =>
                      router.push(
                        `/app/collections/${collectionId}/problems/${problem.id}`
                      )
                    }
                  >
                    <td className='py-4'>
                      <div className='flex items-center relative'>
                        <button
                          className='text-primary hover:text-pop'
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(problem.id);
                          }}
                        >
                          <span className='material-icons text-lg'>more_vert</span>
                        </button>
                        {visibleMenuId === problem.id && (
                          <div className='absolute top-full left-0 mt-2 w-32 bg-tertiary shadow-lg rounded-md z-10'>
                            <button
                              className='block w-full text-left px-4 py-2 text-error hover:bg-hover2'
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProblem(problem.id, collectionId);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className='block w-full text-left px-4 py-2 text-link hover:bg-hover2'
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(problem);
                                setVisibleMenuId(null);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className='block w-full text-left px-4 py-2 text-primary hover:bg-hover2 flex items-center gap-1'
                              onClick={(e) => {
                                e.stopPropagation();
                                openStatsModal(problem);
                                setVisibleMenuId(null);
                              }}
                            >
                              Stats
                              <span
                                className='material-icons text-primary'
                                style={{ fontSize: '22px' }}
                              >
                                bar_chart_4_bars
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className='py-4'>{problem.name}</td>
                    <td className='text-right'>
                      <span
                        className={`${getDifficultyColor(
                          problem.difficulty
                        )} rounded-full px-2 py-1`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className='text-right'>
                      <span
                        className={`${getTypeColor(
                          problem.type
                        )} rounded-full px-2 py-1`}
                      >
                        {problem.type}
                      </span>
                    </td>
                  </tr>
                ))}
              <tr
                className='cursor-pointer bg-base_100 hover:bg-hover2 text-secondary transition-colors duration-100'
                onClick={() => {
                  setIsModalOpen(true);
                  setProblemToEdit(null);
                }}
              >
                <td colSpan={4} className='text-center py-4'>
                  <span
                    className='material-icons text-primary'
                    style={{ fontSize: '35px' }}
                  >
                    add_circle
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex flex-col space-y-4 ml-8 mt-20'>
          <div className='text-center mb-12'>
            <h3 className='text-lg font-bold text-secondary mb-8'>Difficulties</h3>
            <DonutChart
              labels={['Easy', 'Medium', 'Hard']}
              data={[
                difficultyCounts.Easy,
                difficultyCounts.Medium,
                difficultyCounts.Hard,
              ]}
              backgroundColors={['#4CAF50', '#FFC107', '#F44336']}
            />
          </div>
          <div className='text-center'>
            <h3 className='text-lg font-bold text-secondary mb-8'>Types</h3>
            <DonutChart
              labels={['New', 'Learning', 'Review']}
              data={[
                typeCounts.New,
                typeCounts.Learning + typeCounts.Relearning, 
                typeCounts.Review,
              ]}
              backgroundColors={['#2196F3', '#FF9800', '#8BC34A']}
            />
          </div>
        </div>
      </div>

      <Toast message={toastMessage} isVisible={isToastVisible} />
    </>
  );
};

export default ProblemsList;