import React, { useState, useEffect, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '@/auth/AuthContext';


const ProblemModal = ({ isOpen, onClose, collectionId, isEditMode = false, problemToEdit = null, showToast }: {isOpen:any, onClose:any, collectionId:any, isEditMode?:boolean, problemToEdit?:any, showToast?:any}) => {
  const [name, setName] = useState(isEditMode && problemToEdit ? problemToEdit.name : '');
  const [question, setQuestion] = useState(isEditMode && problemToEdit ? problemToEdit.question : '');
  const [solution, setSolution] = useState(isEditMode && problemToEdit ? problemToEdit.solution : '');
  const [difficulty, setDifficulty] = useState(isEditMode && problemToEdit ? problemToEdit.difficulty : 'Easy');
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setName(isEditMode && problemToEdit ? problemToEdit.name : '');
    setQuestion(isEditMode && problemToEdit ? problemToEdit.question : '');
    setSolution(isEditMode && problemToEdit ? problemToEdit.solution : '');
    setDifficulty(isEditMode && problemToEdit ? problemToEdit.difficulty : 'Easy');
  }, [isOpen]);

  const mutation = useMutation(
    async (problemData: any) => {
      onClose(); 
      const url = isEditMode ? `/api/updateProblem?problemId=${problemToEdit.id}` : '/api/createProblem';
      const method = isEditMode ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problemData),
      });
      if (!response.ok) throw new Error('Failed to submit problem');
      return response.json();
    },
    {
      onSuccess: () => {
        // Invalidate and refetch problems list
        queryClient.invalidateQueries(['collectionProblems', collectionId]);
        queryClient.invalidateQueries(['allProblems', user?.email]); // for dashboard numbers 
        queryClient.invalidateQueries(['dueTodayProblems', user?.email]); // for the ProblemQueue 
        showToast(
          <>
            <span className="inline-block mr-2 bg-success rounded-full" style={{ width: '10px', height: '10px' }}></span>
            {isEditMode ? 'Problem updated successfully' : 'Problem created successfully'}
          </>
        );
      },
      onError: (error: any) => {
        console.error('Failed to submit problem:', error);
        // Optionally, show an error toast
      },
    }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({
      name,
      question,
      solution,
      difficulty,
      collectionId,
    });
  };

  const modalClass = isOpen ? "modalEnter" : "";

  return (
    <div className={`${isOpen ? '' : 'hidden'} fixed inset-0 bg-base_100 bg-opacity-50 overflow-y-auto h-full w-full z-10`}>
      <div className={`relative top-0 mx-auto p-5 w-96 shadow-lg rounded-md bg-white dark:bg-base_100 ${modalClass}`}>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-neutral dark:text-white">{isEditMode ? 'Edit Problem' : 'New Problem'}</h3>
          <div className="mt-2 px-7 py-3">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral dark:text-white">Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 block w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral dark:text-white">Question:</label>
                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 block w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral dark:text-white">Solution:</label>
                <textarea value={solution} onChange={(e) => setSolution(e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 block w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral dark:text-white">Difficulty:</label>
                <div className="flex justify-start gap-4 mt-2 text-neutral dark:text-white">
                  <label className="inline-flex items-center">
                    <input type="radio" value="Easy" name="difficulty" checked={difficulty === 'Easy'} onChange={(e) => setDifficulty(e.target.value)} className="form-radio" />
                    <span className="ml-2">Easy</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" value="Medium" name="difficulty" checked={difficulty === 'Medium'} onChange={(e) => setDifficulty(e.target.value)} className="form-radio" />
                    <span className="ml-2">Medium</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" value="Hard" name="difficulty" checked={difficulty === 'Hard'} onChange={(e) => setDifficulty(e.target.value)} className="form-radio" />
                    <span className="ml-2">Hard</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={onClose} className="inline-flex justify-center items-center gap-x-3 text-center bg-error border border-error text-neutral text-lg font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-1 px-4 dark:focus:ring-offset-gray-800 transition-transform duration-200 hover:scale-95">
                  Close
                </button>
                <button type="submit" onClick={handleSubmit} disabled={!name.trim() || !question.trim() || !solution.trim()}    className={`inline-flex justify-center items-center gap-x-3 text-center ${!name.trim() || !question.trim() || !solution.trim() || !difficulty.trim() ? 'bg-disabled border border-disabled text-disabledText' : 'bg-success border border-success'} text-neutral text-lg font-medium rounded-md focus:outline-none focus:ring-1 py-1 px-4 transition-transform duration-200 hover:scale-95`}>
                  {isEditMode ? 'Update' : 'Create'}  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemModal;
