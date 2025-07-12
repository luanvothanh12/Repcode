import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TwitterIcon, GithubIcon, LinkedinIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#343B4A] py-12 border-t border-[#3A4253]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo14.png" alt="Repcode Logo" width={120} height={40} />
            </Link>
            <p className="text-[#B0B7C3] mb-4">Your personalized online notebook for everything Leetcode.</p>
            <div className="flex space-x-4">
              {[
                { name: "twitter", icon: <TwitterIcon size={20} /> },
                { name: "github", icon: <GithubIcon size={20} /> },
                { name: "linkedin", icon: <LinkedinIcon size={20} /> }
              ].map((social) => (
                <a
                  key={social.name}
                  href={`https://${social.name}.com/repcodeio`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B0B7C3] hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-primary font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              {[
                { name: "Features", href: "#features" },
                { name: "Pricing", href: "#pricing" },
                { name: "Sign Up", href: "/login" },
                { name: "Sign In", href: "/login" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#B0B7C3] hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: "Changelog", href: "/changelog" },
                { name: "Contact", href: "#contact" },
                { name: "GitHub", href: "https://github.com/hussiiii/Repcode", external: true }
              ].map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-[#B0B7C3] hover:text-primary transition-colors"
                    >
                      {link.name === "GitHub" && <GithubIcon size={16} className="mr-1" />}
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-[#B0B7C3] hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#B0B7C3] hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#3A4253] text-center">
          <p className="text-[#B0B7C3] text-sm">© {new Date().getFullYear()} Repcode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;