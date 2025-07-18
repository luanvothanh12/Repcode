import React, { useEffect } from 'react';
import NavBar from '@/components/home/NavBar';
import Footer from '@/components/home/Footer';
import "../app/globals.css";
import Link from 'next/link';
import { 
    FolderIcon, 
    BookOpenIcon, 
    Settings as SettingsIcon, 
    User as UserIcon, 
    Home as HomeIcon, 
    HelpCircle as HelpCircleIcon, 
    LogOut as LogOutIcon,
  } from 'lucide-react';


export default function Guide() {

    return (
        <div className="flex flex-col min-h-screen bg-base_100">
            <NavBar />
            <div className="p-4 pt-40 sm:pt-8 md:p-8 md:m-24">
                {/* Table of Contents */}
                <div className="mb-16 flex flex-col items-center ">
                    <h2 className="text-3xl font-bold mb-4 text-primary">Table of Contents</h2>
                    <ul className="list-disc list-inside text-secondary text-lg ml-5">
                        <li><a href="#what-is-repcode" className="text-primary hover:underline">What is Repcode?</a></li>
                        <li><a href="#what-repcode-is-not" className="text-primary hover:underline">What Repcode is not</a></li>
                        <li><a href="#exploring-platform" className="text-primary hover:underline">Part 0: Exploring the Platform</a></li>
                        <li><a href="#organization-customization" className="text-primary hover:underline">Part 1: Organization and Customization</a></li>
                        <li><a href="#spatial-repetition-algorithm" className="text-primary hover:underline">Part 2: The Spatial Repetition Algorithm</a></li>
                        <ul className="list-disc list-inside text-secondary text-lg ml-10">
                            <li><a href="#how-to-use-study-mode" className="text-primary hover:underline">Part 2.1: How to Use Study Mode</a></li>
                            <li><a href="#how-algorithm-works" className="text-primary hover:underline">Part 2.2: How the Spatial Repetition Algorithm Works</a></li>
                        </ul>
                        <li><a href="#ai-feedback" className="text-primary hover:underline">Part 3: AI Feedback</a></li>
                    </ul>
                </div>

                {/* Banner */}
                <div className="bg-gradient-to-r from-[#f97316]/20 to-[#eab308]/20 border-l-4 border-[#f97316] mx-4 md:mx-32 mb-16 p-4 rounded-r-lg">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                            <div className="w-6 h-6 bg-[#f97316] rounded-full flex items-center justify-center">
                                <span className="text-[#FFFFFF] text-sm font-bold">!</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-primary mb-1">Quick Note</h3>
                            <p className="text-secondary text-base">
                                This guide is kinda scuffed, but I hope it is comprehensive enough to explain how to best use this application. The first-time user video is probably better, so go watch that too!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-24" id="what-is-repcode">
                    <h2 className="text-4xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">What is Repcode?</h2>
                    <p className="text-secondary mb-8 text-xl">Repcode is a platform built to empower software engineers to excel in Leetcode-style technical interviews. It helps you achieve this in three main ways: </p>
                    <ol className="list-decimal text-secondary mb-8 ml-5 text-xl">
                        <li className="mb-4"><span className="font-bold">Organize, Catagorize, and Analyze:</span> The intuitive UI/UX makes it simple to organize and categorize problems. In addition, a detailed statistic breakdown of every problem you add to Repcode is available, helping you target your weaknesses and identify your strengths. You can also store notes and commented solutions with each problem, allowing you to refer back to them at any time for further review </li>
                        <li className="mb-4"><span className="font-bold">Spatial Repetition Review:</span> A built-in spatial repetition algorithm ensures you don&apos;t forget what you&apos;ve learned, intelligently scheduling reviews of past problems to reinforce your understanding</li>
                        <li><span className="font-bold">AI-Powered Feedback: </span> Integrated AI (trained on the problem and its optimal solution) provides instant feedback on your solutions, helping you identify mistakes and areas for improvement in real-time.</li>
                    </ol>
                    <p className="text-secondary mb-8 text-xl">We will expand on each of these features in more detail below. But first, let&apos;s clarify how Repcode is meant to be used and what it is not designed for. </p>
                </div>

                <div className="mb-24" id="what-repcode-is-not">
                    <h2 className="text-4xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">What Repcode is not</h2>
                    <p className="text-secondary mb-8 text-xl">Repcode is not intended to replace Leetcode but rather to complement it. Think of Leetcode as your textbook and Repcode as your personalized notebook for problem-solving. Repcode helps you organize, review, and receive feedback on your work, making the learning process more structured and effective.  </p>

                    <p className="text-secondary mb-8 text-xl">To master Leetcode, it&apos;s important to understand that simply tackling random problems without focus or strategy isn&apos;t the best approach. Technical interviews often test your grasp of key data structures and algorithms, so building a strong foundation is critical. For example, trying to solve complex backtracking or binary search problems before you fully understand arrays and two-pointer techniques isn&apos;t productive. Mastering Leetcode requires solving problems in patterns, progressing from fundamental concepts to more complex ones. Roadmaps like the <Link className="text-blue underline" href="https://neetcode.io/" target="_blank" rel="noopener noreferrer">Neetcode 150</Link> guide you through this process by organizing problems into patterns. Once you grasp the patterns, you&apos;re better equipped to solve a wide variety of new, unseen problems.</p>
                    <div className="flex flex-col items-center mb-8">
                        <img src="/guide/neetcode.png" alt="collections image" className="w-5/6 max-w-xl mb-2" />
                        <p className="text-secondary text-sm">The top part of the Neetcode 150 roadmap</p>
                    </div>

                    <p className="text-secondary mb-8 text-xl">So then, where does Repcode factor in? Repcode provides a way to create <span className="font-bold">custom collections</span> to group problems by pattern or concept. For instance, if you&apos;re studying linked lists, you can create a collection called &quot;Linked Lists&quot; and store all your Leetcode problems, notes, and solutions for that pattern in one place. This allows you to easily revisit problems and review your thought processes.  </p>

                    <p className="text-secondary mb-8 text-xl">Additionally, every problem you add to a collection is automatically included in <span className="font-bold">Study Mode</span>,  which leverages the spatial repetition algorithm. This ensures you review problems at the optimal time for retention, so you won&apos;t lose track of what you&apos;ve learned and reinforce your learning over time.</p>

                    <p className="text-secondary mb-8 text-xl">To further enhance your study process, Repcode integrates with an <span className="font-bold">AI-Powered Assistant</span> that provides instant feedback when you&apos;re stuck on a solution, giving you helpful hints and corrections in real-time. </p>

                    <p className="text-secondary mb-8 text-xl">In short, Repcode addresses three major challenges when it comes to mastering Leetcode: <span className="font-bold">Organization</span>, <span className="font-bold">Review</span>, and <span className="font-bold">Feedback</span> — all with the help of collections, Study Mode, and AI integration. </p>
                </div>

                {/* Key Takeaways Section */}
                <div className="mb-24 ">
                    <hr className="border-t border-feintwhite mb-16" />
                    <div className="flex flex-col items-center ">
                        <h2 className="text-2xl font-bold mb-8 text-primary">🔑Key Takeaways:</h2>
                        <ul className="list-disc list-inside text-secondary text-xl">
                            <li><span className="font-bold">Leetcode</span> = Problem source (textbook)</li>
                            <li><span className="font-bold">Repcode</span> = Learning tool (notebook)</li>
                            <li>Use both <span className="font-bold">together</span> for maximum benefit.</li>
                        </ul>
                    </div>
                    <hr className="border-t border-feintwhite mt-16" />
                </div>

                <div className="mb-24" id="exploring-platform">
                    <h2 className="text-4xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Part 0: Exploring the Platform</h2>
                    <p className="text-secondary mb-8 text-xl">Before we dive into the specifics of how Repcode works, let&apos;s first explore the platform itself. When you login, you will see an expandable sidebar on the left. Use this to navigate to the different parts of the platform. Each symbol in the sidebar will take you to a seperate page: 
                    </p>

                    <ul className="list-none text-secondary mb-8 ml-5">
                        <li className="flex items-center mb-4">
                            <div className="w-9 h-9 flex items-center justify-center mr-4">
                                <FolderIcon size={30} className="text-secondary" />
                            </div>
                            <span className="text-xl"><span className='font-bold'>Collections:</span> View and manage your collections. Here, you can see a grid layout showing all the collections you have made so far, and you can click into any one of them to access the problems stored within. You can also edit, delete, and create new collections from this page. </span>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-9 h-9 flex items-center justify-center mr-4">
                                <BookOpenIcon size={30} className="text-secondary" />
                            </div>
                            <span className="text-xl"><span className='font-bold'>Study:</span> Review problems using spacial repetition. A more detailed breakdown of how this works can be found in the following sections. </span>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-9 h-9 flex items-center justify-center mr-4">
                                <SettingsIcon size={30} className="text-secondary" />
                            </div>
                            <span className="text-xl"><span className='font-bold'>Settings:</span> Customize various aspects of the spatial repetition algorithm. Again, a detailed breakdown of these settings can be found in the following sections. </span>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-9 h-9 flex items-center justify-center mr-4">
                                <HomeIcon size={30} className="text-secondary" />
                            </div>
                            <span className="text-xl"> <span className="font-bold">Homepage:</span> Exit the application and return to the main landing page.</span>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-9 h-9 flex items-center justify-center mr-4">
                                <HelpCircleIcon size={30} className="text-secondary" />
                            </div>
                            <span className="text-xl"> <span className="font-bold">Help:</span> Opens a new window to the guide page (where you are right now!)</span>
                        </li>
                        <li className="flex items-center mb-4">
                            <div className="w-9 h-9 flex items-center justify-center mr-4">
                                <LogOutIcon size={30} className="text-error" />
                            </div>
                            <span className="text-xl"> <span className="font-bold">Logout:</span> Sign out of your account.</span>
                        </li>
                    </ul>

                    
                </div>

                <div className="mb-24" id="organization-customization">
                    <h2 className="text-4xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Part 1: Organization and Customization</h2>
                    <p className="text-secondary mb-8 text-xl">The first part of this guide will cover how to use Repcode to effectively organize your Leetcode problems, and attach notes and solutions and stuff to them. As mentioned earlier, the best way to improve at Leetcode is to break down problems into patterns and focus on practicing within those specific patterns. Repcode makes this easy by allowing you to create collections.
                    </p>
                    <p className="text-secondary mb-8 text-xl">Each collection can hold multiple problems, and you can customize these collections as needed. For example, you can rename a collection at any time by clicking the pen and paper icon on the bottom left of the collection card. You can also delete a collection by clicking the trash icon next to it, but keep in mind that doing so will permanently delete all the problems within it, and this action cannot be undone.
                    </p>
                    <div className="flex flex-col items-center mb-8">
                        <img src="/guide/collections.png" alt="collections image" />
                        <p className="text-secondary text-sm">An example dashboard showing some collections</p>
                    </div>
                    <p className="text-secondary mb-8 text-xl">
                    From the <span className="font-bold">dashboard view</span>, which shows all your collections, you can quickly access key information at a glance. This includes when the last problem was added to a collection, as well as a breakdown of the problems by type — categorized into <span className="font-bold">New</span>, <span className="font-bold">Learning</span>, and <span className="font-bold">Review</span> stages. The color bar at the bottom gives you an instant snapshot of your progress within each collection. The more green the bar, the better your understanding of that pattern, as it means more problems are in the Review stage, indicating strong familiarity. Note that if there is a red warning symbol next to the Last Updated date, it means it has been longer than a month since you last solved a new problem from that collection, so it&apos;s recommended you should try and solve a new one soon to keep your understanding fresh! Remember that it is important to tackle novel problems from time to time, in addition to reviewing old ones! 
                    </p>
                    <p className="text-secondary mb-8 text-xl">
                        When creating a new problem in a collection, you will be prompted to fill out a form with all sorts of information about the problem. You can enter the Leetcode problem number and click Autofill to automatically scrape these details from Leetcode directly, or you can manually fill out the details yourself. These include: 
                    </p>
                    <table className="min-w-full bg-base_100 border border-divide mb-8">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Field</th>
                                <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Name</td>
                                <td className="px-4 py-2 border-b border-divide text-xl text-secondary">The problem&apos;s name as listed on Leetcode.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Question</td>
                                <td className="px-4 py-2 border-b border-divide text-xl text-secondary">The actual problem statement itself.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Solution</td>
                                <td className="px-4 py-2 border-b border-divide text-xl text-secondary">The code solution to the problem. It is recommended you put your own solution here, one that makes sense to you.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Function Signature (optional)</td>
                                <td className="px-4 py-2 border-b border-divide text-xl text-secondary">The boilerplate code associated with the solution. On Leetcode, if you select any random problem you will notice there is already some boilerplate code in the code editor: this is the function signature. We ask for it so that we can mimic this in our own code editor.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Programming Language</td>
                                <td className="px-4 py-2 border-b border-divide text-xl text-secondary">The programming language you will use to solve the problem. Used for syntax highlighting/AI integration purposes.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Link to Problem (optional)</td>
                                <td className="px-4 py-2 border-b border-divide text-xl text-secondary">The URL that will direct to the problem&apos;s page on Leetcode.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Additional Notes (optional)</td>
                                <td className="px-4 py-2 border-b border-divide text-xl text-secondary">Any notes you wish to make for yourself about the problem.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Problem Difficulty</td>
                                <td className="px-4 py-2 border-b border-divide text-xl text-secondary">The problem&apos;s difficulty as shown on Leetcode (easy, medium, or hard).</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="text-secondary mb-8 text-xl">
                    And that&apos;s it — <span className="font-bold">organizing your problems is that simple</span>! Once a problem is logged into a collection, you can easily return to it at any time to re-solve it, view your solution, and receive feedback all within the platform. No need to maintain Excel spreadsheets or juggle multiple browser tabs—Repcode keeps everything organized in one place for you.
                    </p>
                    <div className="flex flex-col items-center mb-8">
                        <img src="/guide/problemview.png" alt="collections image" />
                        <p className="text-secondary text-sm">What the problem view looks like</p>
                    </div>

                    <p className="text-secondary mb-8 text-xl">
                    When you add a problem to a collection, it will also automatically be integrated into <span className="font-bold">Study Mode</span>, which leverages the spatial repetition algorithm mentioned earlier. This ensures that you review problems at the optimal time to reinforce your learning. If you delete a problem from a collection, it will also be removed from Study Mode. For more information about this, refer to the next section. 
                    </p>
                </div>

                {/* Key Takeaways Section */}
                <div className="mb-24 ">
                    <hr className="border-t border-feintwhite mb-16" />
                    <div className="flex flex-col items-center ">
                        <h2 className="text-2xl font-bold mb-8 text-primary">🔑Key Takeaways:</h2>
                        <ul className="list-disc list-inside text-secondary text-xl">
                            <li><span className="font-bold">Collections</span>: Organize your problems by patterns using collections</li>
                            <li><span className="font-bold">Customization</span>: Personalize every detail of the problems you add</li>
                            <li><span className="font-bold">All-in-one</span>: Repcode tracks everything for you </li>
                        </ul>
                    </div>
                    <hr className="border-t border-feintwhite mt-16" />
                </div>

                <div className="mb-24" id="spatial-repetition-algorithm">
                    <h2 className="text-4xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Part 2: The Spatial Repetition Algorithm</h2>
                    <p className="text-secondary mb-8 text-xl">One of the unique aspects of Repcode is its ability to not only help you store and organize problems, but also review them efficiently through <span className="font-bold">Study Mode</span>, powered by a fully customizable spatial repetition algorithm. This algorithm, similar to the one used by Anki, ensures that you never forget what you&apos;ve learned by spacing out your review sessions. As of this writing, Repcode is the only actively maintained platform that offers this feature out of the box. </p>
                    <p className="text-secondary mb-8 text-xl"><span className="font-bold">What is spatial repetition?</span> In short, it&apos;s a learning technique that schedules review sessions at increasing intervals to improve long-term retention. It&apos;s based on the idea that the brain retains information best when it&apos;s reviewed at strategic points, rather than in one sitting. Also, the algorithm is very smart, and will quickly determine what data structures and specific problems you struggle with, and which ones you find easier, and adjust itself accordingly so that you spend more time on problems that you have trouble with. This section will be split into two sub-parts: </p>
                    <ol className="list-decimal text-secondary mb-16 ml-5 text-xl">
                        <li>How to use Study Mode </li>
                        <li>How the spatial repetition algorithm works under the hood</li>
                    </ol>

                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary" id="how-to-use-study-mode">Part 2.1: How to use Study Mode</h2>
                    <p className="text-secondary mb-8 text-xl"><span className="font-bold">First, the easy part:</span> how to use it. The great thing about Study Mode is that it&apos;s largely <span className="font-bold">automatic</span> — the spatial repetition algorithm updates and manages itself. Whenever you add a problem to a collection, it&apos;s automatically included in Study Mode and factored into the algorithm. Your role is minimal: just navigate to the Study Mode section and, when you have problems due for review, a &quot;Study Now&quot; button will appear. Clicking this button will prompt you to solve the problems assigned for that day. </p>
                    <p className="text-secondary mb-8 text-xl">After solving each problem, head to the Solutions tab and choose the button that best reflects how difficult you found the problem: </p>
                    <div className="mb-8 flex justify-center items-center">
                        <button className={`mx-2 py-1 px-5 border border-[#8B3A3A] transition-all duration-300 text-[#FF6B6B] rounded-md hover:bg-[#3A2A2A]`}>
                            <span className="text-xl">Again</span>
                        </button>
                        <button className={`mx-2 py-1 px-5 border border-[#8C5E2A] transition-all duration-300 text-[#FFA94D] rounded-md hover:bg-[#3A332A]`}>
                            <span className="text-xl">Hard</span>
                        </button>
                        <button className={`mx-2 py-1 px-5 border border-[#2D6A39] transition-all duration-300 text-[#69DB7C] rounded-md hover:bg-[#2A3A2E]`}>
                            <span className="text-xl">Good</span>
                        </button>
                        <button className={`mx-2 py-1 px-5 border border-[#2A5A8C] transition-all duration-300 text-[#74C0FC] rounded-md hover:bg-[#202C3A]`}>
                            <span className="text-xl">Easy</span>
                        </button>
                    </div>

                    <p className="text-secondary mb-8 text-xl">If certain buttons aren&apos;t available for a problem, don&apos;t worry — this is intentional. Based on factors such as the problem&apos;s difficulty and current type, the algorithm may restrict some options to ensure more accurate feedback. Here&apos;s a quick guide on when to choose each option: </p>
                    <div className="mb-8 flex justify-center items-center">
                        <table className="min-w-full bg-base_100 border border-divide">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Button</th>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-error">Again</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">Press this one if you had no idea how to even approach the problem.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-medium">Hard</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">Press this one if you were able to at least come up with a solution that passed some test cases, but was not optimal.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-easy">Good</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">Press this one if you could come up with and thoroughly explain the optimal approach to solving this problem.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-blue">Easy</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">Press this one if you could optimally solve the problem very quickly with little thought.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-secondary mb-8 text-xl">Each day, the algorithm will assess the feedback you&apos;ve given on the problem and other factors to decide when you should review it again. </p>
                    <div className="flex flex-col items-center mb-8">
                        <img src="/guide/studydashboard.png" alt="collections image" className=" mb-2" />
                        <p className="text-secondary text-sm">A bar graph showing future review session workloads</p>
                    </div>
                    <p className="text-secondary mb-8 text-xl">It is important to use Study Mode consistently — <span className="font-bold">daily practice </span> is ideal to keep your workload manageable. But don&apos;t worry if you miss a few days; the algorithm won&apos;t break. Problems you miss will simply be pushed to future days. However, keep in mind that delaying too many days will increase your workload in the future, so try to stay on top of your reviews to avoid falling behind. </p>
                    <p className="text-secondary mb-8 text-xl">You might also notice that each problem in Repcode has an associated <span className="font-bold">Type</span>. These types help the spatial repetition algorithm determine how often you should review each problem based on how well you know it. The types are: </p>
                    <div className="mb-16 flex justify-center items-center">
                        <table className="min-w-full bg-base_100 border border-divide">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Type</th>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-new">New</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">A problem is classified as New when it&apos;s first added. You haven&apos;t given any feedback yet, so the algorithm doesn&apos;t know how well you understand it. A problem cannot revert to the New state once it leaves it.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-learning">Learning</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">A problem that&apos;s in the process of becoming a Review problem. You can solve it, but the algorithm has determined that your grasp is not yet strong enough.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-learning">Relearning</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">A problem that was previously categorized as Review, but due to poor recent feedback, it has returned to a state where more practice is needed.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-review">Review</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">A problem you are confident in and can solve without much effort. These problems will appear less frequently in Study Mode, as the algorithm considers them well-understood.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Key Takeaways Section */}
                    <div className="mb-24 ">
                        <hr className="border-t border-feintwhite mb-16" />
                        <div className="flex flex-col items-center ">
                            <h2 className="text-2xl font-bold mb-8 text-primary">🔑Key Takeaways:</h2>
                            <ul className="list-disc list-inside text-secondary text-xl">
                                <li><span className="font-bold">Automatic</span>: Just create problems and give feedback and let Repcode do the rest</li>
                                <li><span className="font-bold">Feedback</span>: Use the appropriate button based on how well you solved the problem</li>
                                <li><span className="font-bold">Daily practice</span>: Staying consistent will prevent future overload </li>
                            </ul>
                        </div>
                        <hr className="border-t border-feintwhite mt-16" />
                    </div>


                    <h2 className="text-2xl font-bold mb-2 inline-block border-b-2 border-divide text-primary" id="how-algorithm-works">Part 2.2: How the Spatial Repetition Algorithm Works</h2>
                    <p className="text-secondary mb-8 text-xl"><span className="font-bold">Second, let&apos;s now delve into how the spatial repetition algorithm works</span>, how the different settings are related to it, and how you can tweak them to make the algorithm more tailored to your learning style. Keep in mind that the default settings are not arbitrary; they were carefully chosen because they represent what works best for most users. However, if you&apos;d like to tailor the algorithm to better suit your needs, this section will explain the settings in detail and how to adjust them. </p>
                    <p className="text-secondary mb-8 text-xl">While entire books have been written about the spatial repetition algorithm, we&apos;ll keep it concise here. To get a deeper understanding of the technical aspects, I highly recommend watching the two videos below. Both were extensively referenced when we implemented the algorithm in Repcode. Although these videos discuss Anki, the algorithm used in Repcode is identical. </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/Eo1HbXEiJxo?si=OOwMOtblzL92izBT&amp;start=161"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/lz60qTP2Gx0?si=7Yvd3Bq5sVvY-kvj&amp;start=64"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <p className="text-secondary mb-8 text-xl"><span className="font-bold">If you plan on using Repcode long term, and truly want to understand how the algorithm works and how to make it work best for you, I highly recommend watching the above two videos.</span> For now, let&apos;s discuss the settings, how they relate to the algorithm, and how you can customize the settings to match your needs. But first, some key terms: </p>

                    <div className="mb-8 flex justify-center items-center">
                        <table className="min-w-full bg-base_100 border border-divide">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Term</th>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Definition</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Interval</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">The interval represents how long the algorithm waits before showing a problem for review again, in days. Based on your feedback (via the buttons: Again, Hard, Good, Easy), the current interval, problem type, and other factors, the algorithm will calculate the next review interval.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Ease Factor</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">This percentage indicates how easy the algorithm believes a problem is for you to solve. The easier a problem has been in the past, the greater the Ease will be, and the longer the intervals between reviews will be. Initially, all problems start with the same ease factor, but it adjusts based on your performance.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-secondary mb-8 text-xl">Alright, so with that vocabulary out of the way, let us now talk about each of the settings in detail, what they do, along with examples so you can fully understand how they all work in relation to the spatial repetition algorithm. Again, to truly understand how everything works, please watch the above two videos in full. </p>

                    <div className="mb-8 flex justify-center items-center">
                        <table className="min-w-full bg-base_100 border border-divide">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Setting</th>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Default Value</th>
                                    <th className="px-4 py-2 border-b-2 border-divide text-left text-xl font-bold text-primary">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Learning steps</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">10m, 1d</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">These apply to <span className="font-bold">New/Learning</span> problems. The first number (10m) represents how soon you&apos;ll see the problem again if you press <span className="font-bold">Again</span>. Every time you press <span className="font-bold">Good</span>, the problem advances to the next step (e.g., if the next step is 1d, you&apos;ll see it in 1 day).</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Graduating interval</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">3d</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">After a problem has gone through all its learning steps and you press <span className="font-bold">Good</span>, it &quot;graduates&quot; from a Learning problem to a <span className="font-bold">Review</span> problem. The graduating interval determines when it will be shown to you again right after it becomes a Review problem.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Easy interval</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">4d</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">If you press <span className="font-bold">Easy</span> during the learning steps, the problem skips all remaining steps and immediately graduates to a Review problem. The easy interval determines when it will next appear.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Relearning steps</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">10m</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">When you press <span className="font-bold">Again</span> on a Review problem, it changes to a <span className="font-bold">Relearning</span> problem. It must then go through the Relearning steps before it can become a Review problem again. These steps function similarly to Learning steps.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">New interval</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">0.75</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">A percentage (less than 100%) that will be applied to the ease factor of Relearning problems once they graduate and become Review problems again. It ensures that even though a problem is back in Review, it&apos;s reviewed more frequently to reinforce your knowledge.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Maximum interval</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">180 (in days)</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">This is the maximum number of days a Review problem can go without being shown again. It prevents overly long gaps between reviews.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Starting ease</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">2.5</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">This is the starting ease factor for newly created problems. A higher number results in longer intervals, while a lower number shortens the intervals.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Easy bonus</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">1.3</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">When you press <span className="font-bold">Easy</span> on a problem, this multiplier is applied to the interval, increasing it significantly more than it would have if you pressed <span className="font-bold">Good</span>.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">Interval modifier</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">1.00</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">An extra multiplier that is applied to all review problems. At its default of 1.00 it does nothing. If you set it to 0.80, for example, intervals will be generated at 80% of their normal size (so a 10 day interval would become 8 days). You can thus use the multiplier to make your reviews less or more frequent. In other words, make the algorithm more or less aggressive.</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-divide text-xl font-bold text-secondary">OpenAI key</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">null</td>
                                    <td className="px-4 py-2 border-b border-divide text-xl text-secondary">Enter your OpenAI API key here to be able to use the AI Feedback feature. This setting is unrelated to the spatial repetition algorithm but is required for enabling AI-generated feedback.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Key Takeaways Section */}
                    <div className="mb-24 ">
                        <hr className="border-t border-feintwhite mb-16" />
                        <div className="flex flex-col items-center ">
                            <h2 className="text-2xl font-bold mb-8 text-primary">🔑Key Takeaways:</h2>
                            <ul className="list-disc list-inside text-secondary text-xl">
                                <li><span className="font-bold">The algorithm</span>: Watch the above videos to fully understand how it works</li>
                                <li><span className="font-bold">Customizable</span>: You can customize the algorithm by changing various settings</li>
                            </ul>
                        </div>
                        <hr className="border-t border-feintwhite mt-16" />
                    </div>

                </div>

                <div className="mb-24" id="ai-feedback">
                    <h2 className="text-4xl font-bold mb-2 inline-block border-b-2 border-divide text-primary">Part 3: AI Feedback</h2>
                    <p className="text-secondary mb-8 text-xl">The final key feature of Repcode is its <span className="font-bold">AI-powered feedback system.</span> For every problem, you&apos;ll find an &quot;AI Feedback&quot; button that opens a chat window where the AI analyzes your solution. In a few sentences, the AI will determine if your solution is correct, and if not, it will highlight specific areas of your code that are flawed and explain why. </p>
                    <div className="flex flex-col items-center mb-8">
                        <img src="/guide/Aifeedback.png" alt="collections image" />
                        <p className="text-secondary text-sm">An example of the AI giving feedback on a classic Leetcode problem</p>
                    </div>
                    <p className="text-secondary mb-8 text-xl">Before generating feedback, the AI is provided with the problem statement and the optimal solution for context. It compares your solution to the optimal one and offers detailed feedback, including a comparison of runtimes between the two solutions. Additionally, the AI provides a brief explanation of the optimal approach to solving the problem. </p>
                    <p className="text-secondary mb-8 text-xl">To use the AI feedback feature, ensure that you have entered a valid <span className="font-bold">OpenAI API key</span> on the Settings page. For security reasons, once you input your API key, it will be hidden from view in the input field but will remain active. </p>
                </div>

                {/* Key Takeaways Section */}
                <div className="mb-24 ">
                    <hr className="border-t border-feintwhite mb-16" />
                    <div className="flex flex-col items-center ">
                        <h2 className="text-2xl font-bold mb-8 text-primary">🔑Key Takeaways:</h2>
                        <ul className="list-disc list-inside text-secondary text-xl">
                            <li><span className="font-bold">AI Feedback</span>: Provides instant, automated feedback on your solutions </li>
                            <li><span className="font-bold">Quick Validation</span>: Useful for reviewing your solutions quickly, especially in Study Mode</li>
                            <li><span className="font-bold">API Key Required</span>: Ensure a valid OpenAI API key is entered in the Settings page</li>
                        </ul>
                    </div>
                    <hr className="border-t border-feintwhite mt-16" />
                </div>

            </div>
            <Footer />
        </div>
    );
}
