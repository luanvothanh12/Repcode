import React, { useContext } from 'react';
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
    <div className="flex flex-col min-h-screen bg-base_100 text-primary">
      <NavBar />
      <div className="w-full mx-auto px-5 py-10 mb-5">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 text-white">Pricing</h1>
          <h3 className="text-xl font-medium mb-5 text-gray-400">Take your <span className='text-pop'>Leetcoding skills</span> to the <span className='text-pop'>next level</span> - explore our different membership options and their benefits below.</h3>
        </div>
        <div className="max-w-4xl mx-auto md:flex">
          <div className="w-full md:w-1/3 bg-cards p-6 mb-5 md:mb-0 rounded-lg shadow-lg text-center mr-8">
            <h2 className="text-xl font-bold mb-4 text-white">Free</h2>
            <p className="text-5xl font-bold text-white">$0</p>
            <p className="mt-2 mb-4 text-secondary">per month</p>
            <ul className="mb-6 space-y-2 text-left">
              <li className="flex items-center space-x-2"><span className="material-icons">check</span> 3 collections</li>
              <li className="flex items-center space-x-2"><span className="material-icons">check</span> 10 problems per collection</li>
              <li className="flex items-center space-x-2"><span className="material-icons">check</span> AI feedback</li>
              <li className="flex items-center space-x-2"><span className="material-icons">check</span> Full access to Study Mode</li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 bg-cards p-6 mb-5 md:mb-0 rounded-lg shadow-lg text-center mr-8">
            <h2 className="text-xl font-bold mb-4 text-warning">Pro</h2>
            <p className="text-5xl font-bold text-white">$3.99</p>
            <p className="mt-2 mb-4 text-secondary">per month</p>
            <ul className="mb-14 space-y-2 text-left">
              <li className="flex items-center space-x-2"><span className="material-icons text-warning">check</span> Unlimited collections</li>
              <li className="flex items-center space-x-2"><span className="material-icons text-warning">check</span> Unlimited problems</li>
              <li className="flex items-center space-x-2"><span className="material-icons text-warning">check</span> Priority customer support</li>
              <li className="flex items-center space-x-2"><span className="material-icons text-warning">check</span> Access to all future features</li>
              <li className="flex items-center space-x-2"><span className="material-icons">check</span> AI feedback</li>
              <li className="flex items-center space-x-2"><span className="material-icons">check</span> Full access to Study Mode</li>
            </ul>
            <button onClick={handleBuyNowPro} className="font-bold bg-pop transition-transform duration-200 hover:scale-95 text-neutral rounded-md px-10 py-2 w-full">Buy Now</button>
          </div>
          <div className="w-full md:w-1/3 bg-cards p-6 mb-5 md:mb-0 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-new">Lifetime</h2>
            <p className="text-5xl font-bold text-white">$39.99</p>
            <p className="mt-2 mb-4 text-secondary">one time</p>
            <ul className="mb-6 space-y-2 text-left">
              <li className="flex items-center space-x-2"><span className="material-icons text-new">check</span> Pay only once</li>
              <li className="flex items-center space-x-2"><span className="material-icons text-warning">check</span> Unlimited collections</li>
              <li className="flex items-center space-x-2"><span className="material-icons text-warning">check</span> Unlimited problems</li>
              <li className="flex items-center space-x-2"><span className="material-icons text-warning">check</span> Priority customer support</li>
              <li className="flex items-center space-x-2"><span className="material-icons text-warning">check</span> Access to all future features</li>
              <li className="flex items-center space-x-2"><span className="material-icons">check</span> AI feedback</li>
              <li className="flex items-center space-x-2"><span className="material-icons">check</span> Full access to Study Mode</li>
            </ul>
            <button onClick={handleBuyNowLifetime} className="font-bold bg-pop transition-transform duration-200 hover:scale-95 text-neutral rounded-md px-10 py-2 w-full">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="mr-4 ml-4 mb-10">
        <Accordion title="Are there refunds?" content="Yes! We offer a one-time, no questions asked full refund for up to 14 days for both monthly and lifetime purchases. Contact repcodebusiness@gmail.com." />
        <Accordion title="What happens if I revert back to a Free tier membership?" content="You will retain access to all collections and problems you have made, but you will not be able to make more if you have exceeded the free tier limit, until you upgrade your membership once more." />
        <Accordion title="How do I cancel if I've purchased a monthly membership?" content="Log into the account you have purchased the membership for, then navigate to the Profile/Billing section on the sidebar and press the View button to receive a link to your payment portal. Follow the instructions there to cancel." />
        <Accordion title="There's an issue with my membership. Who do I contact?" content="For issues relating to billing/membership, please contact repcodebusiness@gmail.com." />
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
