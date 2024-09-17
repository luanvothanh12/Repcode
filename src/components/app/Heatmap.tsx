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
    <div className="flex flex-col items-start relative">
      <h2 className="text-2xl font-bold mb-4 text-secondary">Streaks</h2>
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
        <div className="heatmap-legend">
          <span className="text-secondary">Less</span>
          <div className="heatmap-legend-square bg-grey"></div>
          <div className="heatmap-legend-square bg-light-green"></div>
          <div className="heatmap-legend-square bg-medium-green"></div>
          <div className="heatmap-legend-square bg-dark-green"></div>
          <span className="text-secondary">More</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
