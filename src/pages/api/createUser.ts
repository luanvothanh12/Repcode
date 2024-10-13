import prisma from "../../../prisma_client"; 
import { NextApiRequest, NextApiResponse } from 'next';

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

var s1 = `# dont like this solution? Edit it to something else
# by going back to the collection

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {}  # val -> index

        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i`;

var f1 = `class Solution:
  def twoSum(self, nums: List[int], target: int) -> List[int]:
`;

var n1 = `- use a map where key=number you have come across so far, value=its index`;



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

var s2 = `class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if(numRows < 2):
            return s
        arr = ['' for i in range(numRows)]
        direction = 'down'
        row = 0
        for i in s:
            arr[row] += i
            if row == numRows-1:
                direction = 'up'
            elif row == 0:
                direction = 'down'
            if(direction == 'down'):
                row += 1
            else:
                row -= 1
        return(''.join(arr))`;

var f2 = `class Solution:
    def convert(self, s: str, numRows: int) -> str:
`;

var n2 = `- from one char to the next, on the same line, you jump (row-1) * 2`;


var q3 = `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).


Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.


Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106`;

var s3 = `# Time: log(min(n, m))

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        total = len(nums1) + len(nums2)
        half = total // 2

        if len(B) < len(A):
            A, B = B, A

        l, r = 0, len(A) - 1
        while True:
            i = (l + r) // 2  # A
            j = half - i - 2  # B

            Aleft = A[i] if i >= 0 else float("-infinity")
            Aright = A[i + 1] if (i + 1) < len(A) else float("infinity")
            Bleft = B[j] if j >= 0 else float("-infinity")
            Bright = B[j + 1] if (j + 1) < len(B) else float("infinity")

            # partition is correct
            if Aleft <= Bright and Bleft <= Aright:
                # odd
                if total % 2:
                    return min(Aright, Bright)
                # even
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            elif Aleft > Bright:
                r = i - 1
            else:
                l = i + 1`;
      
  var f3 = `class Solution:
      def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
  `;

  var n3 = `- I like this explanation: https://www.youtube.com/watch?v=_TCw4LXpKq0`;





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
          newCount: 3
        },
      });

      // Define default problems to add to the "Example" collection
      const defaultProblems = [
        { 
          name: "Two Sum", 
          question: q1, 
          solution: s1, 
          functionSignature: f1, 
          notes: n1, 
          link: "https://leetcode.com/problems/two-sum/", 
          difficulty: Difficulty.Easy,
          collectionId: exampleCollection.id 
        },
        { 
          name: "ZigZag Conversion", 
          question: q2, 
          solution: s2,
          functionSignature: f2, 
          notes: n2, 
          link: "https://leetcode.com/problems/zigzag-conversion/", 
          difficulty: Difficulty.Medium,
          collectionId: exampleCollection.id 
        },
        { 
          name: "Median of Two Sorted Arrays", 
          question: q3, 
          solution: s3, 
          functionSignature: f3, 
          notes: n3, 
          link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", 
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