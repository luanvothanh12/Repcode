import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xkndvdrp");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Map form field names to state property names
    const fieldMap: {[key: string]: string} = {
      'firstname': 'firstname',
      'lastname': 'lastname',
      'email': 'email',
      'details': 'details'
    };
    
    const stateField = fieldMap[name] || name;
    setFormData((prev) => ({ ...prev, [stateField]: value }));
  };

  // Reset form after success
  useEffect(() => {
    if (state.succeeded) {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        details: "",
      });
      
      // Reset success message after 5 seconds (optional)
      // setTimeout(() => {
      //   // We don't need to reset state.succeeded as Formspree handles this
      // }, 5000);
    }
  }, [state.succeeded]);

  return (
    <div id="contact" className="max-w-[85rem] px-4 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-1 text-[#B0B7C3]">
            Questions? Bugs? Want to contribute? Let us know!
          </p>
          <p className="mt-1 text-[#B0B7C3]">
            Email repcode.io@gmail.com, or fill out the form below.
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-lg mx-auto">
        <div className="bg-[#2A303C] rounded-xl border border-[#3A4253] shadow-lg overflow-hidden p-6">
          {state.succeeded ? (
            <div className="bg-[#4ade80]/10 border border-[#4ade80]/30 rounded-lg p-4 mb-6">
              <p className="text-[#4ade80] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                Thanks! We'll get back to you soon!
              </p>
            </div>
          ) : state.errors ? (
            <div className="bg-[#f87171]/10 border border-[#f87171]/30 rounded-lg p-4 mb-6">
              <p className="text-[#f87171] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                There was an error submitting the form. Please try again.
              </p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstname" className="block text-[#B0B7C3] text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#343B4A] border border-[#3A4253] rounded-lg px-4 py-2.5 text-primary placeholder-[#8A94A6] focus:outline-none focus:border-[#3b82f6] transition-colors"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-[#B0B7C3] text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#343B4A] border border-[#3A4253] rounded-lg px-4 py-2.5 text-primary placeholder-[#8A94A6] focus:outline-none focus:border-[#3b82f6] transition-colors"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-[#B0B7C3] text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#343B4A] border border-[#3A4253] rounded-lg px-4 py-2.5 text-primary placeholder-[#8A94A6] focus:outline-none focus:border-[#3b82f6] transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="details" className="block text-[#B0B7C3] text-sm font-medium mb-2">
                Details
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-[#343B4A] border border-[#3A4253] rounded-lg px-4 py-2.5 text-primary placeholder-[#8A94A6] focus:outline-none focus:border-[#3b82f6] transition-colors"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] hover:from-[#0891b2] hover:to-[#2563eb] text-primary py-3 px-4 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-[0_4px_14px_0_rgba(59,130,246,0.2)] hover:shadow-[0_4px_14px_0_rgba(59,130,246,0.3)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {state.submitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
            
            <div className="mt-3 text-center">
              <p className="text-sm text-[#B0B7C3]">
                We will get back to you in 1-2 business days.
              </p>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default ContactForm;