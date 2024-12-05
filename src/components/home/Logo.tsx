import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="dark:bg-base_100 relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-white before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2">
      <div className="bg-[#FEF08A] text-[#854D0E] p-4 text-center font-semibold">
        In an effort to make this project open-source, some data related to authentication is being migrated/tested. You may experience login issues during this time. If you do, please try again in a few hours.
      </div>
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="flex flex-col justify-center items-center min-h-screen py-8"> {/* Adjusted to flex-col */}
          <div className="flex flex-col items-center gap-8"> {/* Ensures the content is centered */}
            <div className="text-center fade-in-up"> {/* Apply fade-in-up class */}
              <div className="max-w-6xl mx-auto"> {/* Added mx-auto for centering */}
                <h1 className="block font-bold text-primary text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-center">
                  Your personalized online notebook <br className="hidden lg:block" /> <span className="text-pop">for everything Leetcode</span>
                </h1>
              </div>
              <div className="mt-8 mb-10 max-w-4xl mx-auto px-4 sm:px-0 fade-in-up"> {/* Apply fade-in-up class */}
                <p className="text-xl text-secondary text-center">
                  Everything you&apos;ll ever need to practice and master Leetcode, all in one place
                </p>
              </div>

              {/* Updated section with card-like styling */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                <div className="bg-neutral p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    <span className="material-icons text-pop" style={{ fontSize: '40px' }}>code</span>
                  </div>
                  <h3 className="text-primary text-2xl font-semibold mb-2">Organize problems</h3>
                  <p className="text-secondary">Create collections to store and categorize your Leetcode problems</p>
                </div>

                <div className="bg-neutral p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    <span className="material-icons text-pop" style={{ fontSize: '40px' }}>sync</span>
                  </div>
                  <h3 className="text-primary text-2xl font-semibold mb-2">Review via spatial repetition</h3>
                  <p className="text-secondary">Optimize your learning using the SuperMemo spatial repitition algorithm</p>
                </div>

                <div className="bg-neutral p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    <span className="material-icons text-pop" style={{ fontSize: '40px' }}>lightbulb</span>
                  </div>
                  <h3 className="text-primary text-2xl font-semibold mb-2">AI-powered feedback</h3>
                  <p className="text-secondary">Get instant feedback on your solutions using advanced AI</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-12 justify-center">
              <Link className="animated-button inline-flex justify-center items-center gap-x-2 text-center text-lg font-medium rounded-lg py-3 px-20 w-full sm:w-auto transition-transform duration-200 hover:scale-95" href="/login">
                <span>Jump In - Free</span>
              </Link>
              <Link className="inline-flex justify-center items-center text-primary bg-base_100 border border-secondary gap-x-2 text-center text-lg font-medium rounded-lg py-3 px-20 w-full sm:w-auto transition-transform duration-200 hover:scale-95" href="/guide">
                <div className="whitespace-nowrap">
                  <span>Learn more &gt;</span>
                </div>
              </Link>
            </div>
            <div className="flex justify-center w-full px-4 sm:px-0">
            <iframe
                className="shadow-orange max-w-full md:max-w-4xl rounded-xl"
                width="900"
                height="455"
                src="https://www.youtube.com/embed/rnvFQ3G3ndo?autoplay=1&controls=0&mute=1&loop=1&playlist=rnvFQ3G3ndo"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
