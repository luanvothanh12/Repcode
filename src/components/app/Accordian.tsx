import { useState, useRef } from 'react';

const Accordion = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`accordion-container border border-[#2A2A2A] mb-2 shadow-lg`}>
      {/* Button part (question) with only rounded top corners */}
      <button
        className={`w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none transition-all duration-300 ${
          isOpen
            ? 'bg-primary text-neutral rounded-t-lg'
            : 'bg-[#1E1E20] text-[#E1E1E1] rounded-lg'
        }`}
        onClick={handleToggle}
      >
        <span>{title}</span>
        <span className="material-icons">
          {isOpen ? 'close' : 'add'}
        </span>
      </button>

      {/* Content part (answer) with rounded bottom corners when open */}
      <div
        ref={contentRef}
        className={`accordion-content overflow-hidden transition-max-height duration-300 ease ${
          isOpen ? 'accordion-open bg-primary text-neutral rounded-b-lg' : 'accordion-closed'
        }`}
        style={{
          maxHeight: isOpen ? contentRef.current?.scrollHeight + 'px' : '0px',
        }}
      >
        <div className="py-2 px-6">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
