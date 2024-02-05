import React, { useState } from 'react';

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isToggled, setIsToggled] = useState(false); // State for the toggle switch

  const toggleSwitch = () => setIsToggled(!isToggled);

  return (
    <div className={`h-100vh bg-base_100 border-r border-divide flex-shrink-0 transition-width duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Toggle button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="m-2 p-1 text-neutral rounded"
      >
                {/* Logo and text */}
                <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          {isExpanded && <span className="ml-2">Brand</span>}
        </div>
      </button>

      {/* Sidebar content */}
      <div className="px-4 py-2 flex flex-col items-center">
      <hr className="my-2 w-full text-divide" />
        
        {/* Icons and text */}
        <div className="w-full cursor-pointer">
        <div className="flex items-center my-2">
            <span className="material-icons text-5xl transition duration-300 ease-in-out hover:scale-110 text-white">home</span>
            {isExpanded && <span className="ml-2 text-lg text-white">Dashboard</span>}
        </div>
        <div className="flex items-center my-2">
          <span className="material-icons text-5xl transition duration-300 ease-in-out hover:scale-110 text-white">style</span>
          {isExpanded && <span className="ml-2">Collections</span>}
        </div>
        <div className="flex items-center my-2">
          <span className="material-icons text-5xl transition duration-300 ease-in-out hover:scale-110 text-success">sync</span>
          {isExpanded && <span className="ml-2">Random Easy</span>}
        </div>
        <div className="flex items-center my-2">
          <span className="material-icons text-5xl transition duration-300 ease-in-out hover:scale-110 text-warning">sync</span>
          {isExpanded && <span className="ml-2">Random Medium</span>}
        </div>
        <div className="flex items-center my-2">
          <span className="material-icons text-5xl transition duration-300 ease-in-out hover:scale-110 text-error">sync</span>
          {isExpanded && <span className="ml-2">Random Hard</span>}
        </div>
        <div className="flex items-center my-2">
          <span className="material-icons text-5xl transition duration-300 ease-in-out hover:scale-110 text-white">sync</span>
          {isExpanded && <span className="ml-2">Random Any</span>}
        </div>

        <div className="flex items-center my-2">
          <label htmlFor="toggleSwitch" className="flex items-center cursor-pointer">
            <div className="relative">
              {/* Toggle Line */}
              <input id="toggleSwitch" type="checkbox" className="sr-only" checked={isToggled} onChange={toggleSwitch} />
              {/* Switch */}
              <div className="block bg-primary w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isToggled ? 'transform translate-x-full bg-green-500' : 'bg-gray-300'}`}></div>
            </div>
            {isExpanded && <span className="ml-2">Dynamic Mode</span>}
          </label>
        </div>
      </div>
    </div>
        
          {/* Repeat for other icons as needed */}
    </div>

  );
};

export default SideBar;
