import React, { useState } from 'react';
import { eachDayOfInterval, format, startOfYear, endOfYear } from 'date-fns';

const generateYearDaysArray = (year: number) => {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 11, 31));
  const daysOfYear = eachDayOfInterval({ start: yearStart, end: yearEnd });
  return daysOfYear;
};

const Heatmap = ({ contributions, currentYear }: { contributions: any, currentYear: number }) => {
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Generate all days of the selected year
  const daysInYear = generateYearDaysArray(selectedYear);

  // Map each day to its respective contribution count
  const mappedDays = daysInYear.map((day, index) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const contributionForDay = contributions[selectedYear]?.[index] || 0;

    return {
      date: formattedDate,
      count: contributionForDay,
    };
  });

  // Get available years from contributions
  const availableYears = Object.keys(contributions).map(year => parseInt(year, 10));

  return (
    <div className="flex flex-col items-start relative">
      <h2 className="text-2xl font-bold mb-4 text-secondary">Streaks</h2>
      <div className="mb-4">
        <label htmlFor="year-select" className="text-secondary mr-2">Select Year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          className="py-2 px-3 bg-nav border border-divide text-secondary shadow-sm rounded-md focus:outline-none focus:border-blue transition-colors duration-300"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
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
            title={`Date: ${day.date}, Problems Reviewed: ${day.count}`}
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