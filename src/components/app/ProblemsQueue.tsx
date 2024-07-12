import { useRouter } from 'next/router';
import React, { useEffect, useState, useContext } from 'react';
import '../../app/globals.css'; 
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.css'; // or any other style of your choice
import { AuthContext } from '@/auth/AuthContext';
import { useMutation, useQueryClient } from 'react-query';
import ChatWindow from './ChatWindow';
  
  const ProblemsQueue = ({ problems, userSettings, refetchProblems }: {problems:any, userSettings:any, refetchProblems: any}) => {
    const [language, setLanguage] = useState('python'); 

    const [dueProblems, setDueProblems] = useState<any>([]);
    const [buttons, setButtons] = useState<any[]>([]);
    const [againText, setAgainText] = useState<any>();
    const [hardText, setHardText] = useState<any>(); 
    const [goodText, setGoodText] = useState<any>(); 
    const [easyText, setEasyText] = useState<any>();  
    const [content, setContent] = useState<any>('question');
    const [isLoading, setIsLoading] = useState(false); // while we transition from current problem to next in queue   
    const [editorContent, setEditorContent] = useState<any>('');  
    const queryClient = useQueryClient();
    const [showChat, setShowChat] = useState(false);

    const { user } = useContext(AuthContext);

     // Use useEffect to highlight code when the component mounts or updates
    useEffect(() => {
      hljs.highlightAll();
    }, [content]);

    useEffect(() => {
      if(!userSettings){
        return; 
      }
      if (problems) {
        console.log(dueProblems)
        setDueProblems(problems);
      }
          // Set buttons based on the type of the first problem
    if (dueProblems.length > 0) {
      const firstProblemType = dueProblems[0].type;
      const buttonsBasedOnType = firstProblemType === 'New' || firstProblemType === 'Learning' || firstProblemType === 'Relearning'
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
      if (dueProblems[0]) {
        switch (dueProblems[0].type) {
          case 'New': {
            const stepsArray = userSettings?.learnSteps.split(' ');
            const firstLearningStep = stepsArray[0];
            const secondLearningStep = stepsArray.length > 1 ? stepsArray[1] : userSettings?.graduatingInterval + "d";
            setAgainText(firstLearningStep);
            setGoodText(secondLearningStep);
            setEasyText(userSettings?.easyInterval + "d");
            break;
          }
          case 'Learning': {
            const stepsArray = userSettings?.learnSteps.split(' ');
            const firstLearningStep = stepsArray[0];

            let nextInterval;
            // If interval is -1 or less than 12hr, set Good text to the second learning step or the graduating interval
            if (dueProblems[0].interval === -1 || dueProblems[0].interval < 720) {
              nextInterval = stepsArray.length > 1 ? stepsArray[1] : userSettings?.graduatingInterval + "d";
            } else {
              // Find the current interval in the learning steps
              const currentIndex = stepsArray.findIndex((step: any) => step === dueProblems[0].interval.toString());
          
              if (currentIndex >= 0 && currentIndex < stepsArray.length - 1) {
                // If there is a next step, use it
                nextInterval = stepsArray[currentIndex + 1];
              } else {
                // If the current interval is the last one, or not found, use the graduating interval
                nextInterval = userSettings?.graduatingInterval + "d";
              }
            }
            const easyint = userSettings?.easyInterval + "d"; 

            setAgainText(firstLearningStep);
            setGoodText(nextInterval);
            setEasyText(easyint);
            break;
          }
          case 'Relearning': {
            const relearnStepsArray = userSettings?.relearnSteps.split(' '); 
            const firstStep = relearnStepsArray[0]; 

            const currentIndex = relearnStepsArray.findIndex((step: any) => step === dueProblems[0].interval);
            // Determine the next interval
            let nextInterval;
            if (currentIndex >= 0 && currentIndex < relearnStepsArray.length - 1) {
              // If there is a next step, use it
              nextInterval = relearnStepsArray[currentIndex + 1];
            } else {
              // If the current interval is the last one, or not found, use the relearnGraduating interval (which is a percent)
              nextInterval = dueProblems[0].relearnInterval * userSettings?.relearnGraduatingInterval
            }
            
            let easyInt = dueProblems[0].relearnInterval * userSettings?.relearnGraduatingInterval; 

            nextInterval = Math.floor(nextInterval / 1440); // Convert to days and round down
            easyInt = Math.floor(easyInt / 1440); // Convert to days and round down
            setAgainText(firstStep); 
            setGoodText(nextInterval + 'd'); 
            setEasyText(easyInt + 'd'); 
            break;
          }
          case 'Review': {
            const relearnStepsArray = userSettings?.learnSteps.split(' '); 
            const firstRelearnStep = relearnStepsArray[0]; 

            const intervalHard = Math.floor((dueProblems[0].interval * 1.2 * userSettings?.intervalModifier) / 1440);
            const intervalGood = Math.floor((dueProblems[0].interval * dueProblems[0].ease * userSettings?.intervalModifier) / 1440); 
            const intervalEasy = Math.floor((dueProblems[0].interval * dueProblems[0].ease * userSettings?.easyBonus * userSettings?.intervalModifier) / 1440);

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
    }, [problems, dueProblems]);

    const getButtonColor = (label: string) => {
      switch (label) {
        case 'Again':
          return 'text-error rounded-md hover:bg-hover2'; 
        case 'Hard':
          return 'text-medium rounded-md hover:bg-hover2'; 
        case 'Good':
          return 'text-easy rounded-md hover:bg-hover2'; 
        case 'Easy':
          return 'text-blue rounded-md hover:bg-hover2'; 
        default:
          return 'text-neutral dark:text-secondary rounded-md hover:bg-hover2'; 
      }
    };

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


    const updateProblemMutation = useMutation(async ({ problemId, updates }: { problemId: any, updates: any }) => {
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
  
      return response.json();
    });

    // handles the repeated logic of updating the problem's due date, updating the problem in the database, and handling the resultant changes in the array of problems
    async function Helper(problem:any) {
      setIsLoading(true);
        // update due date 
        const currentDate = new Date(); // get the current date
        const additionalTime = problem.interval * 60 * 1000; // convert minutes to milliseconds 
        const newDueDate = new Date(currentDate.getTime() + additionalTime); // set the new due date based on the current date plus the interval
        problem.dueDate = newDueDate;

        const updates = {
        type: problem.type,
        interval: problem.interval,
        relearnInterval: problem.relearnInterval,
        ease: problem.ease,
        dueDate: problem.dueDate,
        };
        updateProblemMutation.mutate({ problemId: problem.id, updates }, {
          onSuccess: (updatedProblem) => {
            //check if problem is still due today 
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const updatedDueDate = new Date(updatedProblem.dueDate);
            updatedDueDate.setHours(0, 0, 0, 0);

            // Create a new array excluding the current problem to manipulate and update the state later
            let updatedProblems = dueProblems.filter((p:any) => p.id !== problem.id);
            console.log(updatedProblems)

            if (updatedDueDate.getTime() === today.getTime()) {
              console.log("Still due")
              updatedProblems.push(updatedProblem);
          }
          setDueProblems(updatedProblems); 
          refetchProblems(); 
          setIsLoading(false);
          },
          onError: (error) => {
            // Handle any errors
            console.error('Error updating problem:', error);
          },
        });
    }

    // handles the logic of what happens to the problem depeneding on the feedback button pressed 
    const Algorithm = async(buttonValue:any) => {
        console.log(`Button clicked: ${buttonValue}`); 

        if(dueProblems[0].type === "New") {
            if(buttonValue === "again") { // update type to learning, set interval to interval of first learning step, update due date 
                dueProblems[0].type = "Learning"; 

                // Parse learningSteps and convert to minutes
                const stepsArray = userSettings?.learnSteps.split(' ').map((step:string) => {
                const value = parseInt(step.slice(0, -1));
                const unit = step.slice(-1);
                return unit === 'm' ? value : value * 24 * 60; 
            });
            dueProblems[0].interval = stepsArray[0]; 


            await Helper(dueProblems[0]); 
        
            }
            else if(buttonValue === "good") { // update type to learning, set the interval 2nd step's (since this card is new, it's on the first step by default) interval OR graduating interval, update due date
              dueProblems[0].type = "Learning"; 

              const stepsArray = userSettings?.learnSteps.split(' ').map((step:string) => {
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
                nextInterval = userSettings?.graduatingInterval * 24 * 60;
                dueProblems[0].type = "Review"; 
            }
            dueProblems[0].interval = nextInterval;


            await Helper(dueProblems[0]);
            }

            else if (buttonValue === "easy") { // update type to review, change interval to easyinterval, update due date 
            dueProblems[0].type = "Review"; 

            // Set the interval to the easyInterval value (it's in days so convert it to minutes)
            dueProblems[0].interval = userSettings?.easyInterval * 24 * 60; 

            await Helper(dueProblems[0]); 
            }
        }
        else if(dueProblems[0].type === "Learning") {
            if(buttonValue === "again") { // set interval to first learning step, update due date
            const stepsArray = userSettings?.learnSteps.split(' ').map((step:string) => {
                const value = parseInt(step.slice(0, -1));
                const unit = step.slice(-1);
                return unit === 'm' ? value : value * 24 * 60; 
            });
            dueProblems[0].interval = stepsArray[0]; 


            await Helper(dueProblems[0]);
            }
            else if (buttonValue === "good") {
              const stepsArray = userSettings?.learnSteps.split(' ').map((step: string) => {
                const value = parseInt(step.slice(0, -1));
                const unit = step.slice(-1);
                return unit === 'm' ? value : value * 24 * 60; // Convert to minutes
              });

              let nextInterval;
              // If the current problem's interval isn't set OR it is less than 12hr (arbitrarily chosen), then it means that this is probably a New card that had "Again" pressed on it to turn it to learning, so set interval to 2nd learning step 
              if (dueProblems[0].interval === -1 || dueProblems[0].interval < 720) {
                // If interval is -1, set it equal to the 2nd learning step instead
                nextInterval = stepsArray[1];
              } else {
                // Find the index of the current interval in stepsArray
                const currentIndex = stepsArray.findIndex((step: any) => step === dueProblems[0].interval);

                if (currentIndex >= 0 && currentIndex < stepsArray.length - 1) {
                  // If there is a next step, use it
                  nextInterval = stepsArray[currentIndex + 1];
                } else {
                  // If the current interval is the last one, or not found, use the graduating interval
                  // graduatingInterval is in days and needs to be converted to minutes
                  nextInterval = userSettings?.graduatingInterval * 24 * 60;
                  dueProblems[0].type = "Review";
                }
              }
              dueProblems[0].interval = nextInterval;


              await Helper(dueProblems[0]);
            }
            else if (buttonValue === "easy") { // update type to review, set interval to easyInterval, update due date
            dueProblems[0].type = "Review"; 

            // Set the interval to the easyInterval value (it's in days, so make it in minutes)
            dueProblems[0].interval = userSettings?.easyInterval * 24 * 60; 


            await Helper(dueProblems[0]);
            }
        }
        else if (dueProblems[0].type === "Relearning") {
            if(buttonValue === "again") { // set interval to 1st step in relearningSteps array, update due date
            const relearnStepsArray = userSettings?.relearnSteps.split(' ').map((step:string) => {
                const value = parseInt(step.slice(0, -1));
                const unit = step.slice(-1);
                return unit === 'm' ? value : value * 24 * 60; 
            });
            dueProblems[0].interval = relearnStepsArray[0]; 


            await Helper(dueProblems[0]);
            }
            else if(buttonValue === "good") { // set interval to the next relearning step (can NOT have duplictates) OR to relearnInterval * relearnGraduatingInterval, update due date
            const relearnStepsArray = userSettings?.relearnSteps.split(' ').map((step:string) => {
                const value = parseInt(step.slice(0, -1));
                const unit = step.slice(-1);
                return unit === 'm' ? value : value * 24 * 60; 
            });
            // Find the index of the current interval in stepsArray
            const currentIndex = relearnStepsArray.findIndex((step: any) => step === dueProblems[0].interval);

            // Determine the next interval
            let nextInterval;
            if (currentIndex >= 0 && currentIndex < relearnStepsArray.length - 1) {
                // If there is a next step, use it
                nextInterval = relearnStepsArray[currentIndex + 1];
            } else {
                // If the current interval is the last one, or not found, use the relearnGraduating interval (which is a percent)
                nextInterval = dueProblems[0].relearnInterval * userSettings?.relearnGraduatingInterval
                dueProblems[0].relearnInterval = 0; 
                dueProblems[0].type = "Review";
            }

            dueProblems[0].interval = nextInterval;


            await Helper(dueProblems[0]);
            }
            else if (buttonValue === "easy") { // skip all the relearn steps and set interval immediately to relearnInterval * relearnGraduatingInterval, set type to reveiw, update due date
            dueProblems[0].interval = dueProblems[0].relearnInterval * userSettings?.relearnGraduatingInterval; 
            dueProblems[0].relearnInterval = 0; 
            dueProblems[0].type = "Review"; 

            await Helper(dueProblems[0]);
            }
        }
        else if (dueProblems[0].type === "Review") {
            if(buttonValue === "again") { // set problem type to Relearning, decrease ease by 20% (0.2), set relearnInterval to current interval, set interval to 1st step of relearnSteps array, update due date 
            dueProblems[0].type = "Relearning";
            dueProblems[0].ease = (dueProblems[0].ease - 0.20 >= userSettings?.minimumEase) ? dueProblems[0].ease - 0.20 : userSettings.minimumEase;

            dueProblems[0].relearnInterval = dueProblems[0].interval;
            const relearnStepsArray = userSettings?.relearnSteps.split(' ').map((step:string) => {
                const value = parseInt(step.slice(0, -1));
                const unit = step.slice(-1);
                return unit === 'm' ? value : value * 24 * 60; 
            });

            dueProblems[0].interval = relearnStepsArray[0]; 

            await Helper(dueProblems[0]);

            }
            else if(buttonValue === "hard") { // decrease the problem's ease by 15%, set interval to 1.2*current interval*interval modifier, update due date
              dueProblems[0].ease = (dueProblems[0].ease - 0.15 >= userSettings?.minimumEase) ? dueProblems[0].ease - 0.15 : userSettings.minimumEase;

              // Calculate next interval via equation 
              dueProblems[0].interval = dueProblems[0].interval * 1.2 * userSettings?.intervalModifier;
              const fuzz = (Math.random() * (0.05 - 0.02) + 0.02).toFixed(2); 
              dueProblems[0].interval *= (1 + parseFloat(fuzz));

              await Helper(dueProblems[0]);
            }
            else if(buttonValue === "good") { // set the interval according to equation (ease remains unchanged), update due date
              dueProblems[0].interval = dueProblems[0].interval * dueProblems[0].ease * userSettings?.intervalModifier;
              const fuzz = (Math.random() * (0.05 - 0.02) + 0.02).toFixed(2); 
              dueProblems[0].interval *= (1 + parseFloat(fuzz));

              await Helper(dueProblems[0]);
            }
            else if (buttonValue === "easy") { // set the interval according to the equation, increase the ease by 15%, update due date
              dueProblems[0].interval = dueProblems[0].interval * dueProblems[0].ease * userSettings?.easyBonus * userSettings?.intervalModifier;
              const fuzz = (Math.random() * (0.05 - 0.02) + 0.02).toFixed(2); 
              dueProblems[0].interval *= (1 + parseFloat(fuzz));

              dueProblems[0].ease = dueProblems[0].ease + 0.15; 

              await Helper(dueProblems[0]);
            }
        }
        setContent('question'); 
        setEditorContent(''); 
        queryClient.invalidateQueries(['allProblems', user?.email]);
        queryClient.invalidateQueries(['collectionProblems']);
    };

  
    if (isLoading) {
      return (
          <div className="flex justify-center items-center h-full">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-secondary animate-spin dark:text-base_100 fill-load"
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

  if (!isLoading && dueProblems.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl text-center text-secondary">
          Congratulations! You have finished all the problems due for today.
        </p>
      </div>
    );
  }


    return (
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <div className="flex-1 overflow-auto bg-tertiary p-4 shadow-md rounded-sm" style={{ maxHeight: '70vh' }}>
          {/* Buttons for toggling between question and solution */}
          <div className="mb-4">
            <button className={`mr-2 py-2 px-4 text-primary transition-width duration-300 ${content === 'question' ? 'border-b-2 border-divide' : 'border-b-2 border-tertiary'}`} onClick={() => setContent('question')}>Problem</button>
            <button className={`mr-2 py-2 px-4 text-primary transition-width duration-300 ${content === 'notes' ? 'border-b-2 border-divide' : 'border-b-2 border-tertiary'}`} onClick={() => setContent('notes')}>Notes</button>
            <button className={`mr-2 py-2 px-4 text-primary transition-width duration-300 ${content === 'solution' ? 'border-b-2 border-divide' : 'border-b-2 border-tertiary'}`} onClick={() => setContent('solution')}>Solution</button>
            
        </div>
        {content === 'solution' && buttons?.length > 0 && (
          <div className="mb-4 flex flex-wrap">
            {buttons.map((button: any, index: any) => (
              <button
                key={index}
                className={`mx-2 py-1 px-1 border border-divide transition-width duration-300 ${getButtonColor(button.label)}`}
                onClick={() => Algorithm(button.value)}
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
        )}
        {/* Left side content (The question) */}
        <div className="flex justify-between items-center text-secondary">
          <h1 className="text-xl font-bold">{dueProblems[0].name}
            <a href={dueProblems[0].link} target="_blank" rel="noopener noreferrer">
              <span className="material-icons hover:scale-110 text-pop2 ml-2">
                link
              </span>
            </a>
          </h1>
          <div className="text-right m-5">
          <span className={`${getDifficultyColor(dueProblems[0].difficulty)} rounded-full py-1`}>
                {dueProblems[0].difficulty}
            </span> 
            <span className="text-divide"> / </span> 
            <span className={`${getTypeColor(dueProblems[0].type)} rounded-full py-1`}>
                {dueProblems[0].type}
            </span>
          </div>
        </div>
        {content === 'notes' ? (
          <p className="text-secondary mt-4 whitespace-pre-wrap text-lg">{dueProblems[0].notes}</p>
        ) : content === 'question' ? (
          <p className="text-secondary mt-4 whitespace-pre-wrap text-lg">{dueProblems[0].question}</p>
        ) : (
          <pre><code className={`language-${dueProblems[0].language} mr-5`}>{dueProblems[0].solution}</code></pre>
        )}
        </div>
        <div className="w-px bg-gray-800"></div> {/* Vertical line */}
        <div className="flex-1 overflow-auto" style={{ maxHeight: '70vh' }}>
          <AceEditor
            className="rounded"
            mode={dueProblems[0].language}
            theme="chaos"
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={editorContent || dueProblems[0].functionSignature}
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
          <button 
            onClick={() => setShowChat(true)} 
            className="absolute bottom-2 right-4 bg-new text-white px-4 py-2 rounded-md shadow-lg transition-colors"
          >
            Check With AI
          </button>
      </div>
      {showChat && (
        <ChatWindow 
          problem={dueProblems[0]} 
          editorContent={editorContent} 
          apiKey={userSettings.apiKey}
          onClose={() => setShowChat(false)} 
        />
      )}
        </div>
      
    );
  };

  export default ProblemsQueue;