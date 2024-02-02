import React from 'react';
import Link from 'next/link'; 


const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-2 fixed w-full z-10 top-0 bg-backdrop border-b border-gray-200">
      <div className="flex items-center flex-shrink-0 text-white">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <span className="font-semibold text-lg text-cream tracking-tight">Flashcode</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <a href="#guide" className="px-4 py-2 text-white hover:text-teal-200">
          Guide
        </a>
        <a href="#changelog" className="px-4 py-2 text-white hover:text-teal-200">
          Changelog
        </a>
        <a href="#github" className="px-4 py-2 text-white hover:text-teal-200">
          Github
        </a>
        <Link href="/home/SignInUp" className="px-4 py-2 text-white hover:text-teal-200">Sign in</Link>
      </div>
    </nav>
  );
};

export default NavBar;