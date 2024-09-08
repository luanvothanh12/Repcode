import React, { useState } from 'react';

const Rundown = () => {
  const [selectedTab, setSelectedTab] = useState<'Learn' | 'Track' | 'Practice'>('Learn');

  const tabs = {
    Learn: {
      description: 'Go through a roadmap like Neetcode 150 to get an idea of different data structures and patterns.',
      imageUrl: '/learn.png', 
    },
    Track: {
      description: 'As you solve different problems, log them in a collection with with your own notes and commented solutions.',
      imageUrl: '/track.png',
    },
    Practice: {
      description: `Use a scientifically proven spacial repition algorithm to ensure you don't forget what you've learned.`,
      imageUrl: '/practice.png',
    },
  };

  const currentTab = tabs[selectedTab];

  return (
    <div className="bg-base_100 p-8 text-primary m-0 mb-10">
      <h2 className="text-center text-3xl font-bold mb-4">Practice Leetcode <span className='text-pop'>the right way.</span></h2>
      
      <div className="flex justify-center mb-4">
        <button 
          onClick={() => setSelectedTab('Learn')}
          className={`px-10 py-2  ${selectedTab === 'Learn' ? 'bg-pop text-neutral font-bold' : 'bg-hover text-disabledText'} `}
        >
          Learn
        </button>
        <button 
          onClick={() => setSelectedTab('Track')}
          className={`px-10 py-2  ${selectedTab === 'Track' ? 'bg-pop text-neutral font-bold' : 'bg-hover text-disabledText'} `}
        >
          Track
        </button>
        <button 
          onClick={() => setSelectedTab('Practice')}
          className={`px-10 py-2  ${selectedTab === 'Practice' ? 'bg-pop text-neutral font-bold' : 'bg-hover text-disabledText'} `}
        >
          Practice
        </button>
      </div>
      
      <p className="text-center mb-8 text-secondary text-xl">{currentTab.description}</p>
      
      <div className="flex justify-center mb-8">
        <img src={currentTab.imageUrl} alt={`${selectedTab} image`} className="rounded-lg shadow-md w-1/2 h-auto border border-divide" />
      </div>
      
    </div>
  );
};

export default Rundown;
