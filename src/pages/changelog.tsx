import React, { useState, useEffect, useContext } from 'react';
import NavBar from '@/components/home/NavBar';
import "../app/globals.css";

export default function Changelog() {
    const changelogData = [
        {
          month: "March 2024",
          updates: [
            {
                date: " V 0.1.1 - March 26, 2024",
                changes: [
                  "Created Guide page", 
                  "Fixed issue with login feedback not being shown properly (incorrect user/password, user not found in database, etc)",
                  "Fixed Good and Easy button text so that they display in days instead of minutes for Relearning problems", 
                  "Fixed logical issue with Bar Graph not handling problems past their due date correctly", 
                ],
            },
            {
              date: "V 0.1.0 - March 25, 2024",
              changes: [
                "Initial Repcode.io release build!! 🎉🎉",
              ],
            },
          ],
        },
        // Add more months and updates as needed
      ];

      const [selectedMonth, setSelectedMonth] = useState(changelogData[0].month);
      const selectedUpdates = changelogData.find(log => log.month === selectedMonth)?.updates || [];

      return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-base_100">
            <NavBar />
            <div className="flex flex-1">
                <div className="w-1/4 p-4 border-r border-feintwhite dark:border-divide overflow-auto">
                    {changelogData.map((log) => (
                        <div key={log.month} className="mb-4">
                            <button
                                className={`py-2 px-4 w-full text-left text-neutral dark:text-white ${selectedMonth === log.month ? 'font-bold' : ''}`}
                                onClick={() => setSelectedMonth(log.month)}
                            >
                                {log.month}
                            </button>
                            {selectedMonth === log.month && (
                                <ul className="pl-4">
                                    {log.updates.map((update) => (
                                        <li key={update.date} className="list-disc text-primary2 dark:text-primary">{update.date}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-3/4 p-4">
                    {selectedUpdates.map((update) => (
                        <div key={update.date} className="mb-6">
                            <h3 className="font-bold text-xl text-neutral dark:text-white">{update.date}</h3>
                            <ul className="list-disc pl-5 text-primary2 dark:text-primary">
                                {update.changes.map((change, index) => (
                                    <li key={index}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}