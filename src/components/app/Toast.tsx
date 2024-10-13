// Toast.tsx
import React from 'react';
import '../../app/globals.css';

const Toast = ({ message, isVisible }: { message: any; isVisible: any }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-10">
      <div className="px-6 py-4 bg-primary text-neutral rounded-lg shadow-lg text-sm font-medium animate-toastEnter max-w-full sm:max-w-md">
        {message}
      </div>
    </div>
  );
};

export default Toast;
