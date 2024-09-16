import { useRouter } from 'next/router';
import { AuthContext } from '@/auth/AuthContext';
import { useQuery } from 'react-query';
import React, { useContext } from 'react';
import "../../../app/globals.css"; 
import SideBar from '@/components/app/SideBar';
import nookies from "nookies"; 
import firebaseAdmin from "../../../../firebaseAdmin"; 
import ProblemTypeInfo from '@/components/app/ProblemTypeInfo';
import BarGraph from '@/components/app/BarGraph';
import Link from 'next/link';
import Carousel from '@/components/app/Carousel';
import Heatmap from '@/components/app/Heatmap';

const StudyProblemPage = () => {
  const router = useRouter(); 
  const { user } = useContext(AuthContext);

  const fetchAllProblems = async () => {
    if (!user) {
      throw new Error("No user found");
    }
    const response = await fetch(`/api/getAllProblemsFromUser?userEmail=${user.email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch all problems");
    }
    return response.json();
  };

  const fetchUserSettings = async () => {
    const response = await fetch(`/api/getUserSettings?userEmail=${user?.email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user settings");
    }
    return response.json();
  };

  const { isLoading: isLoading2, error: error2, data: userData } = useQuery(['userSettings', user?.email], fetchUserSettings, {
    enabled: !!user,
  });

  const { isLoading, error, data } = useQuery(['allProblems', user?.email], fetchAllProblems, {
    enabled: !!user,
  });


  const dueTodayCount = data ? data.filter((problem: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateLocal = new Date(problem.dueDate);
    return dueDateLocal < today || dueDateLocal.getDate() === today.getDate() && dueDateLocal.getMonth() === today.getMonth() && dueDateLocal.getFullYear() === today.getFullYear();
  }).length : 0;

  const goDueProblems = () => {
    router.push('/app/study/dueproblems');
  };

  console.log(userData?.contributionHistory)

  return (
    <div className="flex min-h-screen bg-base_100">
      <SideBar />
      <div className="flex-grow p-8">
        <div className="text-primary text-4xl font-bold mb-4 flex justify-center">Study</div>
        <hr className="border-divide mb-8 transition-width duration-300"/>
        <div className="mb-8 text-center text-secondary">
          To learn more about Study Mode, check out our comprehensive <Link className="text-blue underline" href="/guide">Guide</Link>
        </div>
        <div className="flex justify-center mb-4">
        <Carousel 
          components={[
            <BarGraph key="bar-graph" />,
            <ProblemTypeInfo key="problem-type-info" />,
            userData?.contributionHistory ? <Heatmap contributions={userData.contributionHistory[2024]} key="heatmap" /> : null,
          ]}
          headers={[
            "Workload this week",
            "All problems",
            "Streaks"
          ]}
        />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2 text-primary text-lg">
            <span className="material-icons text-primary mr-1">schedule</span> 
            <span>Due today: <span className="text-error">{dueTodayCount}</span></span>
          </div>
          {dueTodayCount > 0 ? (
            <button
              onClick={goDueProblems}
              className="mb-12 inline-flex justify-center items-center gap-x-3 text-center bg-[#15B9A7] text-primary text-lg font-medium rounded-full focus:ring-1 py-2 px-5 transition-transform duration-200 hover:scale-105"
            >
              Study Now <span className="material-icons text-primary">arrow_forward</span>
            </button>
          ) : (
            <p className="text-secondary">You do not have any problems due today, go relax and drink a sody pop!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context:any) {
  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    
    // Optionally fetch more data for your page using token.uid or other identifiers

    // If the token is valid, return empty props (or props based on token/user data)
    return {
      props: {},
    };
  } catch (err) {
    // If token verification fails or token doesn't exist, redirect to sign-in page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default StudyProblemPage;