import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/auth/AuthContext';

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [buttonShadow, setButtonShadow] = useState('0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -4px rgba(59, 130, 246, 0.2)');

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#343B4A]/70 backdrop-blur-md shadow-lg shadow-black/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-12"> 
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-none text-xl font-semibold text-[#FFFFFF]">
                <img src="/logo14.png" alt="Brand Logo" className="h-12" />
              </Link>
              
              {/* Version indicator with divider */}
              <div className="flex items-center ml-4">
                {/* Angled divider */}
                <div className="h-6 w-px bg-gradient-to-b from-[#4B5563]/20 to-[#6B7280]/20 transform rotate-12"></div>
                
                {/* Version pill */}
                <div 
                  className={`ml-4 flex items-center px-3 py-1 rounded-full transition-all duration-300 border border-[#4B5563]/20 bg-[#0F172A]/20`}
                >
                  {/* Pulsing dot */}
                  <div className="relative mr-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#10B981]"></div>
                    <div 
                      className="absolute top-0 left-0 h-2 w-2 rounded-full bg-[#10B981] opacity-75"
                      style={{
                        animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'
                      }}
                    ></div>
                  </div>
                  
                  {/* Version text */}
                  <span className="text-xs font-medium text-[#E5E7EB]">v2.1</span>
                </div>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/guide"
                className="text-[#B0B7C3] hover:text-[#FFFFFF] transition-colors"
              >
                Guide
              </Link>
              <Link
                href="/changelog"
                className="text-[#B0B7C3] hover:text-[#FFFFFF] transition-colors"
              >
                Changelog
              </Link>
              <Link
                href="/#contact"
                className="text-[#B0B7C3] hover:text-[#FFFFFF] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="flex items-center px-4 py-2 rounded-lg transition-all duration-200"
                style={{ 
                  background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                  color: '#FFFFFF',
                  boxShadow: buttonShadow
                }}
                onMouseOver={() => setButtonShadow('0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -4px rgba(59, 130, 246, 0.3)')}
                onMouseOut={() => setButtonShadow('0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -4px rgba(59, 130, 246, 0.2)')}
              >
                <span className="material-icons mr-2" style={{ fontSize: '18px' }}>auto_awesome</span>
                <span>Launch App</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-[#B0B7C3] hover:text-[#FFFFFF] p-2"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden py-2 space-y-3`}>
            <Link
              href="/guide"
              className="block text-[#B0B7C3] hover:text-[#FFFFFF] transition-colors py-2"
            >
              Guide
            </Link>
            <Link
              href="/changelog"
              className="block text-[#B0B7C3] hover:text-[#FFFFFF] transition-colors py-2"
            >
              Changelog
            </Link>
            <Link
              href="/#contact"
              className="block text-[#B0B7C3] hover:text-[#FFFFFF] transition-colors py-2"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center w-full px-4 py-2 mt-4 rounded-lg transition-all duration-200"
              style={{ 
                background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
                color: '#FFFFFF',
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -4px rgba(59, 130, 246, 0.2)'
              }}
            >
              <span className="material-icons mr-2" style={{ fontSize: '18px' }}>auto_awesome</span>
              <span>Launch App</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
