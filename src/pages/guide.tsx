import React from 'react';
import NavBar from '@/components/home/NavBar';
import Footer from '@/components/home/Footer';
import "../app/globals.css";

export default function Guide() {
    return (
        <div className="flex flex-col min-h-screen bg-base_100">
            <NavBar />
            <div className="p-8 m-24">
                <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">What is Repcode?</h2>
                    <p className="text-secondary mb-8 text-xl">Repcode is a platform designed to empower software engineers to excel in Leetcode-styled technical interviews. It accomplishes this in three ways:  </p>
                    <ol className="list-decimal text-secondary mb-8 ml-5 text-xl">
                        <li>Better UI for organizing/customizing problems</li>
                        <li>Spatial repitition algorithm for reviewing old problems to ensure you don&apos;t forget what you have already learned</li>
                        <li>AI integration for providing immediate feedback on your solutions</li>
                    </ol>
                    <p className="text-secondary mb-8 text-xl">Below, we will expand on all three of these things and explain in detail exactly how Repcode attempts to do each, but before, let&apos;s first clear up how Repcode is meant to be used, and what it is not meant for. </p>
                </div>

                <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">What Repcode is not</h2>
                    <p className="text-secondary mb-8 text-xl">This platform is not meant to be used as a replacement for Leetcode. Rather, it is meant to be used in conjunction with it. Think of Leetcode as a textbook, and this platform as your notebook where you "take notes."  </p>

                    <p className="text-secondary mb-8 text-xl">What is the best way to go about mastering Leetcode? The key to understanding the usefulness of Repcode lies in the answer to this question: which is, solving problems one by one, pattern by pattern. When people begin their Leetcode journey, they won&apos;t have a solid understanding of the data structures and algorithms that are the foundation of Leetcode problem solving, so just jumping right into random Leetcode problems, without any reason or direction, isn&apos;t actually going to help build the right problem solving skills since these skills build on top of each other. For example, it doesn&apos;t make sense to start doing backtracking and binary search problems before you even understand arrays and two pointers. So therefore, the best approach to mastering Leetcode is to do problems within the same pattern first, and then once you get a good grasp of how to solve problems in that pattern, move on to the next. There are many roadmaps that exist already that show what data structure to start from and the different paths to take from there, such as the Neetcode 150 roadmap. So the idea is, once you understand a few different types of problems from that pattern, you have enough knowledge to solve almost any novel easy and medium problem from that pattern.  </p>

                    <p className="text-secondary mb-8 text-xl">So then, where does Repcode factor in? Well, Repcode gives you the ability to create different collections, and put problems within that collection, which is perfect for organizing problems into patterns. So if you are currently studying linked lists, you can make a collection called Linked List, and put all the Leetcode problems (along with your own notes and commented solutions for them) within that collection. Now you can go back and revisit these problems, and see your thought process for how you solved them in case you forget. In addition, every time you add a problem to a collection, it automatically gets added to Study Mode (the spatial repition algorithm mode) as well. So in addition to being able to organize your problems, you also have a way to review them optimally too. And in addition to that, you can also ask a built-in AI chatbot for help any time you are struggling to come up with a solution. So the issues of organization, reviewing old problems, and instant feedback on your solutions are solved by Repcode via collections, study mode, and AI integration. </p>

                    <p className="text-secondary mb-8 text-xl">As you can hopefully see by now, Repcode is simply a tool to help you on your Leetcode journey, not an all in one platform that does everything. It is important to still utilize resources like Leetcode and Neetcode to get the most out of Repcode. </p>
                </div>

                <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Part 0: Exploring the Platform</h2>
                    <p className="text-secondary mb-8 text-xl">Before we dive into the specifics of how Repcode works, let&apos;s first explore the platform itself. When you login, you will see an expandable sidebar on the left. Use this to navigate to the different parts of the platform. Each symbol in the sidebar will take you to a seperate page: 
                    </p>

                    <ul className="list-none text-secondary mb-8 ml-5">
                        <li className="flex items-center mb-4">
                            <span className="material-icons text-secondary mr-4" style={{ fontSize: '36px' }}>style</span>
                            <span className="text-xl">Collections: View and manage your collections. Here, you can see a grid layout showing all the collections you have made so far, and you can click into any one of them to access the problems stored within. You can also edit, delete, and create new collections from this page. </span>
                        </li>
                        <li className="flex items-center mb-4">
                            <span className="material-icons text-secondary mr-4" style={{ fontSize: '36px' }}>local_library</span>
                            <span className="text-xl">Study Mode: Review problems using spacial repitition. A more detailed breakdown of how this works can be found in the following sections. </span>
                        </li>
                        <li className="flex items-center mb-4">
                            <span className="material-icons text-secondary mr-4" style={{ fontSize: '36px' }}>settings</span>
                            <span className="text-xl">Settings: Customize various aspects of the spatial repitition algorithm. Again, a detailed breakdown of these settings can be found in the following sections. </span>
                        </li>
                        <li className="flex items-center mb-4">
                            <span className="material-icons text-secondary mr-4" style={{ fontSize: '36px' }}>credit_card</span>
                            <span className="text-xl"> Billing/Profile: Manage your Repcode subscription and account information here. You can see what type of subscription you have (free, pro, or lifetime), as well as cancel your monthly subscription.</span>
                        </li>
                        <li className="flex items-center mb-4">
                            <span className="material-icons text-secondary mr-4" style={{ fontSize: '36px' }}>home</span>
                            <span className="text-xl"> Home: Exit the application and return to the main landing page.</span>
                        </li>
                        <li className="flex items-center mb-4">
                            <span className="material-icons text-error mr-4" style={{ fontSize: '36px' }}>logout</span>
                            <span className="text-xl">Logout: Sign out of your account.</span>
                        </li>
                    </ul>

                    
                </div>

                <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Part 1: Organization and Customization</h2>
                    <p className="text-secondary mb-8 text-xl">wip 
                    </p>

                    
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
