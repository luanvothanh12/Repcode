import React from 'react';
import NavBar from '@/components/home/NavBar';
import Footer from '@/components/home/Footer';
import "../app/globals.css";

export default function Changelog() {
    const changelogData = [
      {
        month: "October 2024",
        updates: [
          {
            date: "V 0.1.20 - October 2nd, 2024",
            changes: [
              "➕Added some more info to the Guide page",
              "🛠️Fixed issue with guide page being unresponsive on mobile", 
            ],
          },
        ],
      },
      {
        month: "September 2024",
        updates: [
          {
            date: "V 0.1.19 - September 30th, 2024",
            changes: [
              "➕Added link to Guide page on the Settings page",
              "⚙️Adjusted links to Guide page to open in a new tab", 
            ],
          },
          {
            date: "V 0.1.18 - September 21st, 2024",
            changes: [
              "➕Added nprogress loading bar to visually depict loading a new route",
              "🛠️Fixed issue with edit/delete menu not closing upon interaction", 
            ],
          },
          {
            date: "V 0.1.17 - September 10th, 2024",
            changes: [
              "➕Added 30 day view bar graph to Study Mode dashboard",
              "➕Added Heat Map component to track review streaks",  
              "⚙️Adjusted styling of Study Mode dashboard to contain a scrollable carousel", 
              "⚙️Adjusted styling of landing page to include Supercharge hero section", 
            ],
          },
        ],
      },
      {
        month: "August 2024",
        updates: [
          {
            date: "V 0.1.16 - August 29th, 2024",
            changes: [
              "⚙️Adjusted styling of Problems List page", 
              "⚙️Adjusted styling of sidebar text/icons", 
              "⚙️Adjusted styling of navbar to center the buttons", 
              "➖Removed randomizer button in Problem List page", 
            ],
          },
          {
            date: "V 0.1.15 - August 10th, 2024",
            changes: [
              "➕Added detailed problem breakdown view on Collection Cards", 
              "➕Added Stats button to show detailed analytics for each problem", 
              "⚙️Adjusted styling of all modals to fade into view", 
              "🛠️Fixed issue with certain buttons not having any href/link", 
            ],
          },
          {
            date: "V 0.1.14 - August 9th, 2024",
            changes: [
              "⚙️Adjusted styling of edit/delete menu to be a dropdown", 
              "⚙️Adjusted styling of the contact section in landing page", 
            ],
          },
          {
            date: "V 0.1.13 - August 4th, 2024",
            changes: [
              "⚙️Adjusted styling of profile page to be more intuitive", 
              "🛠️Fixed issue with editing a collection having the wrong default name", 
            ],
          },
        ],
      },
      {
        month: "July 2024",
        updates: [
          {
            date: "V 0.1.12 - July 20th, 2024",
            changes: [
              "⚙️Adjusted styling of FAQ accordian, and added one to Profile page", 
              "⚙️Adjusted styling of landing/login page to be responsive", 
            ],
          },
          {
            date: "V 0.1.11 - July 14th, 2024",
            changes: [
              "➕Added FAQ accordian in the Pricing and Billing page to address common concerns", 
              "⚙️Adjusted styling of Pricing and Billing page", 
              "⚙️Adjusted styling of landing/login page to be responsive", 
            ],
          },
        ],
      },
      {
        month: "June 2024",
        updates: [
          {
            date: "V 0.1.10 - June 20th, 2024",
            changes: [
              "➕Added profile/billing page, navigatiable via the sidebar", 
              "⚙️Adjusted styling/functionality of AI feedback", 
            ],
          },
          {
            date: "V 0.1.9 - June 11th, 2024",
            changes: [
              "⚙️Adjusted styling of homepage", 
              "⚙️Adjusted Pricing models/flow", 
              "⚙️Adjusted terms/privacy pages"
            ],
          },
          {
            date: "V 0.1.8 - June 4, 2024",
            changes: [
              "⚙️Adjusted logo to an orange lightbulb (real original, I know)", 
              "⚙️Adjusted endpoint to contain basic auth checks", 
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
              "⚙️Adjusted styling of the Create/Update problem modal to be more user friendly",
              "🛠️Fixed issue with the sidebar state not being retained across pages", 
              "🛠️Fixed issue with problem details not being updated immediately", 
              "🛠️Fixed issue with authentication checks not working in create/update problem APIs", 
              "➖Removed light/dark mode toggle until a better method is found",
            ],
          },
          {
            date: "V 0.1.6 - May 19, 2024",
            changes: [
              "➕Added ability to solve random problem from current collection and from all collections in Collection view",
              "➕Added Back button to return to Collection view from Problem view",
              "🛠️Fixed styling of Study mode problems",
            ],
          },
          {
            date: "V 0.1.5 - May 9, 2024",
            changes: [
              "➕Added syntax highlighting for solutions (using highlight.js)",
              "⚙️Adjusted Logout icon", 
              "⚙️Adjusted styles for problem difficulty and type",
            ],
          },
          {
            date: "V 0.1.4 - May 7, 2024",
            changes: [
              "➕Added 4 new customization options to problems: programming language, link to leetcode/hackerrank, function signature boilerplate, and additional notes",
              "⚙️Adjusted problem view to incorporate the above changes in a user friendly way", 
              "⚙️Adjusted sidebard text Dashboard --> Collections, and changed the icon as well",
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
              "⚙️Adjusted various colors for light/dark mode",
              "🛠️Fixed issue with Google auth sign in not working for some accounts", 
              "🛠️Fixed issue where questions/solutions exceeding a certain length would get cut off"
            ],
          },
          {
            date: "V 0.1.2 - April 6, 2024",
            changes: [
              "⚙️Adjusted collections and problems so that users can click anywhere inside of them to navigate to its page", 
              "🛠️Fixed styling issues with homepage GIFs and contact form",
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
                "➕Added Guide page", 
                "🛠️Fixed issue with login feedback not being shown properly (incorrect user/password, user not found in database, etc)",
                "🛠️Fixed Good and Easy button text so that they display in days instead of minutes for Relearning problems", 
                "🛠️Fixed logical issue with Bar Graph not handling problems past their due date correctly", 
              ],
          },
          {
            date: "V 0.1.0 - March 25, 2024",
            changes: [
              "Repcode.io beta release build!! 🎉🎉",
            ],
          },
        ],
      },
    ];

    return (
      <div className="flex flex-col min-h-screen bg-base_100">
          <NavBar />
          <div className="flex flex-1">
              <div className="hidden md:block md:w-1/4 p-4 border-r border-divide overflow-auto">
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
              <div className="w-full md:w-3/4 p-4">
                  {changelogData.map((log) => (
                      <div key={log.month} className="mb-12">
                          <h2 className="inline-block font-bold text-2xl text-primary border-b-2 border-divide mb-2">{log.month}</h2>
                          {log.updates.map((update) => (
                              <div key={update.date} className="mb-4">
                                  <h3 className="font-bold text-xl text-secondary">{update.date}</h3>
                                  <ul className="pl-5 text-secondary list-none">
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
