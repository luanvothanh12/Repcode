import React from 'react';

const MoreInfo = () => {
  return (
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-16"> {/* Adjusts the margin for different screen sizes */}
      {/* Section 1: Image on the left, header and text on the right */}
      <div className="flex flex-col md:flex-row items-center justify-center py-10">
        <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0"> 
          <video className="max-w-full h-auto mx-auto rounded-xl border border-divide" autoPlay loop muted>
            <source src="/vid1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-5">
          <h2 className="text-xl md:text-2xl font-bold text-white">Customize and Organize Problems</h2>
          <p className="text-primary mt-4 md:mt-2">Create collections to hold as many problems as you would like, and customize every aspect of them</p>
        </div>
      </div>

      {/* Section 2: Image on the right, header and text on the left */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center py-10">
        <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0"> 
          <video className="max-w-full h-auto mx-auto rounded-xl border border-divide" autoPlay loop muted>
              <source src="/vid2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>        
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:pr-5">
          <h2 className="text-xl md:text-2xl font-bold text-white">Custom Coding-Friendly Interface</h2>
          <p className="text-primary mt-4 md:mt-2">Practice your whiteboarding skills by solving problems in an integrated code editor that supports syntax highlighting for 5 different languages</p>
        </div>
      </div>

      {/* Section 3: Image on the left, header and text on the right */}
      <div className="flex flex-col md:flex-row items-center justify-center py-10">
        <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
          <video className="max-w-full h-auto mx-auto rounded-xl border border-divide" autoPlay loop muted>
              <source src="/vid3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>   
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-5">
          <h2 className="text-xl md:text-2xl font-bold text-white">Scientifically Backed Spatial Repetition Algorithm</h2>
          <p className="text-primary mt-4 md:mt-2">Every day, solve only the problems you need to so your brain learns new strategies and reinforces key concepts in the most effective way possible</p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
