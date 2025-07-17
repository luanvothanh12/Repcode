// Toast.tsx
import React from 'react';
import '../../app/globals.css';

const Toast = ({ message, isVisible }: { message: any; isVisible: any }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative overflow-hidden bg-tertiary border border-divide rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] text-primary animate-toastEnter max-w-full sm:max-w-md">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6]"></div>
        
        {/* Toast content */}
        <div className="px-6 py-4 relative">
          <div className="text-sm font-medium">
            {message}
          </div>
        </div>
        
        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default Toast;
