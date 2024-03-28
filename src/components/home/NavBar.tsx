import React from 'react';
import Link from 'next/link'; 
import useDarkMode from '../../../useDarkMode'


const NavBar = () => {
  const [colorTheme, setTheme] = useDarkMode() as any; 

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-divide2 dark:border-divide text-sm py-3 sm:py-0 dark:bg-base_100">
    <nav className="relative w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
      <div className="flex items-center justify-between">
        <Link className="flex-none text-xl font-semibold dark:text-white text-primary" href="/" aria-label="Brand">
        <img src="/logo.svg" alt="Brand Logo" className="h-10 w-auto" />
        </Link>
        <div className="sm:hidden">
          <button type="button" className="hs-collapse-toggle w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:text-white" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
            <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <svg className="hs-collapse-open:block flex-shrink-0 hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
      </div>
      <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
        {colorTheme === "light" ? (
  <svg
    onClick={() => setTheme("light")}
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-warning hover:cursor-pointer transition duration-300 ease-in-out hover:scale-110"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
) : (
  <svg
    onClick={() => setTheme("dark")}
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-new hover:cursor-pointer transition duration-300 ease-in-out hover:scale-110"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)}
          <Link className="font-medium text-neutral hover:text-blue sm:py-6 dark:text-white dark:hover:text-primary" href="/guide" aria-current="page">Guide</Link>
          <Link href="/changelog" className="font-medium text-neutral hover:text-blue sm:py-6 dark:text-white dark:hover:text-primary">Changelog</Link>
          <Link className="font-medium text-neutral hover:text-blue sm:py-6 dark:text-white dark:hover:text-primary" href="/#contact">Contact</Link>
  
  
  
          <Link className="flex items-center gap-x-2 font-medium text-neutral hover:text-blue sm:border-s sm:border-gray-300 sm:my-6 sm:ps-6 dark:text-white dark:hover:text-primary" href="/home/SignInUp">
            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            Log in
          </Link>
        </div>
      </div>
    </nav>
  </header>
  );
};

export default NavBar;