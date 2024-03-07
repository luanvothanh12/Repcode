import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import '../../../../../app/globals.css'; 
import SideBar from '@/components/app/SideBar';
import nookies from "nookies"; 
import firebaseAdmin from "../../../../../../firebaseAdmin";
import Problem from '@/components/app/Problem';

const ProblemDetailPage = () => {
  const router = useRouter(); 
  const { collectionId, problemId } = router.query;

  const [problem, setProblem] = useState<{ name: string, question: string, difficulty: any, solution: any}>();
  const [collectionName, setCollectionName] = useState('');
  const [contentActive, setContentActive] = useState('question');
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {

    const fetchProblemDetails = async () => {
      if (problemId) {
        const problemResponse = await fetch(`/api/getProblemDetails?problemId=${problemId}`);
        if (problemResponse.ok) {
          const problemData = await problemResponse.json();
          setProblem(problemData);
        } else {
          console.error('Failed to fetch problem details');
        }
      }
    };

    const fetchCollectionName = async () => {
      if (collectionId) {
        const collectionResponse = await fetch(`/api/getCollectionDetails?collectionId=${collectionId}`);
        if (collectionResponse.ok) {
          const collectionData = await collectionResponse.json();
          setCollectionName(collectionData.title);
        } else {
          console.error('Failed to fetch collection name');
        }
      }
    };

    fetchProblemDetails();
    fetchCollectionName();
  }, [problemId, collectionId]);

  return (
    <>
      <div className="flex min-h-screen h-auto max-h-screen overflow-hidden bg-white dark:bg-base_100 transition-width duration-300">
        <SideBar />
        <div className="flex-grow p-8">
          <div className="text-neutral dark:text-white text-4xl font-bold mb-4 flex justify-center">:collections/{collectionName}/{problem?.name}</div>
            <hr className="border-feintwhite dark:border-divide mb-8 transition-width duration-300"/>
            <Problem
      problem={problem}
      contentActive={contentActive}
      setContentActive={setContentActive}
      editorContent={editorContent}
      setEditorContent={setEditorContent}
    />
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


export default ProblemDetailPage;
