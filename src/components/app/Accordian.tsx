import { useState } from 'react';

const Accordion = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-divide">
      <button
        className="w-full text-left py-4 px-2 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-secondary">{title}</span>
        <span className="material-icons text-secondary">{isOpen ? 'expand_less' : 'expand_more'}</span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-secondary">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;