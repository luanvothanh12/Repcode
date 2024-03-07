import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import "../../../app/globals.css"; 
import SideBar from '@/components/app/SideBar';
import nookies from "nookies"; 
import firebaseAdmin from "../../../../firebaseAdmin"; 
import Problem from '@/components/app/Problem';
import { AuthContext } from '@/auth/AuthContext';

const DueProblems = () => {
  const router = useRouter(); 
  const { collectionId, problemId } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [dueTodayProblems, setDueTodayProblems] = useState<any[]>([]);
  const [inQueue, setInQueue] = useState<any>(); 
  const { user } = useContext(AuthContext);
  const [contentActive, setContentActive] = useState('question');
  const [editorContent, setEditorContent] = useState('');
  const [buttons, setButtons] = useState<any[]>([]);
  const [userSettings, setUserSettings] = useState<any>({});


  const fetchAndProcessProblems = async () => {
    if (!user) {
      console.log("No user found, skipping fetch");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/getAllProblemsFromUser?userEmail=${user.email}`);
      if (response.ok) {
        const data = await response.json();
  
        // Logic to find problems due today
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today's date
        const dueToday = data.filter((problem: any) => {
          const dueDate = new Date(problem.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        });
        const dueTodaySorted = dueToday.sort((a:any, b:any) => {
          const dueDateA = new Date(a.dueDate).getTime();
          const dueDateB = new Date(b.dueDate).getTime();
          return dueDateA - dueDateB;
        });
  
        setDueTodayProblems(dueTodaySorted);
        setInQueue(dueToday.length > 0 ? dueToday[0] : null);
        // Set buttons based on the type of the first problem
        if (dueToday.length > 0) {
          const firstProblemType = dueToday[0].type;
          const buttonsBasedOnType = firstProblemType === 'New' || firstProblemType === 'Learning'
            ? [
                { label: 'Again', value: 'again' },
                { label: 'Good', value: 'good' },
                { label: 'Easy', value: 'easy' },
              ]
            : [
                { label: 'Again', value: 'again' },
                { label: 'Hard', value: 'hard' },
                { label: 'Good', value: 'good' },
                { label: 'Easy', value: 'easy' },
              ];
          setButtons(buttonsBasedOnType);
        }
      } else {
        throw new Error("Failed to fetch all problems");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserSettings = async () => {
    if (!user) {
      console.log("No user found, skipping fetch");
      return;
    }
    try {
      const response = await fetch(`/api/getUserSettings?userEmail=${user.email}`);
      if (response.ok) {
        const data = await response.json();
        setUserSettings(data);
      } else {
        throw new Error("Failed to fetch user info");
      }
    } catch (error: any) {
      console.error("Failed to fetch user info:", error.message);
    }
  };

  const updateProblemInDatabase = async (problemId:any, updates:any) => {
    try {
      const response = await fetch('/api/updateProblemForAlgo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: problemId, updates }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update problem');
      }
  
      const updatedProblem = await response.json();
      return updatedProblem;
    } catch (error) {
      console.error('Error updating problem:', error);
    }
  };

  useEffect(() => {
    fetchAndProcessProblems();
    fetchUserSettings(); 
  }, []);

  // handles the repeated logic of updating the problem's due date, updating the problem in the database, and handling the resultant changes in the array of problems
  async function Helper(inQueue:any) {
    // Update dueDate for inQueue problem
    const newDueDate = new Date(inQueue.dueDate);
    const additionalTime = inQueue.interval * 60000; // convert minutes to milliseconds
    newDueDate.setTime(newDueDate.getTime() + additionalTime);
    inQueue.dueDate = newDueDate; 

    const updates = {
      type: inQueue.type,
      interval: inQueue.interval,
      relearnInterval: inQueue.relearnInterval,
      ease: inQueue.ease,
      dueDate: inQueue.dueDate,
    };
    const updatedProblem = await updateProblemInDatabase(inQueue.id, updates);
    if (updatedProblem) {
      // Remove the current problem from the array
      let updatedProblems = dueTodayProblems.filter(p => p.id !== inQueue.id);

      // Check if the updated problem is still due today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const updatedDueDate = new Date(updatedProblem.dueDate);
      updatedDueDate.setHours(0, 0, 0, 0);

      if (updatedDueDate.getTime() === today.getTime()) {
        // Find a random position that is not the next immediate position
        let randomIndex = Math.floor(Math.random() * updatedProblems.length);
        updatedProblems.splice(randomIndex, 0, updatedProblem);
      }

      // Update the state to reflect changes
      setDueTodayProblems(updatedProblems);

      // Move to the next problem in the array
      const nextIndex = (updatedProblems.findIndex(p => p.id === inQueue.id) + 1) % updatedProblems.length;
      setInQueue(updatedProblems[nextIndex]);
    }
  }

  const Algorithm = async(buttonValue:any) => {
    setIsLoading(true)
    console.log(`Button clicked: ${buttonValue}`); 

    if(inQueue.type === "New") {
        if(buttonValue === "again") { // update type to learning, set interval to interval of first learning step, update due date 
            inQueue.type = "Learning"; 

            // Parse learningSteps and convert to minutes
            const stepsArray = userSettings.learnSteps.split(' ').map((step:string) => {
              const value = parseInt(step.slice(0, -1));
              const unit = step.slice(-1);
              return unit === 'm' ? value : value * 24 * 60; 
          });

          inQueue.interval = stepsArray[0]; 

          await Helper(inQueue); 
    
        }
        else if(buttonValue === "good") { // update type to learning, set the interval 2nd step's (since this card is new, it's on the first step by default) interval OR graduating interval, update due date
          inQueue.type = "Learning"; 

            const stepsArray = userSettings.learnSteps.split(' ').map((step:string) => {
            const value = parseInt(step.slice(0, -1));
            const unit = step.slice(-1);
            return unit === 'm' ? value : value * 24 * 60; 
          });

          let nextInterval;
          if (stepsArray.length >= 2) {
            // Set to the second step
            nextInterval = stepsArray[1];
          } else {
            // No second step, use the graduating interval
            // graduatingInterval is in days and needs to be converted to minutes
            nextInterval = userSettings.graduatingInterval * 24 * 60;
            inQueue.type = "Review"; 
          }
          inQueue.interval = nextInterval;

          await Helper(inQueue);
        }

        else if (buttonValue === "easy") { // update type to review, change interval to easyinterval, update due date 
          inQueue.type = "Review"; 

          // Set the interval to the easyInterval value 
          inQueue.interval = userSettings.easyInterval * 24 * 60; 

          const newDueDate = new Date(inQueue.dueDate);
          const additionalTime = inQueue.interval * 60000; 
          newDueDate.setTime(newDueDate.getTime() + additionalTime);
          inQueue.dueDate = newDueDate; 

          await Helper(inQueue); 
        }
    }
    else if(inQueue.type === "Learning") {
        if(buttonValue === "again") { // set interval to first learning step, update due date
          const stepsArray = userSettings.learnSteps.split(' ').map((step:string) => {
            const value = parseInt(step.slice(0, -1));
            const unit = step.slice(-1);
            return unit === 'm' ? value : value * 24 * 60; 
          });
          inQueue.interval = stepsArray[0]; 

          await Helper(inQueue);
        }
        else if(buttonValue === "good") { // set interval to the next learning step (can NOT have duplictates, ex 10m 10m 1d learning step will not work properly) OR to the graduatingInterval, update due date
          const stepsArray = userSettings.learnSteps.split(' ').map((step:string) => {
            const value = parseInt(step.slice(0, -1));
            const unit = step.slice(-1);
            return unit === 'm' ? value : value * 24 * 60; 
          });
          // Find the index of the current interval in stepsArray
          const currentIndex = stepsArray.findIndex((step: any) => step === inQueue.interval);

          // Determine the next interval
          let nextInterval;
          if (currentIndex >= 0 && currentIndex < stepsArray.length - 1) {
            // If there is a next step, use it
            nextInterval = stepsArray[currentIndex + 1];
          } else {
            // If the current interval is the last one, or not found, use the graduating interval
            // graduatingInterval is in days and needs to be converted to minutes
            nextInterval = userSettings.graduatingInterval * 24 * 60;
            inQueue.type = "Review";
          }

          inQueue.interval = nextInterval;

          await Helper(inQueue);
        }
        else if (buttonValue === "easy") { // update type to review, set interval to easyInterval, update due date
          inQueue.type = "Review"; 

          // Set the interval to the easyInterval value 
          inQueue.interval = userSettings.easyInterval * 24 * 60; 

          await Helper(inQueue);
        }
    }
    else if (inQueue.type === "Relearning") {
        if(buttonValue === "again") { // set interval to 1st step in relearningSteps array, update due date
          const relearnStepsArray = userSettings.relearnSteps.split(' ').map((step:string) => {
            const value = parseInt(step.slice(0, -1));
            const unit = step.slice(-1);
            return unit === 'm' ? value : value * 24 * 60; 
          });

          inQueue.interval = relearnStepsArray[0]; 

          await Helper(inQueue);
        }
        else if(buttonValue === "good") { // set interval to the next relearning step (can NOT have duplictates) OR to relearnInterval * relearnGraduatingInterval, update due date
          const relearnStepsArray = userSettings.relearnSteps.split(' ').map((step:string) => {
            const value = parseInt(step.slice(0, -1));
            const unit = step.slice(-1);
            return unit === 'm' ? value : value * 24 * 60; 
          });
          // Find the index of the current interval in stepsArray
          const currentIndex = relearnStepsArray.findIndex((step: any) => step === inQueue.interval);

          // Determine the next interval
          let nextInterval;
          if (currentIndex >= 0 && currentIndex < relearnStepsArray.length - 1) {
            // If there is a next step, use it
            nextInterval = relearnStepsArray[currentIndex + 1];
          } else {
            // If the current interval is the last one, or not found, use the relearnGraduating interval (which is a percent)
            nextInterval = inQueue.relearnInterval * userSettings.relearnGraduatingInterval
            inQueue.relearnInterval = 0; 
            inQueue.type = "Review";
          }

          inQueue.interval = nextInterval;

          await Helper(inQueue);
        }
        else if (buttonValue === "easy") { // skip all the relearn steps and set interval immediately to relearnInterval * relearnGraduatingInterval, set type to reveiw, update due date
          inQueue.interval = inQueue.relearnInterval * userSettings.relearnGraduatingInterval; 
          inQueue.relearnInterval = 0; 
          inQueue.type = "Review"; 

          await Helper(inQueue);
        }
    }
    else if (inQueue.type === "Review") {
        if(buttonValue === "again") { // set problem type to Relearning, decrease ease by 20% (0.2), set relearnInterval to current interval, set interval to 1st step of relearnSteps array, update due date 
          inQueue.type = "Relearning";
          inQueue.ease = (inQueue.ease - 0.20 >= userSettings.minimumEase) ? inQueue.ease - 0.20 : userSettings.minimumEase;

          inQueue.relearnInterval = inQueue.interval;
          const relearnStepsArray = userSettings.relearnSteps.split(' ').map((step:string) => {
            const value = parseInt(step.slice(0, -1));
            const unit = step.slice(-1);
            return unit === 'm' ? value : value * 24 * 60; 
          });

          inQueue.interval = relearnStepsArray[0]; 

          await Helper(inQueue);

        }
        else if(buttonValue === "hard") { // decrease the problem's ease by 15%, set interval to 1.2*current interval*interval modifier, update due date
            inQueue.ease = (inQueue.ease - 0.15 >= userSettings.minimumEase) ? inQueue.ease - 0.15 : userSettings.minimumEase;

            // Calculate next interval via equation 
            inQueue.interval = inQueue.interval * 1.2 * userSettings.intervalModifier;
            const fuzz = (Math.random() * (0.05 - 0.02) + 0.02).toFixed(2); 
            inQueue.interval *= (1 + parseFloat(fuzz));

            await Helper(inQueue);
        }
        else if(buttonValue === "good") { // set the interval according to equation (ease remains unchanged), update due date
          inQueue.interval = inQueue.interval * inQueue.ease * userSettings.intervalModifier;
          const fuzz = (Math.random() * (0.05 - 0.02) + 0.02).toFixed(2); 
          inQueue.interval *= (1 + parseFloat(fuzz));

          await Helper(inQueue);
        }
        else if (buttonValue === "easy") { // set the interval according to the equation, increase the ease by 15%, update due date
          inQueue.interval = inQueue.interval * inQueue.ease * userSettings.easyBonus * userSettings.intervalModifier;
          const fuzz = (Math.random() * (0.05 - 0.02) + 0.02).toFixed(2); 
          inQueue.interval *= (1 + parseFloat(fuzz));

          inQueue.ease = inQueue.ease + 0.15; 

          await Helper(inQueue);
        }
    }
    fetchAndProcessProblems(); 
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


  return (
    <>
        <div className="flex min-h-screen h-auto max-h-screen overflow-hidden bg-white dark:bg-base_100 transition-width duration-300">
            <SideBar />
            <div className="flex-grow p-8">
                <div className="text-neutral dark:text-white text-4xl font-bold mb-4 flex justify-center">Study Mode</div>
                <hr className="border-feintwhite dark:border-divide mb-8 transition-width duration-300"/>
                <div>
                <Problem
                    problem={inQueue}
                    contentActive={contentActive}
                    setContentActive={setContentActive}
                    editorContent={editorContent}
                    setEditorContent={setEditorContent}
                    buttons={buttons}
                    onButtonClick={Algorithm}
                />
                </div>
          </div>
      </div>
    </>
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
        destination: '/home/SignInUp',
        permanent: false,
      },
    };
  }
}


export default DueProblems;
