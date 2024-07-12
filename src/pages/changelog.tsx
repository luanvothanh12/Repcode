import React, { useState, useEffect, useContext } from 'react';
import NavBar from '@/components/home/NavBar';
import Footer from '@/components/home/Footer';
import "../app/globals.css";

export default function Changelog() {
    const changelogData = [
      {
        month: "June 2024",
        updates: [
          {
            date: "V 0.1.10 - June 20th, 2024",
            changes: [
              "NEW: Added profile/billing page, navigatiable via the sidebar", 
              "NEW: Added AI integration", 
            ],
          },
          {
            date: "V 0.1.9 - June 11th, 2024",
            changes: [
              "Adjusted styling of homepage", 
              "Adjusted Pricing models/flow", 
              "Adjusted terms/privacy pages"
            ],
          },
          {
            date: "V 0.1.8 - June 4, 2024",
            changes: [
              "NEW: changed logo to an orange lightbulb (real original, I know)", 
              "Adjusted endpoint to contain basic auth checks", 
            ],
          },
        ],
      },
      {
        month: "May 2024",
        updates: [
          {
            date: "V 0.1.7 - May 29, 2024",
            changes: [
              "Adjusted styling of the Create/Update problem modal to be more user friendly",
              "Temporarily disabled light/dark mode toggle until a better method is found",
              "Fixed issue with the sidebar state not being retained across pages", 
              "Fixed issue with problem details not being updated immediately", 
              "Fixed issue with authentication checks not working in create/update problem APIs" 
            ],
          },
          {
            date: "V 0.1.6 - May 19, 2024",
            changes: [
              "NEW: added ability to solve random problem from current collection and from all collections in Collection view",
              "NEW: added Back button to return to Collection view from Problem view",
              "Fixed styling of Study mode problems",
            ],
          },
          {
            date: "V 0.1.5 - May 9, 2024",
            changes: [
              "Syntax highlighting for solutions (using highlight.js)",
              "Adjusted Logout icon", 
              "Adjusted styles for problem difficulty and type",
            ],
          },
          {
            date: "V 0.1.4 - May 7, 2024",
            changes: [
              "NEW: added 4 new customization options to problems: programming language, link to leetcode/hackerrank, function signature boilerplate, and additional notes",
              "Adjusted problem view to incorporate the above changes in a user friendly way", 
              "Adjusted sidebard text Dashboard --> Collections, and changed the icon as well",
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
                "NEW: created Guide page", 
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
      <div className="flex flex-col min-h-screen bg-base_100">
          <NavBar />
          <div className="flex flex-1">
              <div className="w-1/4 p-4 border-r border-divide overflow-auto">
                  {changelogData.map((log) => (
                      <div key={log.month} className="mb-4">
                          <div className="py-2 px-4 w-full text-left text-primary font-bold">
                              {log.month}
                          </div>
                          <ul className="pl-4">
                              {log.updates.map((update) => (
                                  <li key={update.date} className="list-disc text-secondary">{update.date}</li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
              <div className="w-3/4 p-4">
                  {changelogData.map((log) => (
                      <div key={log.month} className="mb-12">
                          <h2 className="inline-block font-bold text-2xl text-primary border-b-2 border-divide mb-2">{log.month}</h2>
                          {log.updates.map((update) => (
                              <div key={update.date} className="mb-4">
                                  <h3 className="font-bold text-xl text-secondary">{update.date}</h3>
                                  <ul className="list-disc pl-5 text-secondary">
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
          <Footer />
      </div>
    );
}
