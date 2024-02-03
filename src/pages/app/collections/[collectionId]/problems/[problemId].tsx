// pages/app/collections/[collectionId]/problems/[problemId].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { auth } from '../../../../../firebaseConfig'

const ProblemDetailPage = () => {
  const router = useRouter();
  const { collectionId, problemId } = router.query;

  // State to hold the problem details
  const [problem, setProblem] = useState<{name:any, question:any}>();

  // Fetch problem details from your API
  useEffect(() => {
    if(!auth.currentUser)
    {
      router.push('/home/SignInUp');
    }
    if (problemId) {
      // Replace this URL with your actual API endpoint
      fetch(`/api/getProblemDetails?problemId=${problemId}`)
        .then(response => response.json())
        .then(data => setProblem(data))
        .catch(error => console.error('Failed to fetch problem details:', error));
    }
  }, [problemId]);

  if (!problem) return <div>Loading...</div>;

  return (
    <div>
      <h1>{problem.name}</h1>
      <p>{problem.question}</p>
      {/* Render more problem details here */}
    </div>
  );
};

export default ProblemDetailPage;
