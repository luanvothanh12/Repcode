import React, { useState } from 'react';

const ProblemModal = ({ isOpen, onClose, collectionId, setProblems  }: {isOpen:any, onClose:any, collectionId:any, setProblems:any}) => {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [solution, setSolution] = useState('');
  const [difficulty, setDifficulty] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Prevent the form from submitting traditionally
    try {
      const response = await fetch('/api/createProblem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          question,
          solution,
          difficulty,
          collectionId, // Include the collectionId in the request body
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', width: '500px' }}>
        <h2>Create New Problem</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Question:</label>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
          </div>
          <div>
            <label>Solution:</label>
            <textarea value={solution} onChange={(e) => setSolution(e.target.value)} />
          </div>
          <div>
            <label>Difficulty:</label>
            <div>
              <input type="radio" value="Easy" name="difficulty" checked={difficulty === 'Easy'} onChange={(e) => setDifficulty(e.target.value)} /> Easy
              <input type="radio" value="Medium" name="difficulty" checked={difficulty === 'Medium'} onChange={(e) => setDifficulty(e.target.value)} /> Medium
              <input type="radio" value="Hard" name="difficulty" checked={difficulty === 'Hard'} onChange={(e) => setDifficulty(e.target.value)} /> Hard
            </div>
          </div>
          <button type="button" onClick={onClose}>Close</button>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProblemModal; 