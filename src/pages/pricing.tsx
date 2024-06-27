import React, { useState, useContext } from 'react';
import NavBar from '@/components/home/NavBar';
import { AuthContext } from '@/auth/AuthContext';
import { loadStripe } from '@stripe/stripe-js';

import '../app/globals.css';

const Pricing = () => {
  const { user } = useContext(AuthContext);

  const handleBuyNow = () => {
    window.open('https://buy.stripe.com/eVag2J3xI0w1cdq8ww', '_blank'); // Replace with your Stripe payment link
  };

  return (
    <div className="fixed inset-0 bg-base_100 bg-opacity-75 overflow-y-auto h-full w-full z-10">
      <NavBar />
      <div className="w-full mx-auto bg-base_100 px-5 py-10 text-gray-600 mb-10">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-5">Pricing</h1>
          <h3 className="text-xl font-medium mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit repellat dignissimos laboriosam odit accusamus porro</h3>
        </div>
        <div className="max-w-4xl mx-auto md:flex">
          <div className="w-full md:w-1/3 md:max-w-none bg-nav px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
            <div className="w-full flex-grow">
              <h2 className="text-center font-bold uppercase mb-4">Free Tier</h2>
              <h3 className="text-center font-bold text-4xl mb-5">$0/mo</h3>
              <ul className="text-sm px-5 mb-8">
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> 4 collections</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> 10 problems per collection</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> AI feedback</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Full access to spatial repetition mode</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 md:max-w-none bg-nav px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:mb-0 rounded-md shadow-lg shadow-gray-600 md:relative md:z-50 md:flex md:flex-col">
            <div className="w-full flex-grow">
              <h2 className="text-center font-bold uppercase mb-4">Pro</h2>
              <h3 className="text-center font-bold text-4xl md:text-5xl mb-5">$3.99/mo</h3>
              <ul className="text-sm px-5 mb-8">
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Unlimited collections</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Unlimited problems per collection</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> AI feedback</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Full access to Study Mode</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Priority customer support</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> +Full access to future features</li>
              </ul>
            </div>
            <div className="w-full">
              <button onClick={handleBuyNow} className="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">Buy Now</button>
            </div>
          </div>
          <div className="w-full md:w-1/3 md:max-w-none bg-nav px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
            <div className="w-full flex-grow">
              <h2 className="text-center font-bold uppercase mb-4">Lifetime</h2>
              <h3 className="text-center font-bold text-4xl mb-5">$39.99/one time</h3>
              <ul className="text-sm px-5 mb-8">
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Pay only once</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Unlimited collections</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Unlimited problems per collection</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> AI feedback</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Full access to Study Mode</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> Priority customer support</li>
                <li className="leading-tight"><span className="material-icons text-neutral">check</span> +Full access to future features</li>
              </ul>
            </div>
            <div className="w-full">
              <button className="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
