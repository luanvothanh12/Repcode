import React from 'react';

const Description = () => {
  return (
    
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
    <div>
      <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl">
      <span className="material-icons text-neutral">timeline</span> 
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white">Personalized</h3>
        <p className="mt-1 text-primary">Tailor your learning experience with our algorithm that adapts to your strengths and weaknesses</p>
      </div>
    </div>

    <div>
      <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl">
        <svg className="flex-shrink-0 w-6 h-6 text-neutral" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white">Intuitive</h3>
        <p className="mt-1 text-primary">Navigate through a clean and straightforward UI designed to enhance your learning journey</p>
      </div>
    </div>

    <div>
      <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl">
        <svg className="flex-shrink-0 w-6 h-6 text-neutral" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white">Documented</h3>
        <p className="mt-1 text-primary">Read our extensive guides for how to navigate and use every aspect of the application</p>
      </div>
    </div>

    <div>
      <div className="relative flex justify-center items-center w-12 h-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl">
        <svg className="flex-shrink-0 w-6 h-6 text-neutral" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-white">Iterative</h3>
        <p className="mt-1 text-primary">Frequent updates with new features based on what users like you want</p>
      </div>
    </div>

  </div>
</div>

  );
};

export default Description; 