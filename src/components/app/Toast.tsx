import React from 'react';
import '../../app/globals.css';

const Toast = ({ message, isVisible }: { message: any, isVisible: any }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-5 flex justify-center items-center z-10">
      <div className="mb-4 px-6 py-4 bg-primary text-neutral rounded-lg shadow-lg text-sm font-medium animate-toastEnter max-w-full sm:max-w-md">
        {message}
      </div>
    </div>
  );
};

export default Toast;