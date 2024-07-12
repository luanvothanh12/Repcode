import React from 'react';
import NavBar from '@/components/home/NavBar';
import Footer from '@/components/home/Footer';
import "../app/globals.css";

export default function Guide() {
    return (
        <div className="flex flex-col min-h-screen bg-base_100">
            <NavBar />
            <div className="p-8 m-24">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Introduction</h2>
                    <p className="text-secondary mb-8">Welcome to Repcode.io, a platform designed to empower software engineers to excel in their technical interviews. Whether you are starting your coding journey, preparing for your next job interview, or just looking to refine your problem-solving skills, Repcode.io is here to support you every step of the way. Repcode.io is not just another coding platform; it is a comprehensive ecosystem where users can create, manage, and practice coding problems. Explore our Study Mode, which employs a spatial-repetition algorithm inspired by Anki&apos;s Super Memo 2, to undergo a tailored learning experience that adapts to your progress and preferences.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Why Repcode.io?</h2>
                    <p className="text-secondary mb-8">When I first started preparing for technical interviews, I did what pretty much every aspiring software engineer does: I created a Leetcode account and started doing problems, starting with Array problems marked as Easy. I quickly ran into the first major issue: how can I organize these problems? Where can I store them for quick lookup and retrieval later? Leetcode does actually have a built-in My Lists page that lets users create and customize their own problem collections, but there are three major problems with it: first, it is unintuitive. It is tricky to figure out how to add your own custom solutions to problems, and you can&apos;t customize the problem at all. Second: you can only add problems from Leetcode to these lists. So if it a problem from any other source you are out of luck. Third: The My Lists page simply offers a way to organize problems, but what about a strategy for practicing them? When you only have 10 or 20 so problems that you are familiar with, the problem-solving strategy is simple: just do those problems every day so you remain familiar with those concepts. But what about when you have 50, 100, 500 problems? It is no longer feasible to work through every single one. The SuperMemo 2 spatial repetition style of learning is one solution to this problem: strategically space out when you solve the problems so you only are doing a manageable amount every day. So thus, Repcode.io was born to bridge this gap between organization and learning.</p>

                    <p className="text-secondary">                    
                    This Guide page is meant to help new users get familiar with the Repcode.io environment and navigate through its various features with ease. The first part is dedicated to getting familiar with the environment, and the second part will teach you about the spatial repetition algorithm that we use, how it works, and how to best make use of it. Whether you&apos;re setting up your first collection, tackling your initial problem, or diving deep into our specialized Study Mode, this guide is your roadmap to making the most of Repcode.io&apos;s dynamic resources. Get ready to enhance your coding skills, boost your problem-solving capabilities, and prepare effectively for your technical interviews with confidence!</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Sidebar</h2>
                    <p className="text-secondary mb-8">
                    The Sidebar functions as the primary navigation toolbar of the application, facilitating access to various sections such as the Collections page, User Settings, and Study Mode. Let&apos;s explore its features in greater detail. 
                    </p>
                    <img src="/guide/sidebar.png" alt="SideBar image" className="mb-8" />
                    <ul className="list-disc text-secondary mb-8 ml-5">
                      <li>(1) - Expand/Collapse icon. Clicking this will expand/collapse the sidebar</li>
                      <li>(2) - Dashboard. Clicking this will navigate you to your collections page, where you can view all your collections, edit/delete existing ones, and create new ones</li>
                      <li>(3) - Study. Clicking this will navigate you to the study dashboard, where you can see how many problems you have due today</li>
                      <li>(4) - Settings. Clicking this will navigate you to the settings page, where you can customize different settings relating to the spatial repetition algorithm</li>
                      <li>(5) - Logout. This will navigate you back to the home page, and log you out of your account</li>
                      <li>(6) - Light/Dark mode toggle. Clicking this icon will toggle between light and dark mode</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Dashboard (Collections Page)</h2>
                    <p className="text-secondary mb-8">
                    The Dashboard (Collections Page) is the part of the application where you can see all the collections you have created so far. You can delete or edit existing ones, or create new ones. Let&apos;s explore this page in more detail.
                    </p>
                    <img src="/guide/collections.png" alt="collections image" className="mb-8" />
                    <ul className="list-disc text-secondary mb-8 ml-5">
                      <li>(1) - Collection Card. This is a collection card, that holds problems inside of it. To view the problems associated with the collection, click the name.</li>
                      <li>(2) - More Options menu. Click this to view more options associated with the collection, such as Delete and Edit</li>
                      <li>(3) - Delete button. Clicking this will delete the collection and all the problems associated with it, permanently. It will first bring up a modal confirming if you do indeed want to delete</li>
                      <li>(4) - Edit. Clicking this will bring up a modal that allows you to edit parts of a collection (as of writing this, only the collection Name can be changed)</li>
                      <li>(5) - Create Collection button. Clicking this will bring up a modal to create a new collection</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Problems List</h2>
                    <p className="text-secondary mb-8">
                    When you click into a Collection, you will be taken to see that collection&apos;s problems displayed in a list. Here, similar to the Collections page, you can delete or edit existing problems, or create new ones. Let&apos;s explore this page in more detail.
                    </p>
                    <img src="/guide/problems.png" alt="problems image" className="mb-8" />
                    <ul className="list-disc text-secondary mb-8 ml-5">
                      <li>(1) - Search bar. Search a problem by name to filter the list</li>
                      <li>(2) - Problem. This is the actual problem in the collection, you can see its name, difficulty, and type </li>
                      <li>(3) - More Options menu. Click this to view more options associated with the collection, such as Delete and Edit</li>
                      <li>(4) - Edit. Clicking this will bring up a modal that allows you to edit parts of the problem (name, question, solution, and difficulty)</li>
                      <li>(5) - Delete. Clicking this will delete the problem permanently.</li>
                      <li>(6) - Problem Difficulty. This is the problem&apos;s difficulty (Easy, Medium, or Hard)</li>
                      <li>(7) - Problem Type. This is the problem&apos;s type (New, Learning, Relearning, or Review)</li>
                      <li>(8) - Create Problem button. Clicking this will bring up a modal to create a new problem</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Problem Interface</h2>
                    <p className="text-secondary mb-8">
                    When you click into a problem, you will be taken to an intuitive problem interface with that problem&apos;s details displayed. Let&apos;s explore this page in more detail. 
                    </p>
                    <img src="/guide/probleminfo.png" alt="probleminfo image" className="mb-8" />
                    <ul className="list-disc text-secondary mb-8 ml-5">
                      <li>(1) - Problem button. Active by default, this button will display the actual problem itself in field (4) </li>
                      <li>(2) - Solution button. This will display whatever solution you have set for the problem in field (4). Note: when in Study Mode, pressing the Solution button will also show various other buttons related to the spatial repetition algorithm (Again, Hard, Good, Easy). See section X for more details.  </li>
                      <li>(3) - Problem info section. This section displays various information about the current problem, such as its name, difficulty, and type</li>
                      <li>(4) - Content section. This section will display either the problem itself or its solution, depending on which button above is active</li>
                      <li>(5) - Language selection. This dropdown menu will allow users to select between 5 different programming languages (C, C++, Python, JavaScript, Java) to control the syntax highlighting of the code editor below</li>
                      <li>(6) - Code editor. This is where the user can actually code out the solution to the problem</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">WIP</h2>
                    <p className="text-secondary mb-8">
                    WIP WIP WIP 
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
