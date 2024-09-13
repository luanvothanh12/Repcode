import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/auth/AuthContext';

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-base_100 text-md py-3 sm:py-0">
      <nav className="relative w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between">
          <Link className="flex-none text-xl font-semibold text-secondary" href="/" aria-label="Brand">
            <img src="/logo11.png" alt="Brand Logo" className="h-16" />
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="text-secondary w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? (
                <svg className="w-12 h-12" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              ) : (
                <svg className="w-12 h-12" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div id="navbar-collapse-with-animation" className={`${isMenuOpen ? 'block' : 'hidden'} sm:block transition-all duration-300 basis-full grow`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="flex flex-col gap-y-4 mt-5 sm:mt-0 sm:flex-row sm:gap-x-7 justify-center grow">
              <Link className="text-lg font-medium text-secondary hover:text-pop sm:py-6" href="/guide" aria-current="page">Guide</Link>
              <Link href="/changelog" className="text-lg font-medium text-secondary hover:text-pop sm:py-6">Changelog</Link>
              <Link className="text-lg font-medium text-secondary hover:text-pop sm:py-6" href="/#contact">Contact</Link>
              <Link href="/pricing" className="text-lg font-medium text-secondary hover:text-pop sm:py-6">Pricing</Link>
            </div>
            <Link
              href="/login"
              className="flex items-center justify-center gap-x-2 text-neutral bg-primary font-medium px-4 py-2 rounded-lg hover:scale-95 transition-transform duration-100"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
