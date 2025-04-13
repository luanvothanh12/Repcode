import React, { useState } from 'react';
import Link from 'next/link';

const FirstTimeLogIn = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (option: number) => {
    setSelectedOption(option);
  };

  const renderMessage = () => {
    switch (selectedOption) {
      case 0:
      case 1:
        return (
          <>
          <div className="text-secondary">
            <p className="mb-6">No worries! Repcode actually works really well when you have little to no experience with Leetcode. To get the most out of Repcode and master Leetcode the quickest based on your experience level, I recommend:</p>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>Visit the <Link className="text-blue underline" href="https://neetcode.io/" target="_blank" rel="noopener noreferrer">Neetcode 150 roadmap</Link>, and start solving the problems from the beginning, working your way from one pattern to the next</li>
              <li>Once you understand and can solve the problem, add this problem in the respective collection here on Repcode (if there isn&apos;t a collection for the pattern it belongs to yet, make one)</li>
              <li>Every day, make sure to navigate to the Study Mode page and solve the problems the algorithm tells you to for that day. Make sure to give honest feedback on how hard you thought the problem was to solve, so the algorithm can work properly</li>
              <li>When you get a chance, check out the <Link className="text-blue underline" href="/guide" target="_blank" rel="noopener noreferrer">guide</Link> page to learn how the algorithm works and to learn the nuances of this platform</li>
            </ul>
            <p className="mb-6">Hope this platform can help you on your Leetcode journey in some small way :)</p>
            <p>Happy coding! 🚀</p>
        </div>
          </>
        );
      case 2:
        return (
          <>
          <div className="text-secondary">
            <p className="mb-6">Great, looks like you&apos;re off to a good start! Repcode was designed to seamlessly integrate into existing workflows, so although you seem to already have the hang of things it can still help. To get the most out of Repcode and master Leetcode given your experience level, I recommend:</p>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>From now on, for every problem you solve on Leetcode (either one you&apos;ve solved before or a new one), add it to Repcode right after. Make sure to create a collection that corresponds to the pattern that the problem belongs to</li>
              <li>Every day, make sure to navigate to the Study Mode page and solve the problems the algorithm tells you to for that day. Make sure to give honest feedback on how hard you thought the problem was to solve, so the algorithm can work properly</li>
              <li>When you get a chance, check out the <Link className="text-blue underline" href="/guide" target="_blank" rel="noopener noreferrer">guide</Link> page to learn how the algorithm works and to learn the nuances of this platform</li>
            </ul>
            <p className="mb-6">Hope this platform can help you on your Leetcode journey in some small way :)</p>
            <p>Happy coding! 🚀</p>
          </div>
          </>
        );
      case 3:
        return (
          <>
          <div className="text-secondary">
            <p className="mb-6">Oops! Unfortunately, you&apos;re in the wrong place. If you can solve almost any Leetcode problem with little to no help, this platform isn&apos;t for you. Seriously, you&apos;re good. Go apply to NASA or something. Better yet, you should look into competitive programming if you aren&apos;t already, you&apos;d probably be amazing at it.</p>
            <p>This is kinda awkward. Umm, well thank you for checking out the platform at least! Bye!</p>
          </div>
          </>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-base_100 bg-opacity-50 flex items-center justify-center z-50">
      <div className={`relative ${selectedOption !== null ? 'w-[48rem]' : 'w-96'} bg-[#1E1E20] rounded-lg shadow-lg p-5 transition-all duration-300`}>
        <div className="text-left">
          <h3 className="text-xl font-semibold text-primary text-center">Welcome to Repcode!</h3>
          {selectedOption === null && (
            <p className="mt-4 text-secondary">Hi! Looks like this is your first time here, welcome! To get the most out of this application, please select your experience level with Leetcode:</p>
          )}
          {selectedOption === null ? (
            <div className="mt-4 space-y-2">
              {["Um, Leetcode? What's that? 😶", "I've solved a few problems, but I'm nowhere near FAANG level 🥲", "I've solved hundreds of problems, and can solve most easy/mediums 😎", "I am an LLM that can solve any novel problem with 99% accuracy 🤖"].map((option, index) => (
                <button key={index} onClick={() => handleOptionSelect(index)} className="block w-full text-left bg-pop text-primary font-medium py-2 px-4 rounded-md transition ease-in-out duration-150 hover:bg-primary">
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              {renderMessage()}
              <div className="mt-6 flex justify-center">
                <button onClick={onClose} className="bg-success text-primary font-medium py-2 px-6 rounded-md transition ease-in-out duration-150">
                  Sounds good!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstTimeLogIn;