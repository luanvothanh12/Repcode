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
                        <li>UI/UX designed specifically to help with organizing/categorizing problems </li>
                        <li>Spatial repitition algorithm for reviewing old problems to ensure you don&apos;t forget what you have already learned</li>
                        <li>AI integration for providing immediate feedback on your solutions</li>
                    </ol>
                    <p className="text-secondary mb-8 text-xl">Below, we will expand on all three of these things and explain in detail exactly how Repcode attempts to do each, but before, let&apos;s first clear up how Repcode is meant to be used, and what it is not meant for. </p>
                </div>

                <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">What Repcode is not</h2>
                    <p className="text-secondary mb-8 text-xl">This platform is not meant to be used as a replacement for Leetcode. Rather, it is meant to be used in conjunction with it. Think of Leetcode as a textbook, and this platform as your notebook where you &quot;take notes.&quot;  </p>

                    <p className="text-secondary mb-8 text-xl">What is the best way to go about mastering Leetcode? The key to understanding the usefulness of Repcode lies in the answer to this question: which is, solving problems one by one, pattern by pattern. When people begin their Leetcode journey, they won&apos;t have a solid understanding of the data structures and algorithms that are the foundation of Leetcode problem solving, so just jumping right into random Leetcode problems, without any reason or direction, isn&apos;t actually going to help build the right problem solving skills since these skills build on top of each other. For example, it doesn&apos;t make sense to start doing backtracking and binary search problems before you even understand arrays and two pointers. So therefore, the best approach to mastering Leetcode is to do problems within the same pattern first, and then once you get a good grasp of how to solve problems in that pattern, move on to the next. There are many roadmaps that exist already that show what data structure to start from and the different paths to take from there, such as the Neetcode 150 roadmap. So the idea is, once you understand a few different types of problems from that pattern, you have enough knowledge to solve almost any novel easy and medium problem from that pattern.  </p>
                    <img src="/guide/neetcode.png" alt="collections image" className="mb-8" />

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
                    <p className="text-secondary mb-8 text-xl">The first part of this guide will cover how to use the platform to organize and customize your Leetcode problems. As mentioned earlier, the best way to improve at Leetcode is to split problems into patterns, and then practice problems within those patterns. Repcode allows you to do this by creating collections. Each collections can hold mutiple problems, and you can edit a collection&apos;s name at any time by clicking the three little dots on the top left of the collection card. You can also delete a collection this way which will also delete all the problems inside, however be warned that this is a permanent action and cannot be undone. 
                    </p>
                    <img src="/guide/collections.png" alt="collections image" className="mb-8" />
                    <p className="text-secondary mb-8 text-xl">
                        When creating a new problem in a collection, you will be prompted to fill out a form with all sorts of information about the problem, such as: 
                    </p>
                    <ul className="list-none text-secondary mb-8 ml-5">
                        <li className="flex items-center mb-4">    
                            <span className="text-xl"><span className='font-bold'>Name</span>: The problem&apos;s name as listed on Leetcode.</span>
                        </li>
                        <li className="flex items-center mb-4">    
                            <span className="text-xl"><span className='font-bold'>Question</span>: The actual problem itself.</span>
                        </li>
                        <li className="flex items-center mb-4">    
                            <span className="text-xl"><span className='font-bold'>Solution</span>: The code solution to the problem. </span>
                        </li>
                        <li className="flex items-center mb-4">    
                            <span className="text-xl"><span className='font-bold'>Function Signature (optional)</span>: The boilerplate code associated with the solution. On Leetcode, if you select any random problem you will notice there is already some boilerplate code in the code editor: this is the function signature. We ask for it so that we can mimic this in our own code editor. </span>
                        </li>
                        <li className="flex items-center mb-4">    
                            <span className="text-xl"><span className='font-bold'>Programming Language</span>: The programming language you will use to solve the problem. Used for syntax highlighting/AI integration purposes.</span>
                        </li>
                        <li className="flex items-center mb-4">    
                            <span className="text-xl"><span className='font-bold'>Link to Problem (optional)</span>: The URL that will direct to the problem&apos;s page on Leetcode. </span>
                        </li>
                        <li className="flex items-center mb-4">    
                            <span className="text-xl"><span className='font-bold'>Additional Notes (optional)</span>: Any notes you wish to make for yourself about the problem. </span>
                        </li>
                        <li className="flex items-center mb-4">    
                            <span className="text-xl"><span className='font-bold'>Problem Difficulty</span>: The problem&apos;s difficulty as shown on Leetcode (easy, medium, or hard). </span>
                        </li>
                    </ul>
                    <img src="/guide/newproblem.png" alt="collections image" className="mb-8" />
                    <img src="/guide/problemview.png" alt="collections image" className="mb-8" />
                    <p className="text-secondary mb-8 text-xl">
                        And it&apos;s as simple as that! Now this problem has been logged and you can return to it whenever you would like and solve it right here from this platform, and quickly and easily see the solution and receive feedback. No more excel spreadsheets or switching between multiple tabs in your browser! Repcode.io keeps track of everything for you. 
                    </p>

                    <p className="text-secondary mb-8 text-xl">
                        When you add a problem to a collection, it will automatically be added and factored into the Study Mode spatial repitition algorithm, as mentioned earlier (and deleting a problem from a collection will also delete it from Study Mode). More information on how Study Mode and the algorithm works can be found in the following section. 
                    </p>
                </div>

                <div className="mb-24">
                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Part 2: The Spatial Repitition Algorithm</h2>
                    <p className="text-secondary mb-8 text-xl"> </p>
                </div>

            </div>
            <Footer />
        </div>
    );
}
