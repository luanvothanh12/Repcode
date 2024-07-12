import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-divide py-4 text-center">
      <div className="text-primary">
        <p>Copyright © 2024 repcode.io, All rights reserved.</p>
        <p className="mt-2">
          <Link href="/privacy" className="underline mr-2">Privacy</Link> <Link href="/terms" className="underline">Terms</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;