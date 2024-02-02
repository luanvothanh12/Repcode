// Home page, entry point of the application 

import React from 'react';
import Logo from '@/components/home/Logo';
import Description from '@/components/home/Description';
import NavBar from '@/components/home/NavBar';

export default function Home() {
  return (
    <div>
      <NavBar />
    <div className="flex justify-center items-center h-screen"> 
        <Logo />
      </div>
      <Description /> 
    </div>
  );
}