import React from 'react';
import Link from 'next/link'; 

const Logo = () => {
  return (
    <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-base_100 before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
  <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">

    <div className="flex justify-center">
      <a className="inline-flex items-center gap-x-2 bg-neutral border border-neutral text-lg text-success p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 transition-transform duration-200 hover:scale-95" href="#">
        NEW UPDATES - see what's new! 
        <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>
    </div>



    <div className="mt-5 max-w-3xl text-center mx-auto">
      <h1 className="block font-bold text-white text-5xl md:text-5xl lg:text-6xl dark:text-gray-200">
        Practice coding <br /> the right way
      </h1>
    </div>


    <div className="mt-5 max-w-3xl text-center mx-auto">
      <p className="text-lg text-primary dark:text-gray-400">Flashcode is an open-source, completely free to use tool to help you learn programming at a pace that's tailored to you. Think Anki, but for Leetcode.</p>
    </div>


    <div className="mt-8 gap-3 flex justify-center">
    <a className="inline-flex justify-center items-center gap-x-3 text-center bg-pop border border-transparent text-neutral text-lg font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800 transition-transform duration-200 hover:scale-95" href="/home/SignInUp">
      Get started
      <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </a>
  </div>


  </div>
</div>
  );
};

export default Logo;