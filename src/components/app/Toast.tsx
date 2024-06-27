import React from 'react';
import '../../app/globals.css';

const Toast = ({ message, isVisible }: {message:any, isVisible:any}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 mb-4 px-6 py-4 bg-nav text-black rounded-lg shadow-lg text-sm font-medium z-10 animate-toastEnter">
      {message}
    </div>
  );
};

export default Toast;