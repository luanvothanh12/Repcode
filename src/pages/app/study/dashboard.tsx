import { useRouter } from 'next/router';
import { AuthContext } from '@/auth/AuthContext';
import { useQuery } from 'react-query';
import React, { useContext, useState } from 'react';
import "../../../app/globals.css"; 
import SideBar from '@/components/app/SideBar';
import nookies from "nookies"; 
import firebaseAdmin from "../../../../firebaseAdmin"; 
import ProblemTypeInfo from '@/components/app/ProblemTypeInfo';
import BarGraphWeek from '@/components/app/BarGraphWeek';
import BarGraphMonth from '@/components/app/BarGraphMonth';
import Link from 'next/link';
import Heatmap from '@/components/app/Heatmap';
import Badge from '@/components/ui/Badge';

// Import Lucide icons
import {
  PlayIcon,
  CalendarIcon,
  ClockIcon,
  TrendingUpIcon,
  FlameIcon,
  BarChart3Icon,
  CheckCircleIcon,
  TriangleAlertIcon, 
  ChevronRightIcon,
  SparklesIcon,
  BookOpenIcon,
  CircleIcon,
} from "lucide-react";

const StudyProblemPage = () => {
  const router = useRouter(); 
  const { user } = useContext(AuthContext);
  const [timeRange, setTimeRange] = useState<"daily" | "monthly">("daily");

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

  const dueTodayProblems = data ? data.filter((problem: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateLocal = new Date(problem.dueDate);
    return dueDateLocal < today || dueDateLocal.getDate() === today.getDate() && dueDateLocal.getMonth() === today.getMonth() && dueDateLocal.getFullYear() === today.getFullYear();
  }) : [];

  const dueTodayCount = dueTodayProblems.length;

  const goDueProblems = () => {
    router.push('/app/study/dueproblems');
  };

  // Calculate some basic stats for the stats cards
  const totalProblems = data ? data.length : 0;

  // Add this function to calculate the current streak
  const calculateCurrentStreak = (contributionHistory: any) => {
    if (!contributionHistory) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const currentYear = today.getFullYear();
    const dayOfYear = Math.floor((today.getTime() - new Date(currentYear, 0, 0).getTime()) / (24 * 60 * 60 * 1000));
    
    let streak = 0;
    let currentDay = dayOfYear;
    let currentYearToCheck = currentYear;
    
    // Check if there's activity today
    const hasTodayActivity = contributionHistory[currentYear]?.[dayOfYear] > 0;
    
    // If no activity today, start checking from yesterday
    if (!hasTodayActivity) {
      currentDay = dayOfYear - 1;
    }
    
    // Count consecutive days with activity
    while (true) {
      // If we've gone before the start of the year, move to previous year
      if (currentDay < 0) {
        currentYearToCheck--;
        // If we don't have data for the previous year, break
        if (!contributionHistory[currentYearToCheck]) break;
        
        // Set to the last day of the previous year (365 or 366 for leap years)
        const daysInPrevYear = new Date(currentYearToCheck, 11, 31).getDate() === 29 ? 366 : 365;
        currentDay = daysInPrevYear - 1; // 0-indexed
      }
      
      // Check if there was activity on this day
      const hasActivity = contributionHistory[currentYearToCheck]?.[currentDay] > 0;
      
      if (hasActivity) {
        streak++;
        currentDay--;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const streak = userData?.contributionHistory ? 
    calculateCurrentStreak(userData.contributionHistory) : 0;

  const calculateEstimatedStudyTime = (problems: any[]) => {
    if (!problems || problems.length === 0) return "0 min";
    
    let totalMinutes = 0;
    
    problems.forEach(problem => {
      const difficulty = problem.difficulty.toLowerCase();
      const type = problem.type.toLowerCase();
      
      if (difficulty === 'easy') {
        if (type === 'review') totalMinutes += 5;
        else if (type === 'learning' || type === 'relearning') totalMinutes += 10;
        else if (type === 'new') totalMinutes += 15;
      } 
      else if (difficulty === 'medium') {
        if (type === 'review') totalMinutes += 10;
        else if (type === 'learning' || type === 'relearning') totalMinutes += 20;
        else if (type === 'new') totalMinutes += 30;
      }
      else if (difficulty === 'hard') {
        if (type === 'review') totalMinutes += 25;
        else if (type === 'learning' || type === 'relearning') totalMinutes += 35;
        else if (type === 'new') totalMinutes += 50;
      }
    });
    
    // Format the time
    if (totalMinutes < 60) {
      return `${totalMinutes} min`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };

  const estimatedStudyTime = calculateEstimatedStudyTime(dueTodayProblems);

  return (
    <div className="flex min-h-screen bg-base_100">
      <SideBar />
      <div className="flex-1 ml-0 transition-all duration-300">
        <div className="p-6 md:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2">
                Study Dashboard
              </h1>
              <p className="text-secondary text-lg">
                Track your progress and study efficiently
              </p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-tertiary rounded-xl p-5 border border-divide shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-secondary text-sm font-medium">
                    Current Streak
                  </h3>
                  <div className="bg-hardbg p-2 rounded-md">
                    <FlameIcon size={18} className="text-hard" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-primary">
                    {streak}
                  </span>
                  <span className="ml-1 text-secondary">days</span>
                </div>
              </div>
              
              <div className="bg-tertiary rounded-xl p-5 border border-divide shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-secondary text-sm font-medium">
                    Total Problems
                  </h3>
                  <div className="bg-[#6366f1]/10 p-2 rounded-md">
                    <BarChart3Icon size={18} className="text-[#818cf8]" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-primary">
                    {totalProblems}
                  </span>
                  <span className="ml-1 text-secondary">tracked</span>
                </div>
              </div>
              
              <div className="bg-tertiary rounded-xl p-5 border border-divide shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-secondary text-sm font-medium">
                    Due Today
                  </h3>
                  <div className="bg-warningbg p-2 rounded-md">
                    <TriangleAlertIcon size={18} className="text-learning" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-primary">
                    {dueTodayCount}
                  </span>
                  <span className="ml-1 text-secondary">problems</span>
                </div>
              </div>
              
              <div className="bg-tertiary rounded-xl p-5 border border-divide shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-secondary text-sm font-medium">
                    Est. Study Time
                  </h3>
                  <div className="bg-[#06b6d4]/10 p-2 rounded-md">
                    <ClockIcon size={18} className="text-[#22d3ee]" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-primary">
                    {estimatedStudyTime}
                  </span>
                  <span className="ml-1 text-secondary">today</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Charts Section - 2/3 width on large screens */}
              <div className="lg:col-span-2">
                {/* Due Problems Chart */}
                <div className="bg-tertiary rounded-xl border border-divide shadow-lg overflow-hidden">
                  <div className="p-5 border-b border-divide">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-primary">
                        Due Problems
                      </h2>
                      <div className="flex bg-base_100 rounded-lg p-1">
                        <button
                          className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === "daily" ? "bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-primary" : "text-secondary hover:text-primary"}`}
                          onClick={() => setTimeRange("daily")}
                        >
                          7 Days
                        </button>
                        <button
                          className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === "monthly" ? "bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-primary" : "text-secondary hover:text-primary"}`}
                          onClick={() => setTimeRange("monthly")}
                        >
                          Monthly
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    {timeRange === "daily" ? <BarGraphWeek /> : <BarGraphMonth />}
                  </div>
                </div>

                {/* Study Activity / Heatmap */}
                <div className="bg-tertiary rounded-xl border border-divide shadow-lg mt-6 overflow-hidden">
                  <div className="p-5 border-b border-divide">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-primary">
                        Study Activity
                      </h2>
                      <div className="text-secondary text-sm flex items-center">
                        <CalendarIcon size={14} className="mr-1" />
                        past year
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    {userData?.contributionHistory && <Heatmap contributions={userData.contributionHistory} currentYear={new Date().getFullYear()} />}
                  </div>
                </div>
              </div>

              {/* Due Today Section - 1/3 width on large screens */}
              <div className="lg:col-span-1">
                <div className="bg-tertiary rounded-xl border border-divide shadow-lg overflow-hidden">
                  <div className="p-5 border-b border-divide">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-primary">
                        Due Today
                      </h2>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-base_100 text-[#B0B7C3]">
                        {dueTodayCount} problems
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    {dueTodayCount > 0 ? (
                      <button
                        onClick={goDueProblems}
                        className="w-full bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] hover:from-[#0891b2] hover:to-[#2563eb] text-primary py-3 px-4 rounded-lg font-medium flex items-center justify-center mb-4 transition-all duration-200 shadow-lg shadow-[#3b82f6]/20 hover:shadow-[#3b82f6]/30"
                      >
                        <PlayIcon className="w-5 h-5 mr-2" />
                        Start Studying
                      </button>
                    ) : (
                      <div className="text-center p-4 text-secondary">
                        You don't have any problems due today. Enjoy your day!
                      </div>
                    )}
                    
                    {dueTodayCount > 0 && (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {dueTodayProblems.map((problem: any) => (
                          <div
                            key={problem.id}
                            className="bg-base_100 rounded-lg p-4 border border-divide"
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-primary mb-2 truncate max-w-[80%]" title={problem.name}>
                                {problem.name.length > 30 ? `${problem.name.substring(0, 30)}...` : problem.name}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge type="difficulty" value={problem.difficulty} />
                              <Badge type="problemType" value={problem.type} />
                            </div>
                            <div className="flex items-center text-xs text-secondary">
                              <ClockIcon size={12} className="mr-1" />
                              Due: Today
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
