import React, { useState } from 'react';
import { eachDayOfInterval, format, startOfYear, endOfYear } from 'date-fns';
import { Tooltip as ReactTooltip } from "react-tooltip";

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
      <div className="heatmap-container flex flex-wrap">
        {mappedDays.map((day, index) => (
          <div
          data-tooltip-id="my-tooltip-1"
          data-tooltip-html={`${day.date} <br/> Problems Reviewed: ${day.count}`}
            key={index}
            className={`heatmap-square  ${
              day.count > 0
                ? day.count > 10
                  ? 'bg-dark-green'
                  : day.count > 5
                  ? 'bg-medium-green'
                  : 'bg-light-green'
                : 'bg-grey'
            }`}
          ></div>
        ))}
        <ReactTooltip
        className="react-tooltip"
        id="my-tooltip-1"
        place="bottom"
        style={{ backgroundColor: "#111111" }}
      />
        <div className="heatmap-legend flex items-center mt-4">
          <span className="text-secondary mr-2">Less</span>
          <div className="heatmap-legend-square bg-grey w-4 h-4 mr-1"></div>
          <div className="heatmap-legend-square bg-light-green w-4 h-4 mr-1"></div>
          <div className="heatmap-legend-square bg-medium-green w-4 h-4 mr-1"></div>
          <div className="heatmap-legend-square bg-dark-green w-4 h-4 mr-2"></div>
          <span className="text-secondary">More</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
