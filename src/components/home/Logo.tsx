import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="dark:bg-base_100 relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-white before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="flex justify-center items-center min-h-screen py-16">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              {/* <div className="flex justify-center">
                <Link className="inline-flex items-center gap-x-2 bg-primary border border-neutral text-lg text-neutral p-1 ps-3 rounded-full transition transition-transform duration-200 hover:scale-95" href="/changelog">
                  NEW UPDATES - see what&apos;s new!
                  <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full font-semibold text-sm">
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </span>
                </Link>
              </div> */}
              <div className="mt-5 max-w-6xl">
                <h1 className="block font-bold text-primary text-8xl md:text-5xl lg:text-6xl">
                  Your own personalized platform <br /> <span className="text-pop">to master Leetcode</span>
                </h1>
              </div>
              <div className="mt-8 mb-10 max-w-4xl">
                <p className="text-xl text-secondary">Everything you&apos;ll ever need to practice and master Leetcode-type questions, all in one place</p>
              </div>
              <div className="mt-5 flex justify-center gap-8">
                <div className="flex items-center gap-2">
                  <span className="material-icons transition text-primary" style={{ fontSize: '35px' }}>check</span>
                  <p className="text-2xl text-primary">Organize problems</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-primary" style={{ fontSize: '35px' }}>check</span>
                  <p className="text-2xl text-primary">Review via spatial repetition</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-primary" style={{ fontSize: '35px' }}>check</span>
                  <p className="text-2xl text-primary">Check your code with AI</p>
                </div>
              </div>
            </div>
            <div className="mt-4 gap-12 flex justify-center">
              <Link className="animated-button inline-flex justify-center items-center gap-x-2 text-center text-lg font-medium rounded-lg py-3 px-20 w-full transition-transform duration-200 hover:scale-95" href="/login">
                  <span>Get started</span>
              </Link>
              <Link className="inline-flex justify-center items-center text-primary bg-base_100 border border-secondary gap-x-2 text-center text-lg font-medium rounded-lg py-3 px-20 w-full transition-transform duration-200 hover:scale-95" href="/guide">
                <div className="whitespace-nowrap">
                  <span>Learn more &gt;</span>
                </div>
              </Link>
            </div>
            <div className="flex justify-center w-full">
              <video className="shadow-orange max-w-full md:max-w-4xl rounded-xl" src="/homeo.mp4" autoPlay loop muted playsInline></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;