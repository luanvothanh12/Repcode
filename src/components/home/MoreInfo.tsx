import React from 'react';

const MoreInfo = () => {
  return (
    <div className="mx-4 md:mx-8 lg:mx-16"> {/* Adjusts the space between the edge of the screen and the content */}
      {/* Section 1: Image on the left, header and text on the right */}
      <div className="flex flex-row items-center justify-center py-10">
        <div className="w-1/2 px-2"> {/* Adds horizontal padding */}
          {/* Placeholder for Image */}
          <img src="pattern1.svg" alt="Description" className="max-w-s mx-auto rounded-xl" /> {/* Makes the image smaller and centers it */}
        </div>
        <div className="w-1/2 text-center pl-5">
          <h2 className="text-2xl font-bold text-neutral dark:text-white">Header 1</h2>
          <p className="text-primary2 dark:text-primary">Some description text here for the first section.</p>
        </div>
      </div>

      {/* Section 2: Image on the right, header and text on the left */}
      <div className="flex flex-row-reverse items-center justify-center py-10">
        <div className="w-1/2 px-2"> {/* Adds horizontal padding */}
          {/* Placeholder for Image */}
          <img src="pattern1.svg" alt="Description" className="max-w-s mx-auto rounded-xl" /> {/* Makes the image smaller and centers it */}
        </div>
        <div className="w-1/2 text-center pr-5">
          <h2 className="text-2xl font-bold text-neutral dark:text-white">Header 2</h2>
          <p className="text-primary2 dark:text-primary">Some description text here for the second section.</p>
        </div>
      </div>

      {/* Section 3: Image on the left, header and text on the right */}
      <div className="flex flex-row items-center justify-center py-10">
        <div className="w-1/2 px-2"> {/* Adds horizontal padding */}
          {/* Placeholder for Image */}
          <img src="pattern1.svg" alt="Description" className="max-w-s mx-auto rounded-xl" />
        </div>
        <div className="w-1/2 text-center pl-5">
          <h2 className="text-2xl font-bold text-neutral dark:text-white">Header 3</h2>
          <p className="text-primary2 dark:text-primary">Some description text here for the third section.</p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;