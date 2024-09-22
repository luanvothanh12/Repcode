import React, { useState } from 'react';
import Link from 'next/link';

const List = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
        title: 'Analyze',
        content: 'Access comprehensive insights and detailed data on each problem you create, helping you identify strengths and weaknesses.',
        image: '/list/analytics.png',
    },
    {
        title: 'Organize',
        content: 'Effortlessly categorize and store your problems, keeping your learning process structured and easily accessible.',
        image: '/list/organize.png', 
    },
    {
        title: 'Prioritize',
        content: 'Based on your feedback, the spatial repetition algorithm will intelligently prioritize and schedule your next review session.',
        image: '/list/review.png',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-primary"><span className="text-pop">⚡Supercharge⚡</span> your Leetcode skills</h1>
        <p className="text-lg text-secondary mt-2">
          Effortlessly organize, review, and analyze your problem-solving progress <br /> with personalized insights and review intervals
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center w-full mb-16">
        {/* Image Section */}
        <div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
          <img
            src={items[activeIndex].image}
            alt={items[activeIndex].title}
            className="max-w-full h-auto mx-auto rounded-xl border border-divide"
          />
        </div>

        {/* Dropdown Section */}
        <div className="w-full md:w-1/2 px-2">
          {items.map((item, index) => (
            <div key={index} className="mb-4">
              <div
                className={`p-6 rounded-lg cursor-pointer ${
                  activeIndex === index ? 'bg-neutral' : 'bg-tertiary'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              </div>
              {activeIndex === index && (
                <div className="p-4 bg-neutral">
                  <p className="text-secondary mb-10">{item.content}</p>
                  <Link href="/login" className="inline-flex justify-center items-center gap-x-2 text-center bg-pop text-neutral text-lg font-medium rounded-md focus:ring-1 py-2 px-4 transition-transform duration-200 hover:scale-95">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;