// Home page, entry point of the application 

import React, {useEffect} from 'react';
import Logo from '@/components/home/Logo';
import Description from '@/components/home/Description';
import NavBar from '@/components/home/NavBar';
import MoreInfo from '@/components/home/MoreInfo';
import ContactForm from '@/components/home/ContactForm';
import nookies from "nookies";
import firebaseAdmin from "../../firebaseAdmin"; 
import "../app/globals.css";

export default function Home() {

  return (
    <div className="bg-white dark:bg-base_100">
      <NavBar />
    <div className="flex justify-center items-center h-screen"> 
        <Logo />
      </div>
      <Description /> 
      <MoreInfo /> 
      <ContactForm />



    
    </div>
  );
}