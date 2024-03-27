import React, { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import { useQuery } from 'react-query';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


const BarGraph = () => {
    const { user } = useContext(AuthContext);

    const generateLabels = () => {
        const labels = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            // Clone today's date
            const date = new Date(today);
            // Add `i` days to the date
            date.setDate(date.getDate() + i);
            // Format the date as "Month/Day"
            const label = `${date.getMonth() + 1}/${date.getDate()}`;
            labels.push(label);
        }
        return labels;
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "#FFFFFF",
                    display: false, 
                },
                ticks: {
                    // Use a callback function to format the tick labels
                    callback: function(value:any) {
                        if (value % 1 === 0) { // Check if the value is a whole number
                            return value;
                        }
                    },
                    stepSize: 1, 
                    color: "#87cf3a", 
                }
            }, 
            x: {
                grid: {
                    display: false, 
                },
                ticks: {
                    color: "#87cf3a",
                },
            }, 
        }
    };
    
  
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

      const { isLoading, error, data } = useQuery(['allProblems', user?.email], fetchAllProblems, {
          enabled: !!user,
      });

      const processData = (problems: any) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
      
        let dueCounts = Array(7).fill(0); // Array to hold counts for the next 7 days  

        (problems || []).forEach((problem: any) => {
            console.log(problem.dueDate);
            // Ensure the dueDate is interpreted as UTC, then converted to local time
            const dueDate = new Date(problem.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            const diffTime = dueDate.getTime() - today.getTime();

            // If the problem is past due, treat it as due today
            let diffDays = diffTime < 0 ? 0 : Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
            if (diffDays >= 0 && diffDays < 7) {
                dueCounts[diffDays] += 1; // Increment the count for the respective day
            }
            });

      
        return dueCounts;
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
      } else if (error) {
          return <div>Error: {(error as Error).message}</div>
      } else {
        const dueCounts = processData(data); // Assuming `data` is the array of problems
        console.log(dueCounts)
        const chartData = {
            labels: generateLabels(),
            datasets: [
                {
                    label: 'Problems Due',
                    data: dueCounts, 
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        };

    return (
        <div className="flex flex-col items-center">
            <div style={{ height: '300px', width: '500px' }}>
            <Bar 
                data={chartData} 
                options={chartOptions}
            />
            </div>
        </div>
    );
    };

}

export default BarGraph; 
