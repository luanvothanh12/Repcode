import prisma from "../../../prisma_client"; 

enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard"
}

var q1 = `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.`;

var s1 = `class Solution(object):
def twoSum(self, nums, target):
  for i in range(len(nums)):
      for j in range(i+1, len(nums)):
          if nums[i] + nums[j] == target:
              return [i, j]
  return []`;

var q2 = `The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
 

Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
Example 3:

Input: s = "A", numRows = 1
Output: "A"
 

Constraints:

1 <= s.length <= 1000
s consists of English letters (lower-case and upper-case), ',' and '.'.
1 <= numRows <= 1000`;

var s2 = `def string_zigzag(s: str, rows: int):

    # initialize the line number
    line_no = 0

    # row list. this list will decide which character in the string will go in which row number
    ch_rows = [''] * rows

    for i in range(len(s)):
        # add characters to specific rows
        ch_rows[line_no] += s[i]

print(string_zigzag('PAYPALISHIRING', 3))`;

var q3 = `You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

Example 1:

Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
Example 2:

Input: nums = [5], k = 1
Output: 5.00000

Constraints:

n == nums.length
1 <= k <= n <= 105
-104 <= nums[i] <= 104`;

var s3 = `def findMaxAverage(nums, k):
    # Calculate the sum of the first 'k' elements.
    current_sum = sum(nums[:k])
    max_sum = current_sum

    # Use a sliding window to calculate the sum of remaining subarrays of length 'k'.
    for i in range(k, len(nums)):
        # Add the next element and remove the element going out of the window.
        current_sum += nums[i] - nums[i-k]
        max_sum = max(max_sum, current_sum)

    # Return the maximum average value.
    return max_sum / k`;




export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { email } = req.body;
    try {
      // Create the user
      const user = await prisma.user.create({
        data: {
          email,
        },
      });

      // Create the "Example" collection for the new user
      const exampleCollection = await prisma.collection.create({
        data: {
          title: "Example",
          userId: user.id,
          image: "pattern1.svg",
        },
      });

      // Define default problems to add to the "Example" collection
      const defaultProblems = [
        { 
          name: "Two Sum", 
          question: q1, 
          solution: s1, 
          difficulty: Difficulty.Easy,
          collectionId: exampleCollection.id 
        },
        { 
          name: "ZigZag Conversion", 
          question: q2, 
          solution: s2, 
          difficulty: Difficulty.Medium,
          collectionId: exampleCollection.id 
        },
        { 
          name: "Maximum Average Subarray", 
          question: q3, 
          solution: s3, 
          difficulty: Difficulty.Hard,
          collectionId: exampleCollection.id 
        },
        
      ];
      // Create each default problem
      for (const problem of defaultProblems) {
        await prisma.problem.create({
          data: problem,
        });
      }

      console.log("CALLED: /createUser");
      res.status(200).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}