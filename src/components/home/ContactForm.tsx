import React, { useState, useEffect, useContext } from 'react';
import Toast from '../app/Toast';
import { useForm, ValidationError } from '@formspree/react';
import Link from 'next/link'; 

const ContactForm = () => {
    const [state, handleSubmit] = useForm("xkndvdrp"); 
    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);

    const showToast = (message: any) => {
        setToastMessage(message);
        setIsToastVisible(true);
        setTimeout(() => setIsToastVisible(false), 3000); // Hide after 3 seconds
      };


      useEffect(() => {
        if (state.succeeded) {
            showToast(
                <>
                  <span className="inline-block mr-2 bg-success rounded-full" style={{ width: '10px', height: '10px' }}></span>
                  {'Success, I will read it soon, thanks :)'}
                </>
            );
        }
    }, [state.succeeded]);

    return (
      <div id="contact" className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <Toast message={toastMessage} isVisible={isToastVisible} />
          <div className="max-w-xl mx-auto">
              <div className="text-center">
                  <h1 className="text-3xl font-bold text-primary sm:text-4xl">
                      Contact us
                  </h1>
                  <p className="mt-1 text-secondary">
                      Questions? Bugs? Want to contribute? Let us know!
                  </p>
              </div>
          </div>

          <div className="mt-12 max-w-lg mx-auto">
              <div className="flex flex-col bg-tertiary rounded-md shadow-lg p-4 sm:p-6 lg:p-8">
                  <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 lg:gap-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                              <div>
                                  <label className="block text-sm mb-2 text-primary">First Name</label>
                                  <input type="text" name="hs-firstname-contacts-1" id="hs-firstname-contacts-1" className="py-3 px-4 block w-full border border-neutral rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" />
                              </div>
                              <div>
                                  <label className="block text-sm mb-2 text-primary">Last Name</label>
                                  <input type="text" name="hs-lastname-contacts-1" id="hs-lastname-contacts-1" className="py-3 px-4 block w-full border border-neutral rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" />
                              </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                              <div>
                                  <label className="block text-sm mb-2 text-primary">Email</label>
                                  <input type="email" name="hs-email-contacts-1" id="hs-email-contacts-1" className="py-3 px-4 block w-full border border-neutral rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" />
                              </div>
                          </div>
                          <div>
                              <label className="block text-sm mb-2 text-primary">Details</label>
                              <textarea id="hs-about-contacts-1" name="hs-about-contacts-1" rows={4} className="py-3 px-4 block w-full border border-neutral rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"></textarea>
                          </div>
                      </div>
                      <div className="mt-6 grid">
                          <button type="submit" disabled={state.submitting} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-pop text-neutral transition-transform duration-200 hover:scale-95">Submit</button>
                      </div>
                      <div className="mt-3 text-center">
                          <p className="text-sm text-primary">
                              We will get back to you in 1-2 business days.
                          </p>
                      </div>
                  </form>
              </div>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 lg:gap-8">
              <Link className="group flex flex-col h-full text-center rounded-lg hover:bg-hover p-4 sm:p-6" href="/guide">
                  <svg className="size-9 text-secondary mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  <div className="mt-5">
                      <h3 className="text-lg font-semibold text-primary">Guide</h3>
                      <p className="mt-1 text-secondary">If you are confused on where to start, try reading our extensive guide</p>
                      <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-primary">
                          Read the guide
                          <svg className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </p>
                  </div>
              </Link>

              <Link className="group flex flex-col h-full text-center rounded-lg hover:bg-hover p-4 sm:p-6" href="/changelog">
                  <svg className="size-9 text-secondary mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
                  <div className="mt-5">
                      <h3 className="text-lg font-semibold text-primary">Updates</h3>
                      <p className="mt-1 text-secondary">Been a while? No worries, see what has been changed and what is new</p>
                      <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-primary">
                          View updates
                          <svg className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </p>
                  </div>
              </Link>

              <Link className="group flex flex-col h-full text-center rounded-lg hover:bg-hover p-4 sm:p-6" href="/login">
                  <svg className="size-9 text-secondary mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                  <div className="mt-5">
                      <h3 className="text-lg font-semibold text-primary">Get Started</h3>
                      <p className="mt-1 text-secondary">Jump right in and start creating collections and problems today!</p>
                      <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-primary">
                          Log in
                          <svg className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </p>
                  </div>
              </Link>
          </div>
      </div>
  );
};

export default ContactForm; 