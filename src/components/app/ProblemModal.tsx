import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { useQuery, useMutation, useQueryClient } from 'react-query'; 
import { AuthContext } from '@/auth/AuthContext';
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
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);

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
    setIsAutofilling(true);
    try {
      const response = await fetch('/problems.json');
      if (!response.ok) throw new Error('Failed to load problems data');
      const problemsData = await response.json();

      // Compare the problem number as a string
      const problem = problemsData.find((p: any) => p.number === problemNumber.trim());
      if (problem) {
        // Concatenate the problem number with the title
        setName(`${problem.number}. ${problem.title}`);
        setQuestion(problem.content);
        setDifficulty(problem.difficulty);
        setLink(problem.url);
        setFunctionSignature(problem.boilerplate);  
        setSolution("# TODO: Enter your solution here by editing the problem");
        
        showToast(
          <>
            <span className="inline-block mr-2 bg-success rounded-full" style={{ width: '10px', height: '10px' }}></span>
            Problem autofilled successfully
          </>
        );
      } else {
        showToast('Problem not found');
      }
    } catch (error) {
      console.error('Error fetching problem data:', error);
      showToast('Error fetching problem data');
    } finally {
      setIsAutofilling(false);
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
      <div className="relative top-10 mx-auto p-8 w-[90%] max-w-4xl bg-nav rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Add New Problem</h2>

        {/* Quick Import Section */}
        <div className="mb-8 p-6 border-2 border-dashed border-divide rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-2 text-center">Quick Import</h3>
          <p className="text-secondary mb-4 text-center">Enter a Leetcode problem number to automatically fill out the details</p>
          
          <div className="flex justify-center gap-12">
            <input
              type="text"
              value={problemNumber}
              onChange={(e) => setProblemNumber(e.target.value)}
              className="w-36 px-4 py-3 bg-nav border border-divide text-primary rounded-lg focus:outline-none focus:border-blue transition-colors duration-300 text-center"
              placeholder="e.g. 1337"
            />
            <button
              type="button"
              onClick={handleAutofill}
              disabled={isAutofilling}
              className={`flex items-center gap-2 px-6 rounded-lg transition duration-200 ${
                isAutofilling ? 'bg-disabled text-disabledText' : 'bg-[#FAFAFA] text-neutral hover:opacity-90'
              }`}
            >
              {isAutofilling ? (
                <>
                  <span className="material-icons animate-spin">sync</span>
                  <span>Autofilling...</span>
                </>
              ) : (
                <>
                  <span className="material-icons">auto_fix_high</span>
                  <span>Autofill</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Manual Entry Section */}
        <div className="mb-6">
          <div 
            onClick={() => setIsManualEntryOpen(!isManualEntryOpen)}
            className="p-3 rounded-lg hover:bg-hover2 cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold text-primary">Manual Entry</span>
              <span className={`material-icons transition-transform duration-300 text-secondary ${isManualEntryOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>
            <p className="text-secondary text-sm mt-1">Manually enter or edit problem details</p>
          </div>

          {/* Collapsible Form Section */}
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isManualEntryOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-6 pt-4">
              {/* Existing form fields go here, with updated styling */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Name<span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-nav border border-divide text-primary rounded-lg focus:outline-none focus:border-blue transition-colors duration-300"
                  placeholder="Enter the name of the problem"
                />
              </div>

              {/* Question field */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Question<span className="text-error">*</span>
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-4 py-3 bg-nav border border-divide text-primary rounded-lg focus:outline-none focus:border-blue transition-colors duration-300 h-48"
                  placeholder={`Copy/paste the actual question here. 

Make sure to use proper HTML formatting tags (like <code>, <pre>, <p>, etc. ), not just plaintext, so that the question is rendered exactly like how it is on Leetcode. Use the Autofill feature to do this automatically.
`}
                />
              </div>

              {/* Solution field */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Solution<span className="text-error">*</span>
                </label>
                <textarea
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full px-4 py-3 bg-nav border border-divide text-primary rounded-lg focus:outline-none focus:border-blue transition-colors duration-300 h-48"
                  placeholder="Copy/paste the solution here (syntax highlighting is applied after problem is created)"
                />
              </div>

              {/* Function Signature field */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2 flex items-center gap-2">
                  Function Signature
                </label>
                <textarea
                  value={functionSignature}
                  onChange={(e) => setFunctionSignature(e.target.value)}
                  className="w-full px-4 py-3 bg-nav border border-divide text-primary rounded-lg focus:outline-none focus:border-blue transition-colors duration-300"
                  placeholder="Copy/paste the function signature here (this is the boilerplate code that&apos;s in the solution tab before you even type anything)"
                />
              </div>

              {/* Programming Language field */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Programming Language<span className="text-error">*</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-nav border border-divide text-primary rounded-lg focus:outline-none focus:border-blue transition-colors duration-300"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python3</option>
                  <option value="c_cpp">C/C++</option>
                  <option value="java">Java</option>
                </select>
              </div>

              {/* Link field */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Link to Problem
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-4 py-3 bg-nav border border-divide text-primary rounded-lg focus:outline-none focus:border-blue transition-colors duration-300"
                  placeholder="Copy/paste the URL to the problem here (Ex: https://leetcode.com/problems/two-sum/)"
                />
              </div>

              {/* Notes field */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-nav border border-divide text-primary rounded-lg focus:outline-none focus:border-blue transition-colors duration-300 h-24"
                  placeholder="- Add any notes you have for yourself about this problem here"
                />
              </div>

              {/* Difficulty field */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Difficulty<span className="text-error">*</span>
                </label>
                <div className="flex gap-4 mt-2">
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
            </div>
          </div>
        </div>

        {/* Bottom section with status indicator and buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-divide">
          {/* Status indicator */}
          <div className="flex items-center">
            {(() => {
              const requiredFields = [name, question, solution, functionSignature];
              const filledFields = requiredFields.filter(field => field.trim() !== '');
              
              if (filledFields.length === 0) {
                return (
                  <div className="flex items-center">
                    <span className="inline-block mr-2 bg-error rounded-full" style={{ width: '10px', height: '10px' }}></span>
                    <span className="text-secondary text-sm">No problem selected</span>
                  </div>
                );
              } else if (filledFields.length < requiredFields.length) {
                return (
                  <div className="flex items-center">
                    <span className="inline-block mr-2 bg-warning rounded-full" style={{ width: '10px', height: '10px' }}></span>
                    <span className="text-secondary text-sm">Partially filled out</span>
                  </div>
                );
              } else {
                return (
                  <div className="flex items-center">
                    <span className="inline-block mr-2 bg-success rounded-full" style={{ width: '10px', height: '10px' }}></span>
                    <span className="text-secondary text-sm">{name}</span>
                  </div>
                );
              }
            })()}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-divide text-secondary rounded-lg hover:border-feintwhite transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!name.trim() || !question.trim() || !solution.trim() || isSubmitting}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors duration-200 ${
                !name.trim() || !question.trim() || !solution.trim() || isSubmitting
                  ? 'bg-disabled text-disabledText'
                  : 'bg-success text-neutral hover:opacity-90'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="material-icons animate-spin">sync</span>
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? 'Update' : 'Create'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemModal;
