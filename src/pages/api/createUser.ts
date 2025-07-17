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