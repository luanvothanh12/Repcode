import React from 'react';
import { CircleIcon, SparklesIcon, BookOpenIcon, CheckCircleIcon } from "lucide-react";

type BadgeProps = {
  type: 'difficulty' | 'problemType';
  value: string;
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({ type, value, className = '' }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-easy bg-easybg border-[#296C62]';
      case 'medium':
        return 'text-medium bg-mediumbg border-[#815954]';
      case 'hard':
        return 'text-hard bg-hardbg border-[#7D3E55]';
      default:
        return 'text-[#B0B7C3] bg-[#3A4253] border-[#3A4253]';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'new':
        return 'text-new bg-newbg border-[#395A79]';
      case 'learning':
        return 'text-learning bg-warningbg border-[#6B603A]';
      case 'relearning':
        return 'text-learning bg-warningbg border-[#6B603A]';
      case 'review':
        return 'text-easy bg-easybg border-[#296C62]';
      default:
        return 'text-[#B0B7C3] bg-[#3A4253] border-[#3A4253]';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'new':
        return <SparklesIcon size={14} className="mr-1.5" />;
      case 'learning':
      case 'relearning':
        return <BookOpenIcon size={14} className="mr-1.5" />;
      case 'review':
        return <CheckCircleIcon size={14} className="mr-1.5" />;
      default:
        return <CircleIcon size={14} className="mr-1.5" />;
    }
  };

  const getHoverColor = (type: string, value: string) => {
    if (type === 'difficulty') {
      const difficulty = value.toLowerCase();
      if (difficulty === 'easy') {
        return 'rgb(134, 207, 172)';
      } else if (difficulty === 'medium') {
        return 'rgb(255, 180, 150)';
      } else if (difficulty === 'hard') {
        return 'rgb(253, 164, 175)';
      }
    } else if (type === 'problemType') {
      const problemType = value.toLowerCase();
      if (problemType === 'new') {
        return 'rgb(147, 197, 253)';
      } else if (problemType === 'learning' || problemType === 'relearning') {
        return 'rgb(254, 240, 138)';
      } else if (problemType === 'review') {
        return 'rgb(167, 243, 208)';
      }
    }
    return '';
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    const textElement = target.lastChild;
    if (textElement && textElement.nodeType === Node.TEXT_NODE) {
      if (!target.dataset.originalColor) {
        const computedStyle = window.getComputedStyle(target);
        target.dataset.originalColor = computedStyle.color;
      }
      
      const hoverColor = getHoverColor(type, value);
      if (hoverColor) {
        target.style.color = hoverColor;
      }
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    target.style.color = '';
  };

  const baseClasses = "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border transition-all duration-400";
  const colorClasses = type === 'difficulty' ? getDifficultyColor(value) : getTypeColor(value);
  
  return (
    <span
      className={`${baseClasses} ${colorClasses} ${className}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {type === 'difficulty' ? (
        <span className="material-icons mr-1.5 fill-current" style={{ fontSize: '12px' }}>circle</span>
      ) : (
        getTypeIcon(value)
      )}
      {value}
    </span>
  );
};

export default Badge; 