import React from 'react';

const MoreInfo = () => {
  return (
    <div className="mx-4 md:mx-8 lg:mx-16"> {/* Adjusts the space between the edge of the screen and the content */}
      {/* Section 1: Image on the left, header and text on the right */}
      <div className="flex flex-row items-center justify-center py-10">
        <div className="w-1/2 px-2"> 
          <video className="max-w-xl mx-auto rounded-xl" autoPlay loop muted>
            <source src="/vid1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="w-1/2 text-center pl-5">
          <h2 className="text-2xl font-bold text-neutral dark:text-white">Create and Organize Problems</h2>
          <p className="text-primary2 dark:text-primary">Create collections to hold as many problems as you'd like, and customize every aspect of them to your heart's content</p>
        </div>
      </div>

      {/* Section 2: Image on the right, header and text on the left */}
      <div className="flex flex-row-reverse items-center justify-center py-10">
        <div className="w-1/2 px-2"> 
        <video className="max-w-xl mx-auto rounded-xl" autoPlay loop muted>
            <source src="/vid2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>        
        </div>
        <div className="w-1/2 text-center pr-5">
          <h2 className="text-2xl font-bold text-neutral dark:text-white">Custom Coding-Friendly Interface</h2>
          <p className="text-primary2 dark:text-primary">Practice your whiteboarding skills by solving problems in an integrated code editor that supports syntax highlighting for 5 different languages</p>
        </div>
      </div>

      {/* Section 3: Image on the left, header and text on the right */}
      <div className="flex flex-row items-center justify-center py-10">
        <div className="w-1/2 px-2">
        <video className="max-w-xl mx-auto rounded-xl" autoPlay loop muted>
            <source src="/vid3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>   
        </div>
        <div className="w-1/2 text-center pl-5">
          <h2 className="text-2xl font-bold text-neutral dark:text-white">Scientifically Backed Spatial Repetition Algorithm</h2>
          <p className="text-primary2 dark:text-primary">Every day, solve only the problems you need to so your brain learns new strategies and reinforces key concepts in the most effective way possible</p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;