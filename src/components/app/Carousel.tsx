import React, { useState, useEffect } from 'react';

const Carousel = ({ components }: { components: React.ReactNode[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    const handlePrev = () => {
        setAnimationClass('slide-out-to-right');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? components.length - 1 : prevIndex - 1));
            setAnimationClass('slide-in-from-left');
        }, 500); // Match the duration of the animation
    };

    const handleNext = () => {
        setAnimationClass('slide-out-to-left');
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === components.length - 1 ? 0 : prevIndex + 1));
            setAnimationClass('slide-in-from-right');
        }, 500); // Match the duration of the animation
    };

    useEffect(() => {
        if (animationClass.includes('slide-in')) {
            const timer = setTimeout(() => {
                setAnimationClass('');
            }, 500); // Match the duration of the animation
            return () => clearTimeout(timer);
        }
    }, [animationClass]);

    return (
        <div className="relative w-full h-full overflow-hidden"> {/* Added overflow-hidden */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <button 
                    onClick={handlePrev} 
                >
                    <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-primary ml-32" style={{ fontSize: '45px' }} >arrow_back_ios</span>
                </button>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <button 
                    onClick={handleNext} 
                >
                    <span className="material-icons transition duration-300 ease-in-out hover:scale-110 text-primary mr-32" style={{ fontSize: '45px' }} >arrow_forward_ios</span>
                </button>
            </div>
            <div className={`flex justify-center items-center w-full ${animationClass}`}>
                {components[currentIndex]}
            </div>
        </div>
    );
};

export default Carousel;