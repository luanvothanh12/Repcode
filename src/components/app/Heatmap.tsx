// Heatmap.tsx
import React from 'react';
import { eachDayOfInterval, format, isLeapYear, startOfYear, endOfYear } from 'date-fns';

const generateYearDaysArray = () => {
  const now = new Date();
  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);
  const daysOfYear = eachDayOfInterval({ start: yearStart, end: yearEnd });
  return daysOfYear;
};

const Heatmap = ({ contributions }: { contributions: any }) => {
  // Generate all days of the year
  const daysInYear = generateYearDaysArray();

  // Map each day to its respective contribution count
  const mappedDays = daysInYear.map((day) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const dayOfYearIndex = Math.floor((day.getTime() - startOfYear(day).getTime()) / (1000 * 60 * 60 * 24));
    const contributionForDay = contributions[dayOfYearIndex] || 0;

    return {
      date: formattedDate,
      count: contributionForDay,
    };
  });

  // Render Heatmap
  return (
    <div className="heatmap-container">
      {mappedDays.map((day, index) => (
        <div
          key={index}
          className={`heatmap-square ${
            day.count > 0
              ? day.count > 10
                ? 'bg-dark-green'
                : day.count > 5
                ? 'bg-medium-green'
                : 'bg-light-green'
              : 'bg-grey'
          }`}
          title={`Date: ${day.date}, Contributions: ${day.count}`}
        ></div>
      ))}
    </div>
  );
};

export default Heatmap;
