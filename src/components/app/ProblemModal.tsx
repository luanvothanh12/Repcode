import React, { useState, useEffect } from 'react';

const ProblemModal = ({ isOpen, onClose, collectionId, setProblems, isEditMode = false, problemToEdit = null }: {isOpen:any, onClose:any, collectionId:any, setProblems:any, isEditMode?:boolean, problemToEdit?:any}) => {
  const [name, setName] = useState(isEditMode && problemToEdit ? problemToEdit.name : '');
  const [question, setQuestion] = useState(isEditMode && problemToEdit ? problemToEdit.question : '');
  const [solution, setSolution] = useState(isEditMode && problemToEdit ? problemToEdit.solution : '');
  const [difficulty, setDifficulty] = useState(isEditMode && problemToEdit ? problemToEdit.difficulty : 'EASY');

  useEffect(() => {
    if (isEditMode && problemToEdit) {
      setName(problemToEdit.name);
      setQuestion(problemToEdit.question);
      setSolution(problemToEdit.solution);
      setDifficulty(problemToEdit.difficulty);
    } else {
      // Reset fields if not in edit mode or problemToEdit is null
      setName('');
      setQuestion('');
      setSolution('');
      setDifficulty('EASY');
    }
  }, [isEditMode, problemToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e:any) => {
    e.preventDefault(); 
    const url = isEditMode ? `/api/updateProblem?problemId=${problemToEdit.id}` : '/api/createProblem';
    const method = isEditMode ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          question,
          solution,
          difficulty,
          collectionId, 
        }),
      });

      if (response.ok) {
        const newProblem = await response.json(); // Assuming your API returns the created problem
        setProblems((prevProblems:any) => [...prevProblems, newProblem]); // Update the list
        onClose();
        
      } else {
        console.error('Failed to create problem');
      }
    } catch (error) {
      console.error('Failed to submit problem:', error);
    }
  };

  return (
<div className={`${isOpen ? '' : 'hidden'} fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}>
  <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-neutral">
    <div className="mt-3 text-center">
      <h3 className="text-lg leading-6 font-medium text-white">{isEditMode ? 'Edit Problem' : 'New Problem'}</h3>
      <div className="mt-2 px-7 py-3">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 block w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Question:</label>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 block w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Solution:</label>
            <textarea value={solution} onChange={(e) => setSolution(e.target.value)} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 block w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Difficulty:</label>
            <div className="flex justify-start gap-4 mt-2 text-white">
              <label className="inline-flex items-center">
                <input type="radio" value="EASY" name="difficulty" checked={difficulty === 'EASY'} onChange={(e) => setDifficulty(e.target.value)} className="form-radio" />
                <span className="ml-2">Easy</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="MEDIUM" name="difficulty" checked={difficulty === 'MEDIUM'} onChange={(e) => setDifficulty(e.target.value)} className="form-radio" />
                <span className="ml-2">Medium</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="HARD" name="difficulty" checked={difficulty === 'HARD'} onChange={(e) => setDifficulty(e.target.value)} className="form-radio" />
                <span className="ml-2">Hard</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-error">
              Close
            </button>
            <button type="submit" onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-success">
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