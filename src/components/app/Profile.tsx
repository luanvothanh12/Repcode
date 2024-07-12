import { useState, useContext } from 'react';
import { auth } from '../../firebaseConfig';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AuthContext } from '@/auth/AuthContext';
import Link from 'next/link';
import Accordion from './Accordian';


const Profile = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const fetchUserSettings = async () => {
        if (!user) throw new Error("No user found");
        const response = await fetch(`/api/getUserSettings?userEmail=${user.email}`);
        if (!response.ok) throw new Error("Failed to fetch user settings");
        return response.json();
    };

    const { isLoading, data, error } = useQuery(['userSettings', user?.email], fetchUserSettings, {
        enabled: !!user, 
    });

    if (error) return <div>Error: {(error as Error).message}</div>;
    if (isLoading || !data) {
      return (
        <div className="flex justify-center items-center h-screen h-full">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-base_100 animate-spin dark:text-base_100 fill-load"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
   
    return (
      <>
      <div className="bg-tertiary text-secondary text-center p-8 rounded-md">
        <p>Account email: {user?.email}</p>
        <p>Membership type: {data?.membershipType === 'free' ? 'Free' : 'Paid Member (view specific plan by clicking the View button below)'}</p>
        <p>
          Invoice/Payment History: 
          <button 
            onClick={() => window.open('https://billing.stripe.com/p/login/bIY4gj80X3Q93LO5kk', '_blank')} 
            className="ml-2 px-4 py-2 bg-blue text-white rounded-md"
          >
            View
          </button>
        </p>
      </div>

      <div className="mt-8">
        <Accordion title="How do I cancel if I've purchased a monthly membership?" content="Simply click the View button above and then enter the email associated with the account you purchased membership for to receive a link to that email that will take you to your billing portal, where you can then cancel your membership." />
        <Accordion title="What are the different memebrship types?" content="Your membership type will either show as Free or Paid. If it shows as Free, you are currently on the Free plan, if it shows as paid, you have purchased either a monthly or lifetime subscription. " />
        <Accordion title="How do I upgrade my membership type?" content="To upgrade your membership, go to repcode.io/pricing." />
      </div>


          
      </>
    );
};

export default Profile;