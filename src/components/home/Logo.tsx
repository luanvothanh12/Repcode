import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';


// For the "Join 2000+ users today" animation 
const useCountAnimation = (end: number, duration: number, startOnView: boolean) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startOnView) return;
    
    let startTime: number | null = null;
    const startValue = 0;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.round(startValue + (end - startValue) * easeOutQuad(percentage));
      
      setCount(currentCount);
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, startOnView]);
  
  return count;
};

const Logo = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });
  
  const animatedCount = useCountAnimation(2000, 4000, inView); // 2000ms = 2 seconds duration

  return (
    <div className="dark:bg-base_100 relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-white before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2">
      {/* <div className="bg-[#FEF08A] text-[#854D0E] p-4 text-center font-semibold">
        In an effort to make this project open-source, some data related to authentication is being migrated/tested. You may experience login issues during this time. If you do, please try again in a few hours.
      </div> */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="flex flex-col justify-center items-center min-h-screen py-8"> 
          <div className="flex flex-col items-center gap-8"> 
            <div className="text-center fade-in-up">
              <div className="max-w-6xl mx-auto">
                <h1 className="block font-bold text-primary text-4xl sm:text-5xl md:text-6xl lg:text-6xl text-center">
                  Your personalized online notebook <br className="hidden lg:block" /> <span className="text-pop">for everything Leetcode</span>
                </h1>
              </div>
              <div className="mt-8 mb-10 max-w-4xl mx-auto px-4 sm:px-0 fade-in-up"> 
                <p className="text-xl text-secondary text-center">
                  Everything you&apos;ll ever need to practice and master Leetcode, all in one place
                </p>
              </div>

              {/* Updated section with card-like styling */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                <div className="bg-neutral p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    <span className="material-icons text-pop" style={{ fontSize: '40px' }}>code</span>
                  </div>
                  <h3 className="text-primary text-2xl font-semibold mb-2">Organize problems</h3>
                  <p className="text-secondary">Create collections to store and categorize your Leetcode problems</p>
                </div>

                <div className="bg-neutral p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    <span className="material-icons text-pop" style={{ fontSize: '40px' }}>sync</span>
                  </div>
                  <h3 className="text-primary text-2xl font-semibold mb-2">Review via spatial repetition</h3>
                  <p className="text-secondary">Optimize your learning using the SuperMemo spatial repitition algorithm</p>
                </div>

                <div className="bg-neutral p-6 rounded-lg shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    <span className="material-icons text-pop" style={{ fontSize: '40px' }}>lightbulb</span>
                  </div>
                  <h3 className="text-primary text-2xl font-semibold mb-2">AI-powered feedback</h3>
                  <p className="text-secondary">Get instant feedback on your solutions using advanced AI</p>
                </div>
              </div>
            </div>

            {/* User count banner */}
            <div ref={ref} className="mt-8 flex items-center gap-2 px-12 py-2 rounded-full bg-[#1A1A1A] border border-[#333333]">
              <span className="material-icons text-[#666666]">group</span>
              <span className="text-secondary text-md">Join our <span className="text-pop font-semibold">{animatedCount}+</span> users mastering Leetcode today</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-12 justify-center">
              <Link className="animated-button inline-flex justify-center items-center gap-x-2 text-center text-lg font-medium rounded-lg py-3 px-20 w-full sm:w-auto transition-transform duration-200 hover:scale-95" href="/login">
                <span>Jump In - Free</span>
              </Link>
              <Link className="inline-flex justify-center items-center text-primary bg-base_100 border border-secondary gap-x-2 text-center text-lg font-medium rounded-lg py-3 px-20 w-full sm:w-auto transition-transform duration-200 hover:scale-95" href="/guide">
                <div className="whitespace-nowrap">
                  <span>Learn more &gt;</span>
                </div>
              </Link>
            </div>
            <div className="flex justify-center w-full px-4 sm:px-0">
            <iframe
                className="shadow-orange max-w-full md:max-w-4xl rounded-xl"
                width="900"
                height="455"
                src="https://www.youtube.com/embed/rnvFQ3G3ndo?autoplay=1&controls=0&mute=1&loop=1&playlist=rnvFQ3G3ndo"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
