import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-divide py-4 text-center">
      <div className="text-primary">
        <p>Copyright © 2024 repcode.io, All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="underline mr-2">Privacy</a> <a href="/terms" className="underline">Terms</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;