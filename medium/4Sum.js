/*
https://www.lintcode.com/course/98/learn/58?chapterId=519&sectionId=3936&ac=true

4Sum

Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target?
Find all unique quadruplets in the array which gives the sum of target.

Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a ≤ b ≤ c ≤ d)
The solution set must not contain duplicate quadruplets.

Example 1:
Input: 
numbers = [2,7,11,15]
target = 3
Output: []
Explanation:
2 + 7 + 11 + 15 != 3. There is no quadruple satisfying the condition.

Example 2:
Input:
numbers = [1,0,-1,0,-2,2]
target = 0
Output: [[-1, 0, 0, 1],[-2, -1, 1, 2],[-2, 0, 0, 2]]
Explanation:
There are three different quadruples whose sum of four numbers is 0.
*/

export class Solution {
  /**
   * @param numbers: number[] - input array
   * @param target: number - target sum
   * @return number[][] - all unique quadruplets that sum to target
   */
  fourSum(numbers, target) {
    const n = numbers.length;
    const res = [];
    if (n < 4) return res;

    // 1. Sort the array first
    const nums = [...numbers].sort((a, b) => a - b);

    // 2. Fix the first number (i)
    for (let i = 0; i < n - 3; i++) {
      // Skip duplicate i
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      // --- Pruning for i ---
      // Smallest possible sum with nums[i]
      const minI = nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3];
      if (minI > target) break; // too large, no need to continue
      // Largest possible sum with nums[i]
      const maxI = nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3];
      if (maxI < target) continue; // too small, move to next i

      // 3. Fix the second number (j)
      for (let j = i + 1; j < n - 2; j++) {
        // Skip duplicate j
        if (j > i + 1 && nums[j] === nums[j - 1]) continue;

        // --- Pruning for j ---
        const minJ = nums[i] + nums[j] + nums[j + 1] + nums[j + 2];
        if (minJ > target) break; // too large
        const maxJ = nums[i] + nums[j] + nums[n - 1] + nums[n - 2];
        if (maxJ < target) continue; // too small

        // 4. Use two pointers (l, r) for the last two numbers
        let l = j + 1;
        let r = n - 1;

        while (l < r) {
          const sum = nums[i] + nums[j] + nums[l] + nums[r];

          if (sum === target) {
            // Found a quadruplet
            res.push([nums[i], nums[j], nums[l], nums[r]]);

            // Skip duplicate l
            const lVal = nums[l];
            while (l < r && nums[l] === lVal) l++;

            // Skip duplicate r
            const rVal = nums[r];
            while (l < r && nums[r] === rVal) r--;
          } else if (sum < target) {
            l++; // Need bigger sum → move left pointer right
          } else {
            r--; // Need smaller sum → move right pointer left
          }
        }
      }
    }

    return res;
  }
}
