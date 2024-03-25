import React from 'react';
import Link from 'next/link'; 

const Logo = () => {
  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-white before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:bg-base_100">
  <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

    <div className="flex justify-center">
      <a className="inline-flex items-center gap-x-2 bg-neutral border border-neutral text-lg text-white p-1 ps-3 rounded-full transition transition-transform duration-200 hover:scale-95 dark:bg-white dark:text-neutral" href="#">
        NEW UPDATES - see what&apos;s new! 
        <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>
    </div>



    <div className="mt-5 max-w-3xl text-center mx-auto">
      <h1 className="block font-bold text-neutral text-5xl md:text-5xl lg:text-6xl dark:text-white">
        Practice coding <br /> the right way
      </h1>
    </div>


    <div className="mt-5 max-w-3xl text-center mx-auto">
      <p className="text-lg text-primary2 dark:text-primary">Repcode.io is an open-source, completely free to use tool to help you learn programming at a pace that&apos;s tailored to you. Think Anki, but for Leetcode.</p>
    </div>


    <div className="mt-8 gap-3 flex justify-center">
    <Link className="inline-flex justify-center items-center gap-x-3 text-center bg-pop2 text-neutral text-lg font-medium rounded-md focus:ring-1 py-3 px-4 transition-transform duration-200 hover:scale-95 dark:bg-pop" href="/home/SignInUp">
      Get started
      <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </Link>
  </div>


  </div>
</div>
  );
};

export default Logo;