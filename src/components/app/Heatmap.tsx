// Heatmap.tsx
import React from 'react';
import { eachDayOfInterval, format, startOfYear, endOfYear } from 'date-fns';

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
  const mappedDays = daysInYear.map((day, index) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const contributionForDay = contributions[index] || 0;

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
