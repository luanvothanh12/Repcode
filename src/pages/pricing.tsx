import React, { useState, useContext } from 'react';
import NavBar from '@/components/home/NavBar';
import Footer from '@/components/home/Footer';
import { AuthContext } from '@/auth/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import Accordion from '@/components/app/Accordian';
import '../app/globals.css';

const Pricing = () => {
  const { user } = useContext(AuthContext);

  const handleBuyNowPro = () => {
    window.open('https://buy.stripe.com/eVag2J3xI0w1cdq8ww', '_blank'); // Replace with your Stripe payment link
  };

  const handleBuyNowLifetime = () => {
    window.open('https://buy.stripe.com/eVa8Ah7NYceJa5ifZ0', '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen bg-base_100">
      <NavBar />
      <div className="w-full mx-auto bg-base_100 px-5 py-10 mb-5">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 text-primary">Pricing</h1>
          <h3 className="text-xl font-medium mb-5 text-secondary">Take your Leetcoding skills to the next level. Explore our different membership options and their benefits below. </h3>
        </div>
        <div className="max-w-4xl mx-auto md:flex">
          <div className="w-full md:w-1/3 md:max-w-none bg-cards px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
            <div className="w-full flex-grow">
              <h2 className="text-center font-bold uppercase mb-4 text-primary">Free Tier</h2>
              <h3 className="text-center font-bold text-4xl mb-5 text-primary">$0/mo</h3>
              <ul className="text-sm px-5 mb-8 text-primary">
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> 3 collections</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> 10 problems per collection</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> AI feedback</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Full access to Study Mode</li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/3 md:max-w-none bg-cards px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:mb-0 rounded-md shadow-lg shadow-gray-600 md:relative md:z-10 md:flex md:flex-col">
            <div className="w-full flex-grow">
              <h2 className="text-center font-bold uppercase mb-4 text-primary">Pro</h2>
              <h3 className="text-center font-bold text-4xl md:text-5xl mb-5 text-primary">$3.99/mo</h3>
              <ul className="text-sm px-5 mb-8 text-primary">
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Unlimited collections</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> 20 problems per collection</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> AI feedback</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Full access to Study Mode</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Priority customer support</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Full access to all future features</li>
              </ul>
            </div>
            <div className="w-full">
              <button onClick={handleBuyNowPro} className="font-bold bg-pop transition-transform duration-200 hover:scale-95 text-neutral rounded-md px-10 py-2 w-full">Buy Now</button>
            </div>
          </div>
          <div className="w-full md:w-1/3 md:max-w-none bg-cards px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
            <div className="w-full flex-grow">
              <h2 className="text-center font-bold uppercase mb-4 text-primary">Lifetime</h2>
              <h3 className="text-center font-bold text-4xl mb-5 text-primary">$39.99/one time</h3>
              <ul className="text-sm px-5 mb-8 text-primary">
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Pay only once</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Unlimited collections</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> 20 problems per collection</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> AI feedback</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Full access to Study Mode</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Priority customer support</li>
                <li className="leading-tight"><span className="material-icons text-secondary">check</span> Full access to all future features</li>
              </ul>
            </div>
            <div className="w-full">
            <button onClick={handleBuyNowLifetime} className="font-bold bg-pop transition-transform duration-200 hover:scale-95 text-neutral rounded-md px-10 py-2 w-full">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mr-4 ml-4 mb-10">
        <Accordion title="Are there refunds?" content="Yes! We offer a one-time, no questions asked full refund for up to 14 days for both monthly and lifetime purchases. Contact repcodebusiness@gmail.com." />
        <Accordion title="How do I cancel if I've purchased a monthly membership?" content="Log into the account you have purchased the membership for, then navigate to the Profile/Billing section on the sidebar and press the View button to receive a link to your payment portal. Follow the instructions there to cancel." />
        <Accordion title="There's an issue with my membership. Who do I contact?" content="For issues relating to billing/membership, please contact repcodebusiness@gmail.com." />
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
