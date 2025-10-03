/*
https://www.lintcode.com/course/90/learn/563?chapterId=473&sectionId=3297&ac=true

Backpack V

Given n items with size nums[i] which an integer array and all positive numbers.
An integer target denotes the size of a backpack.
Find the number of possible ways to fill the backpack.
Each item may only be used once

Example 1:
Input:
nums = [1,2,3,3,7]
target = 7
Output: 2
Explanation:
The resulting set is:
[7]
[1,3,3]
Returns 2

Example 2:
Input:
nums = [1,1,1,1]
target = 3
Output: 4
Explanation:
Choose 3 out of 4 items, 4 choices in total
*/

export class Solution {
  /**
   * Backpack V: Count the number of subsets that sum exactly to target.
   * Each item can only be used once (0/1 knapsack counting problem).
   *
   * @param {number[]} nums - positive integers (item sizes)
   * @param {number} target - the backpack capacity
   * @return {number} number of subsets whose sum = target
   */
  backPackV(nums, target) {
    const n = nums.length;

    /**
     * dp[i][s] = number of ways to use the first i items
     *            to fill exactly capacity s.
     *
     * Dimensions:
     *   i ranges from 0..n      (0 = no items, n = all items)
     *   s ranges from 0..target (capacity values from 0 to target)
     */
    const dp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(0));

    /**
     * Initialization:
     * dp[i][0] = 1 for all i
     * Explanation: There is exactly one way to make sum = 0,
     *              by choosing nothing (the empty set).
     */
    for (let i = 0; i <= n; i++) {
      dp[i][0] = 1;
    }

    /**
     * State transition:
     * For each item i (1-based index in dp, corresponds to nums[i-1]):
     *   For each capacity s from 0..target:
     *     Case 1: Do not take item i
     *             → dp[i][s] = dp[i-1][s]
     *     Case 2: Take item i (only if s >= nums[i-1])
     *             → dp[i][s] += dp[i-1][s - nums[i-1]]
     */
    for (let i = 1; i <= n; i++) {
      const value = nums[i - 1]; // current item size
      for (let s = 0; s <= target; s++) {
        // Case 1: not take current item
        dp[i][s] = dp[i - 1][s];

        // Case 2: take current item, if capacity allows
        if (s >= value) {
          dp[i][s] = dp[i][s] + dp[i - 1][s - value];
        }
      }
    }

    /**
     * Final answer:
     * dp[n][target] = number of ways to use all n items
     *                 to exactly fill capacity = target.
     */
    return dp[n][target];
  }
}

/*
Complexity
Time Complexity: O(n * target)
(We iterate through all items and all capacities).

Space Complexity: O(n * target)
(We maintain a 2D dp table).
→ Can be optimized to O(target) with 1D dp.
*/

