import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import '../../app/globals.css'; 
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import useDarkMode from '../../../useDarkMode';
import { AuthContext } from '@/auth/AuthContext';
  
  const Problem = ({ problem, contentActive, setContentActive, editorContent, setEditorContent, buttons, onButtonClick }: {problem:any, contentActive:any, setContentActive:any, editorContent:any, setEditorContent:any, buttons?:any, onButtonClick?:any}) => {

    const [problemDetails, setProblemDetails] = useState<any>();
    const [userSettings, setUserSettings] = useState<any>(); 
    const [againText, setAgainText] = useState<any>();
    const [hardText, setHardText] = useState<any>(); 
    const [goodText, setGoodText] = useState<any>(); 
    const [easyText, setEasyText] = useState<any>();  
    const { user } = useContext(AuthContext);

    useEffect(() => {
      const fetchProblemDetails = async () => {
        try {
          const response = await fetch(`/api/getProblemDetails?problemId=${problem.id}`);
          if (response.ok) {
            const data = await response.json();
            setProblemDetails(data);
            
          } else {
            throw new Error("Failed to fetch problem details");
          }
        } catch (error: any) {
          console.error(error.message);
        } 
      }

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

      fetchUserSettings(); 
      fetchProblemDetails();

      // Calculate the next due date of the problem 
      if (buttons && problemDetails && userSettings) {
        switch (problemDetails.type) {
          case 'New': {
            const stepsArray = userSettings.learnSteps.split(' ');
            const firstLearningStep = stepsArray[0];
            const secondLearningStep = stepsArray[1]; 
            setAgainText(firstLearningStep);
            setGoodText(secondLearningStep);
            setEasyText(userSettings.easyInterval + "d"); 
            break; 
          }
          case 'Learning': {
            const stepsArray = userSettings.learnSteps.split(' ');
            const firstLearningStep = stepsArray[0];

            const currentIndex = stepsArray.findIndex((step: any) => step === problem.interval);
            let nextInterval;
            if (currentIndex >= 0 && currentIndex < stepsArray.length - 1) {
              // If there is a next step, use it
              nextInterval = stepsArray[currentIndex + 1];
            } else {
              // If the current interval is the last one, or not found, use the graduating interval
              nextInterval = userSettings.graduatingInterval + "d";
              const easyint = userSettings.easyInterval + "d"; 

              setAgainText(firstLearningStep);
              setGoodText(nextInterval);
              setEasyText(easyint);
              break;
            }
          }
          case 'Relearning': {
            const relearnStepsArray = userSettings.relearnSteps.split(' '); 
            const firstStep = relearnStepsArray[0]; 

            const currentIndex = relearnStepsArray.findIndex((step: any) => step === problem.interval);
            // Determine the next interval
            let nextInterval;
            if (currentIndex >= 0 && currentIndex < relearnStepsArray.length - 1) {
              // If there is a next step, use it
              nextInterval = relearnStepsArray[currentIndex + 1];
            } else {
              // If the current interval is the last one, or not found, use the relearnGraduating interval (which is a percent)
              nextInterval = problem.relearnInterval * userSettings.relearnGraduatingInterval
            }
            
            const easyint = problem.relearnInterval * userSettings.relearnGraduatingInterval; 

            setAgainText(firstStep); 
            setGoodText(nextInterval); 
            setEasyText(easyint); 
            break;
          }
          case 'Review': {
            const relearnStepsArray = userSettings.learnSteps.split(' '); 
            const firstRelearnStep = relearnStepsArray[0]; 

            const intervalHard = Math.floor((problem.interval * 1.2 * userSettings.intervalModifier) / 1440);
            const intervalGood = Math.floor((problem.interval * problem.ease * userSettings.intervalModifier) / 1440); 
            const intervalEasy = Math.floor((problem.interval * problem.ease * userSettings.easyBonus * userSettings.intervalModifier) / 1440);

            setAgainText(firstRelearnStep); 
            setHardText(intervalHard + "d"); 
            setGoodText(intervalGood + "d"); 
            setEasyText(intervalEasy + "d"); 
            break;
          }
          default: {
            // Optional: handle unknown problem types or log an error
            break;
          }
        }
      }
    }, []); 
  
    if (!problem) {
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
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <div className="flex-1 overflow-auto" style={{ maxHeight: '70vh' }}>
          {/* Buttons for toggling between question and solution */}
          <div className="mb-4">
            <button className={`mr-2 py-2 px-4 text-primary2 dark:text-primary transition-width duration-300 ${contentActive === 'question' ? 'border-b-2 border-feintwhite dark:border-divide' : 'border-b-2 border-white dark:border-base_100'}`} onClick={() => setContentActive('question')}>Problem</button>
            <button className={`mr-2 py-2 px-4 text-primary2 dark:text-primary transition-width duration-300 ${contentActive === 'solution' ? 'border-b-2 border-feintwhite dark:border-divide' : 'border-b-2 border-white dark:border-base_100'}`} onClick={() => setContentActive('solution')}>Solution</button>
            {contentActive === 'solution' && buttons?.length > 0 && buttons.map((button: any, index: any) => (
              <button
                key={index}
                className="mx-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => onButtonClick(button.value)}
              >
                {button.label}(
                  {(() => {
                    switch (button.label) {
                      case 'Again':
                        return againText;
                      case 'Hard':
                        return hardText;
                      case 'Good':
                        return goodText;
                      case 'Easy':
                        return easyText;
                      default:
                        return '';
                    }
                  })()}
                )
              </button>
            ))}
        </div>
        {/* Left side content (The question) */}
        <div className="flex justify-between items-center text-neutral dark:text-white">
          <h1 className="text-xl font-bold">{problem.name}</h1>
          <span className="text-sm m-5">{problem.difficulty}</span>
        </div>
        {contentActive === 'question' ? (
          <p className="text-neutral dark:text-white mt-4 whitespace-pre-wrap">{problem.question}</p>
        ) : (
          <p className="text-neutral dark:text-white mt-4 whitespace-pre-wrap">{problem.solution}</p> 
        )}
        </div>
        <div className="w-px bg-gray-800"></div> {/* Vertical line */}
        <div className="flex-1 overflow-auto" style={{ maxHeight: '70vh' }}>
          {/* Right side content (Ace Editor) */}
          <AceEditor
            className="rounded"
            mode="python"
            theme="monokai"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={editorContent}
            onChange={(newValue) => setEditorContent(newValue)}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            style={{ height: '100%', width: '100%' }}  
          />
        </div>
      </div>
    );
  };
  
  export default Problem;