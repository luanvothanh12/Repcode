import React from 'react';
import Link from 'next/link'; 

const Logo = () => {
  return (
    <div className="text-white p-8 rounded-lg mx-auto max-w-xl text-center">
      <img src="/logo.png" alt="Logo" className="mx-auto w-50" />
      <h1 className="text-4xl text-cream font-bold mt-2">Flashcode</h1>
      <p className="text-xl mt-1 mb-4">Code smarter, not harder</p>
      <div className="flex justify-center space-x-4"> {/* This div will contain the buttons and space them nicely */}
        <Link href='/home/SignInUp' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Get Started
        </Link>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          Guide
        </button>
      </div>
    </div>
  );
};

export default Logo;