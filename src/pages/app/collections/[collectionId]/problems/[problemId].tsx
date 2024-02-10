import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { auth } from '../../../../../firebaseConfig'; 
import '../../../../../app/globals.css'; 
import SideBar from '@/components/app/SideBar';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";

const ProblemDetailPage = () => {
  const router = useRouter();
  const { collectionId, problemId } = router.query;

  const [problem, setProblem] = useState<{ name: string, question: string, difficulty: any, solution: any}>();
  const [collectionName, setCollectionName] = useState('');
  const [contentActive, setContentActive] = useState('question');
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      //router.push('/home/SignInUp');
    }

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
  }, [problemId, collectionId, router]);

  if (!problem) return(
  <div>
          <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-grow p-8">
  <div className="text-white text-4xl font-bold mb-4 flex justify-center">:collections/{collectionName}</div>
  <hr className="border-divide mb-8"/>
  <div className="flex justify-center items-center h-full">
        <div className="animate-spin inline-block w-24 h-24 border-4 border-t-transparent border-white rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
  </div> 
  </div> 

  </div>
  )

  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-grow p-8">
  <div className="text-white text-4xl font-bold mb-4 flex justify-center">:collections/{collectionName}/{problem.name}</div>
  <hr className="border-divide mb-8"/>
  <div className="flex min-h-screen">
    <div className="flex-1 overflow-y-auto" style={{ maxHeight: '100vh' }}>
          {/* Buttons for toggling between question and solution */}
          <div className="mb-4">
      <button className={`mr-2 py-2 px-4 text-primary ${contentActive === 'question' ? 'border-b-2 border-divide' : 'border-b-2 border-base_100'}`} onClick={() => setContentActive('question')}>Problem</button>
      <button className={`mr-2 py-2 px-4 text-primary ${contentActive === 'solution' ? 'border-b-2 border-divide' : 'border-b-2 border-base_100'}`} onClick={() => setContentActive('solution')}>Solution</button>
    </div>
      {/* Left side content (The question) */}
      <div className="flex justify-between items-center text-white">
        <h1 className="text-xl font-bold">{problem.name}</h1>
        <span className="text-sm m-5">{problem.difficulty}</span>
      </div>
      {contentActive === 'question' ? (
                <p className="text-white mt-4 whitespace-pre-wrap">{problem.question}</p>
              ) : (
                <p className="text-white mt-4 whitespace-pre-wrap">{problem.solution}</p> // Assuming `solution` is part of your problem object
              )}
    </div>
    <div className="w-px bg-gray-800 min-h-full"></div> {/* Vertical line */}
    <div className="flex-1">
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
        style={{ height: '100vh', width: '100%' }} 
      />
    </div>
  </div>
</div>
      </div>
    </>
  );
};


export default ProblemDetailPage;
