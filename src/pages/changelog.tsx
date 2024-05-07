import React, { useState, useEffect, useContext } from 'react';
import NavBar from '@/components/home/NavBar';
import "../app/globals.css";

export default function Changelog() {
    const changelogData = [
      {
        month: "May 2024",
        updates: [
          {
            date: "V 0.1.4 - May 7, 2024",
            changes: [
              "NEW: added 4 new customization options to problems: programming language, link to leetcode/hackerrank, function signature boilerplate, and additional notes",
              "Adjusted problem view to incorporate the above changes in a user friendly way", 
              "Changed sidebard text Dashboard --> Collections, and changed the icon as well",
            ],
          },
        ],
      },
        {
            month: "April 2024",
            updates: [
              {
                date: "V 0.1.3 - April 17, 2024",
                changes: [
                  "Adjusted various colors for light/dark mode",
                  "Fixed issue with Google auth sign in not working for some accounts", 
                  "Fixed issue where questions/solutions exceeding a certain length would get cut off"
                ],
              },
              {
                date: "V 0.1.2 - April 6, 2024",
                changes: [
                  "Fixed styling issues with homepage GIFs and contact form",
                  "Adjusted collections and problems so that users can click anywhere inside of them to navigate to its page", 
                ],
              },
            ],
          },
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
      ];

      return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-base_100">
            <NavBar />
            <div className="flex flex-1">
                <div className="w-1/4 p-4 border-r border-feintwhite dark:border-divide overflow-auto">
                    {changelogData.map((log) => (
                        <div key={log.month} className="mb-4">
                            <div className="py-2 px-4 w-full text-left text-neutral dark:text-white font-bold">
                                {log.month}
                            </div>
                            <ul className="pl-4">
                                {log.updates.map((update) => (
                                    <li key={update.date} className="list-disc text-primary2 dark:text-primary">{update.date}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="w-3/4 p-4">
                    {changelogData.map((log) => (
                        <div key={log.month} className="mb-12">
                            <h2 className="inline-block font-bold text-2xl text-neutral dark:text-white border-b-2 border-feintwhite dark:border-divide mb-2">{log.month}</h2>
                            {log.updates.map((update) => (
                                <div key={update.date} className="mb-4">
                                    <h3 className="font-bold text-xl text-neutral dark:text-white">{update.date}</h3>
                                    <ul className="list-disc pl-5 text-primary2 dark:text-primary">
                                        {update.changes.map((change, index) => (
                                            <li key={index}>{change}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}