import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { useQuery, useMutation, useQueryClient } from 'react-query'; 
import { AuthContext } from '@/auth/AuthContext';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { convert } from 'html-to-text';

const MAX_PROBLEMS = 152;

const ProblemModal = ({ isOpen, onClose, collectionId, isEditMode = false, problemToEdit = null, showToast }: {isOpen:any, onClose:any, collectionId:any, isEditMode?:boolean, problemToEdit?:any, showToast?:any}) => {
  const [problemNumber, setProblemNumber] = useState('');
  const [name, setName] = useState(isEditMode && problemToEdit ? problemToEdit.name : '');
  const [question, setQuestion] = useState(isEditMode && problemToEdit ? problemToEdit.question : '');
  const [solution, setSolution] = useState(isEditMode && problemToEdit ? problemToEdit.solution : '');
  const [difficulty, setDifficulty] = useState(isEditMode && problemToEdit ? problemToEdit.difficulty : 'Easy');
  const [functionSignature, setFunctionSignature] = useState(isEditMode && problemToEdit ? problemToEdit.functionSignature : '');
  const [language, setLanguage] = useState(isEditMode && problemToEdit ? problemToEdit.language : 'python');
  const [link, setLink] = useState(isEditMode && problemToEdit ? problemToEdit.link : '');
  const [notes, setNotes] = useState(isEditMode && problemToEdit ? problemToEdit.notes : '');
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(isEditMode && problemToEdit ? problemToEdit.name : '');
    setQuestion(isEditMode && problemToEdit ? problemToEdit.question : '');
    setSolution(isEditMode && problemToEdit ? problemToEdit.solution : '');
    setDifficulty(isEditMode && problemToEdit ? problemToEdit.difficulty : 'Easy');
    setFunctionSignature(isEditMode && problemToEdit ? problemToEdit.functionSignature : '');
    setLanguage(isEditMode && problemToEdit ? problemToEdit.language : 'python');
    setLink(isEditMode && problemToEdit ? problemToEdit.link : '');
    setNotes(isEditMode && problemToEdit ? problemToEdit.notes : ''); 

  }, [isOpen]);

  const fetchUserSettings = async () => {
    if (!user) throw new Error("No user found");
    const response = await fetch(`/api/getUserSettings?userEmail=${user.email}`);
    if (!response.ok) throw new Error("Failed to fetch user settings");
    return response.json();
  };
  
  const { isLoading: userLoading, data: theUser, error: userError } = useQuery(['userSettings', user?.email], fetchUserSettings, {
    enabled: !!user, 
  })

  const fetchProblems = async () => {
    const response = await fetch(`/api/getCollectionProblems?collectionId=${collectionId}&userId=${theUser?.id}`);
    if (!response.ok) throw new Error('Failed to fetch problems');
    return response.json();
  };

  const { data: problems, isLoading: problemsLoading, error: problemsError } = useQuery(
    ['collectionProblems', collectionId, theUser?.id],
    fetchProblems,
    {
      enabled: isOpen && !!user,
    }
  );

  const { data: problemCount } = useQuery(
    ['problemCount', collectionId],
    async () => {
      const response = await fetch(`/api/getCollectionProblems?collectionId=${collectionId}`);
      const problems = await response.json();
      return problems.length;
    },
    { enabled: !!collectionId && !isEditMode }
  );

  const mutation = useMutation(
    async ({ name, question, solution, difficulty, collectionId, functionSignature, language, link, notes, headers }: { name: any, question: any, solution: any, difficulty: any, collectionId: any, functionSignature: any, language: any, link: any, notes: any, headers: HeadersInit }) => {
      if (!isEditMode && problemCount >= MAX_PROBLEMS) {
        throw new Error(`Collections cannot have more than ${MAX_PROBLEMS} problems`);
      }

      setIsSubmitting(true);
      const url = isEditMode ? `/api/updateProblem?problemId=${problemToEdit.id}` : '/api/createProblem';
      const method = isEditMode ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify({
          name: name, 
          question: question, 
          solution: solution, 
          difficulty: difficulty, 
          collectionId: collectionId, 
          functionSignature: functionSignature, 
          language: language, 
          link: link, 
          notes: notes
        }),
      });
      if (!response.ok) throw new Error('Failed to submit problem');
      const result = await response.json();

      // Call updateCollectionCounts endpoint after problem creation
      if (!isEditMode) {
        const updateResponse = await fetch('/api/updateCollectionCounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ collectionId: collectionId }),
        });
        if (!updateResponse.ok) throw new Error('Failed to update collection counts');
      }

      return result;

    },
    {
      onSuccess: () => {
        // Invalidate and refetch problems list
        queryClient.invalidateQueries(['collectionDetails']);
        queryClient.invalidateQueries(['problemDetails']); // for problem view 
        queryClient.invalidateQueries(['allProblems', user?.email]); // for dashboard numbers 
        queryClient.invalidateQueries(['dueTodayProblems', user?.email]); // for the ProblemQueue
        queryClient.invalidateQueries(['userSettings', user?.email]); // for free tier checks 
        queryClient.invalidateQueries(['collectionProblems', collectionId]); // for free tier checks 
        queryClient.invalidateQueries(['collections', user?.email]); // for collection problem type counts  
        showToast(
          <>
            <span className="inline-block mr-2 bg-success rounded-full" style={{ width: '10px', height: '10px' }}></span>
            {isEditMode ? 'Problem updated successfully' : 'Problem created successfully'}
          </>
        );
        onClose();
      },
      onError: (error: any) => {
        console.error('Failed to submit problem:', error);
        showToast(
          <>
            <span className="inline-block mr-2 bg-error rounded-full" style={{ width: '10px', height: '10px' }}></span>
            {error.message}
          </>
        );
      },
      onSettled: () => {
        setIsSubmitting(false);
      }
    }
  );

  if (!isOpen) return null;

  const handleAutofill = async () => {
    try {
      const response = await fetch('/problems.json');
      if (!response.ok) throw new Error('Failed to load problems data');
      const problemsData = await response.json();

      // Compare the problem number as a string
      const problem = problemsData.find((p: any) => p.number === problemNumber.trim());
      if (problem) {
        setName(problem.title);
        // Convert HTML content to plain text
        const plainTextContent = convert(problem.content, {
          wordwrap: 130, // Optional: set word wrap limit
        });
        setQuestion(plainTextContent);
        setDifficulty(problem.difficulty);
        setLink(problem.url);
        setFunctionSignature(problem.boilerplate);  
      } else {
        showToast('Problem not found');
      }
    } catch (error) {
      console.error('Error fetching problem data:', error);
      showToast('Error fetching problem data');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    // Retrieve the Firebase authentication token
    const token = await auth.currentUser?.getIdToken();
  
    if (!token) {
      console.error('Authentication token is not available.');
      return;
    }
  
    // Include the token in the Authorization header
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  
    mutation.mutate({
      name,
      question,
      solution,
      difficulty,
      collectionId,
      functionSignature,
      language,
      link,
      notes, 
      headers: headers, 
    });
  };


  return (
    <div className={`${isOpen ? '' : 'hidden'} fixed inset-0 bg-base_100 bg-opacity-75 overflow-y-auto h-full w-full z-10`}>
      <div className={`relative top-0 mx-auto p-5 w-2/3 rounded-md`}>
        <div className="mt-3 text-center">
          {userLoading || problemsLoading ? (
            <p>One moment please...</p>
          ) : theUser?.membershipType === 'free' && problems?.length >= 10 && !isEditMode ? (
            <>
            <div className={`${isOpen ? '' : 'hidden'} fixed inset-0 bg-base_100 bg-opacity-50 flex items-center justify-center`}>
              <div className="relative w-96 bg-[#1E1E20] rounded-lg shadow-lg p-5 modalBounceFadeIn">
                <button onClick={onClose} className="absolute top-3 right-3 text-secondary hover:text-primary transition duration-150 ease-in-out">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-primary">Free Tier limit reached!</h3>
                  <div className="mt-4">
                    <p className="text-secondary text-sm">You may only create up to 10 problems per collection on the Free Tier. To create more, please upgrade your membership.</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="bg-pop text-white font-medium py-2 px-6 rounded-md transition ease-in-out duration-150">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </>
          ) : problems?.length >= MAX_PROBLEMS && !isEditMode ? (
            <>
            <div className={`${isOpen ? '' : 'hidden'} fixed inset-0 bg-base_100 bg-opacity-50 flex items-center justify-center`}>
              <div className="relative w-96 bg-[#1E1E20] rounded-lg shadow-lg p-5 modalBounceFadeIn">
                <button onClick={onClose} className="absolute top-3 right-3 text-secondary hover:text-primary transition duration-150 ease-in-out">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-primary">Problem limit reached!</h3>
                  <div className="mt-4">
                    <p className="text-secondary text-sm">For now, you may only create up to 152 problems per collection. As we upgrade our servers, this limit will increase. Consider making another collection if you want to create more problems.</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="bg-pop text-white font-medium py-2 px-6 rounded-md transition ease-in-out duration-150">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </>
            ) : (
            <>
              <h3 className="text-lg leading-6 font-medium text-primary">
                {isEditMode ? 'Edit Problem' : 'New Problem'} 
              </h3>
              <div className="mt-2 px-7 py-3">
                <form className="space-y-4">
                <div className="mb-12">
                    <label className="block text-sm font-medium text-secondary text-left">
                      Leetcode Problem Number:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={problemNumber}
                        onChange={(e) => setProblemNumber(e.target.value)}
                        className="mt-1 px-3 py-2 bg-nav border border-divide text-primary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300 w-1/4"
                        placeholder='Any number 1-3322'
                      />
                      <button
                        type="button"
                        onClick={handleAutofill}
                        className="inline-flex justify-center items-center gap-x-3 text-center bg-pop text-neutral text-lg font-medium rounded-md focus:ring-1 py-2 px-4 transition-transform duration-200 hover:scale-95"
                      >
                        Autofill
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary text-left">
                      Name<span className="text-error">*</span>:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 px-3 py-2 bg-nav border border-divide text-primary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300 block w-full"
                      placeholder='Enter the name of the problem here'
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary text-left">
                      Question<span className="text-error">*</span>:
                    </label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="mt-1 px-3 py-2 bg-nav border border-divide text-primary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300 block w-full h-96"
                      placeholder='Copy/paste the question details here (the description, examples, contraints, etc.)'
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary text-left">
                      Solution<span className="text-error">*</span>:
                    </label>
                    <textarea
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      className="mt-1 px-3 py-2 bg-nav border border-divide text-primary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300 block w-full h-96"
                      placeholder='Copy/paste the solution here (syntax highlighting is applied after problem is created)'
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary text-left">
                      Function Signature:<span className="material-icons text-xl hover:cursor-pointer" data-tooltip-id="my-tooltip-1" data-tooltip-html="On Leetcode, this is the boilerplate code for the solution </br> already in the code editor before you even type anything">help</span>
                    </label>
                    <textarea
                      value={functionSignature}
                      onChange={(e) => setFunctionSignature(e.target.value)}
                      className="mt-1 px-3 py-2 bg-nav border border-divide text-primary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300 block w-full"
                      placeholder="Copy/paste the function signature (aka the boilerplate solution code) here"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary text-left">
                      Programming Language<span className="text-error">*</span>:
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="mt-1 px-3 py-2 bg-nav border border-divide text-primary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300 block w-full"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python3</option>
                      <option value="c_cpp">C/C++</option>
                      <option value="java">Java</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary text-left">
                      Link to Problem:
                    </label>
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="mt-1 px-3 py-2 bg-nav border border-divide text-primary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300 block w-full"
                      placeholder="Copy/paste the URL to the problem here (Ex: https://leetcode.com/problems/two-sum/)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary text-left">
                      Additional Notes:
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-1 px-3 py-2 bg-nav border border-divide text-primary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300 block w-full h-24"
                      placeholder='- Add any notes you have for yourself about this problem here'
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary text-left">
                      Difficulty<span className="text-error">*</span>:
                    </label>
                    <div className="flex justify-start gap-4 mt-2 text-primary">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="Easy"
                          name="difficulty"
                          checked={difficulty === 'Easy'}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className="form-radio"
                        />
                        <span className="ml-2 text-easy bg-easybg px-4 py-1 rounded-full">Easy</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="Medium"
                          name="difficulty"
                          checked={difficulty === 'Medium'}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className="form-radio"
                        />
                        <span className="ml-2 text-medium bg-mediumbg px-2 py-1 rounded-full">Medium</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="Hard"
                          name="difficulty"
                          checked={difficulty === 'Hard'}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className="form-radio"
                        />
                        <span className="ml-2 text-hard bg-hardbg px-4 py-1 rounded-full">Hard</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-transparent hover:border-feintwhite border border-divide text-primary py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!name.trim() || !question.trim() || !solution.trim() || isSubmitting}
                      className={`
                        flex items-center gap-2 py-2 px-6 rounded-md transition ease-in-out duration-150
                        ${!name.trim() || !question.trim() || !solution.trim() || isSubmitting
                          ? 'bg-disabled text-disabledText cursor-not-allowed'
                          : 'bg-success text-neutral hover:bg-opacity-90'}
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-icons animate-spin text-xl">sync</span>
                          {isEditMode ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        isEditMode ? 'Update' : 'Create'
                      )}
                    </button>
                  </div>
                </form>
                <ReactTooltip
                    id="my-tooltip-1"
                    place="bottom"
                    style={{ backgroundColor: "#111111" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
  
  
  
  
};

export default ProblemModal;
