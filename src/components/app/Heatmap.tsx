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
      <div className="mb-4 flex items-center justify-between w-full">
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          className="py-1 px-3 bg-tertiary border border-divide text-secondary text-sm rounded-md focus:outline-none focus:border-[#3b82f6] transition-colors duration-300"
        >
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="heatmap-container flex flex-wrap w-full">
        {mappedDays.map((day, index) => (
          <div
            data-tooltip-id="heatmap-tooltip"
            data-tooltip-html={`${day.date} <br/> Problems Reviewed: ${day.count}`}
            key={index}
            className={`heatmap-square ${
              day.count > 0
                ? day.count > 10
                  ? 'bg-[#0891b2]' // dark cyan
                  : day.count > 5
                  ? 'bg-[#06b6d4]' // medium cyan
                  : 'bg-[#22d3ee]' // light cyan
                : 'bg-tertiary'
            }`}
            style={{ width: '12px', height: '12px', margin: '2px' }}
          ></div>
        ))}
        <ReactTooltip
          className="react-tooltip"
          id="heatmap-tooltip"
          place="bottom"
          style={{ backgroundColor: "#111111", fontSize: "12px" }}
        />
        <div className="heatmap-legend flex items-center mt-4 w-full justify-end">
          <span className="text-secondary text-xs mr-2">Less</span>
          <div className="w-3 h-3 bg-[#24272A] mr-1"></div>
          <div className="w-3 h-3 bg-[#22d3ee] mr-1"></div>
          <div className="w-3 h-3 bg-[#06b6d4] mr-1"></div>
          <div className="w-3 h-3 bg-[#0891b2] mr-2"></div>
          <span className="text-secondary text-xs">More</span>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
