import React from 'react';

const ContactForm = () => {
  return (
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="max-w-xl mx-auto">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-neutral sm:text-4xl dark:text-white">
        Contact us
      </h1>
      <p className="mt-1 text-primary2 dark:text-primary">
        Questions? Bugs? Want to contribute? Let us know! 
      </p>
    </div>
  </div>

  <div className="mt-12 max-w-lg mx-auto">
    <div className="flex flex-col border rounded-xl border-feintwhite p-4 sm:p-6 lg:p-8 dark:border-feintwhite bg-white">

      <form>
        <div className="grid gap-4 lg:gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block mb-2 text-sm text-neutral font-medium">First Name</label>
              <input type="text" name="hs-firstname-contacts-1" id="hs-firstname-contacts-1" className="py-3 px-4 block w-full border border-feintwhite rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" />
            </div>

            <div>
              <label  className="block mb-2 text-sm text-neutral font-medium">Last Name</label>
              <input type="text" name="hs-lastname-contacts-1" id="hs-lastname-contacts-1" className="py-3 px-4 block w-full border border-feintwhite rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label  className="block mb-2 text-sm text-neutral font-medium">Email</label>
              <input type="email" name="hs-email-contacts-1" id="hs-email-contacts-1" className="py-3 px-4 block w-full border border-feintwhite rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-neutral font-medium">Details</label>
            <textarea id="hs-about-contacts-1" name="hs-about-contacts-1" rows={4} className="py-3 px-4 block w-full border border-feintwhite rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"></textarea>
          </div>
        </div>

        <div className="mt-6 grid">
          <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-success text-white disabled:opacity-50 disabled:pointer-events-none ">Submit</button>
        </div>

        <div className="mt-3 text-center">
          <p className="text-sm text-neutral">
            We will get back to you in 1-2 business days.
          </p>
        </div>
      </form>
    </div>
  </div>

  <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-4 lg:gap-8">

    <a className="group flex flex-col h-full text-center rounded-lg hover:bg-feintwhite p-4 sm:p-6 dark:hover:bg-white/[.05]" href="#">
      <svg className="size-9 text-neutral mx-auto dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-neutral dark:text-white">Guide</h3>
        <p className="mt-1 text-neutral dark:text-white">If you are confused on where to start, try reading our extensive guide</p>
        <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-primary2 dark:text-primary">
          Read the guide
          <svg className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </a>

    <a className="group flex flex-col h-full text-center rounded-lg hover:bg-feintwhite p-4 sm:p-6 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
      <svg className="size-9 text-neutral mx-auto dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-neutral dark:text-white">Updates</h3>
        <p className="mt-1 text-neutral dark:text-white">Been a while? No worries, see what has been changed and what is new</p>
        <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-primary2 dark:text-primary">
          View updates
          <svg className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </a>

    <a className="group flex flex-col h-full text-center rounded-lg hover:bg-feintwhite p-4 sm:p-6 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
      <svg className="size-9 text-neutral mx-auto dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
      <div className="mt-5">
        <h3 className="text-lg font-semibold text-neutral dark:text-white">Get Started</h3>
        <p className="mt-1 text-neutral dark:text-white">Jump right in and start creating collections and problems today!</p>
        <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-primary2 dark:text-primary">
          Log in
          <svg className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </p>
      </div>
    </a>
  </div>
</div>

  );
};

export default ContactForm; 