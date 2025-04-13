"use client"

import { useState } from "react"
import {
  CheckCircleIcon,
  CodeIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  BarChart2Icon,
  ExternalLinkIcon,
  EditIcon,
} from "lucide-react"
import Badge from "../ui/Badge"

// Define interface for TabButton props
interface TabButtonProps {
  active: boolean;
  label: string;
  icon: React.ReactNode;
}

const CodeEditorPreview = () => {
  const [activeTab, setActiveTab] = useState("question")
  const [panelWidth, setPanelWidth] = useState(50)

  // Sample problem data
  const problem = {
    name: "Two Sum",
    difficulty: "Easy",
    type: "Review",
    description: `<h3>Problem Description</h3>
<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p>You can return the answer in any order.</p>

<h3>Example 1:</h3>
<pre><code>Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
</code></pre>

<h3>Example 2:</h3>
<pre><code>Input: nums = [3,2,4], target = 6
Output: [1,2]
</code></pre>

<h3>Constraints:</h3>
<ul>
<li><code>2 <= nums.length <= 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>
<li><code>-10<sup>9</sup> <= target <= 10<sup>9</sup></code></li>
<li><strong>Only one valid answer exists.</strong></li>
</ul>`,
    notes:
      "Use a hash map to store the values we've seen so far and their indices.\nFor each number, check if (target - current number) exists in the hash map.\nTime complexity: O(n), Space complexity: O(n)",
    solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null;
}`,
    functionSignature: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Your code here
  
}`,
  }

  const TabButton = ({ active, label, icon }: TabButtonProps) => (
    <button
      onClick={() => setActiveTab(label.toLowerCase())}
      className={`
        px-3 py-1.5 text-xs font-medium rounded-lg flex items-center
        transition-all duration-200
        ${active ? "bg-[#2A303C] text-primary shadow-sm" : "text-[#B0B7C3] hover:text-primary hover:bg-[#2A303C]/50"}
      `}
    >
      {icon}
      <span className="ml-1.5">{label}</span>
    </button>
  )

  const renderTabContent = () => {
    if (activeTab === "notes") {
      return <p className="text-primary mt-4 whitespace-pre-wrap text-sm">{problem.notes}</p>
    } else if (activeTab === "question") {
      return (
        <div
          className="text-primary mt-4 problem-content prose prose-invert max-w-none text-sm"
          dangerouslySetInnerHTML={{ __html: problem.description }}
        />
      )
    } else {
      return (
        <pre className="text-sm mt-4 bg-[#282c34] p-4 rounded-lg overflow-auto">
          <code className="text-primary font-mono">{problem.solution}</code>
        </pre>
      )
    }
  }

  return (
    <div className="h-[500px] bg-[#2A303C] flex flex-col rounded-xl overflow-hidden border border-[#3A4253] shadow-xl">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-[#3A4253] bg-[#343B4A]">
        <div className="flex items-center">
          <button className="flex items-center text-[#B0B7C3] hover:text-primary transition-colors mr-3 group">
            <div className="p-1 rounded-lg group-hover:bg-[#2A303C] transition-colors">
              <ArrowLeftIcon className="w-4 h-4" />
            </div>
          </button>
          <h1 className="text-sm font-semibold text-primary mr-3">{problem.name}</h1>
          <div className="flex gap-2">
            <Badge type="difficulty" value={problem.difficulty} />
            <Badge type="problemType" value={problem.type} />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1 rounded-lg text-[#B0B7C3] hover:text-primary hover:bg-[#2A303C] transition-colors">
            <EditIcon className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded-lg text-[#B0B7C3] hover:text-primary hover:bg-[#2A303C] transition-colors">
            <BarChart2Icon className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded-lg text-[#B0B7C3] hover:text-primary hover:bg-[#2A303C] transition-colors">
            <ExternalLinkIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content with Panels */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="h-full overflow-auto bg-[#343B4A]" style={{ width: `${panelWidth}%` }}>
          <div className="h-full border-r border-[#3A4253]">
            <div className="p-2 border-b border-[#3A4253]">
              <div className="flex gap-1">
                <TabButton
                  active={activeTab === "question"}
                  label="Description"
                  icon={<CodeIcon className="w-3.5 h-3.5" />}
                />
                <TabButton
                  active={activeTab === "notes"}
                  label="Notes"
                  icon={<BookOpenIcon className="w-3.5 h-3.5" />}
                />
                <TabButton
                  active={activeTab === "solution"}
                  label="Solution"
                  icon={<CheckCircleIcon className="w-3.5 h-3.5" />}
                />
              </div>
            </div>
            <div className="p-4">{renderTabContent()}</div>
          </div>
        </div>

        {/* Resize Handle */}
        <div className="w-1 bg-[#3A4253] cursor-col-resize relative"></div>

        {/* Right Panel - Code Editor */}
        <div className="h-full overflow-hidden bg-[#282c34]" style={{ width: `${100 - panelWidth}%` }}>
          <div className="h-full p-4 font-mono text-sm text-primary">
            <pre className="whitespace-pre-wrap">{problem.functionSignature}</pre>
          </div>
        </div>
      </div>

      {/* Floating AI Help button */}
      <button className="absolute bottom-4 right-4 flex items-center px-3 py-2 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] hover:from-[#0891b2] hover:to-[#2563eb] text-primary rounded-full text-xs font-medium shadow-lg shadow-[0_4px_14px_0_rgba(59,130,246,0.2)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-1.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
        <span>AI Help</span>
      </button>
    </div>
  )
}

export default CodeEditorPreview

