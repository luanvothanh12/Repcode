// Home page, entry point of the application 

import React, { useEffect } from 'react';
import Logo from '@/components/home/Logo';
import Description from '@/components/home/Description';
import NavBar from '@/components/home/NavBar';
import MoreInfo from '@/components/home/MoreInfo';
import ContactForm from '@/components/home/ContactForm';
import BackgroundDots from '@/components/home/BackgroundDots';
import Footer from '@/components/home/Footer';
import nookies from "nookies";
import firebaseAdmin from "../../firebaseAdmin"; 
import "../app/globals.css";

export default function Home() {

  return (
    <div className="bg-base_100 relative">
      <NavBar />
      <BackgroundDots size={122} spacing={15} opacity={0.3} />
      <div className="flex justify-center items-center min-h-screen">
        <Logo />
      </div>
      <MoreInfo />
      <Description />  
      <ContactForm />
      <Footer />
    </div>
  );
}