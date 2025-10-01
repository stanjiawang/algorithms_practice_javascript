/*
https://www.lintcode.com/course/98/learn/89?chapterId=519&sectionId=3937&ac=true

k Sum

Given n distinct positive integers, integer k (k≤n) and a number target.
Find k numbers where sum is target. Calculate how many solutions there are?

Example 1:
Input:
A = [1,2,3,4]
k = 2
target = 5
Output: 2
Explanation:
1 + 4 = 2 + 3 = 5

Example 2:
Input:
A = [1,2,3,4,5]
k = 3
target = 6
Output: 1
Explanation:
There is only one method. 1 + 2 + 3 = 6
*/

export class Solution {
  /**
   * @param nums: An integer array of distinct positive numbers
   * @param k: How many numbers we must pick
   * @param target: The target sum we want to achieve
   * @return: The number of ways to pick exactly k numbers whose sum = target
   */
  kSum(nums, k, target) {
    // dp[chooseCount][sumValue] = number of ways
    // Dimensions: (k+1) x (target+1)
    const dp = Array.from({ length: k + 1 }, () => Array(target + 1).fill(0));

    // Base case: 1 way to pick 0 numbers with sum = 0
    dp[0][0] = 1;

    // Iterate each number in nums
    for (const num of nums) {
      // Go backwards so we don’t reuse the same number more than once
      for (let chooseCount = k; chooseCount >= 1; chooseCount--) {
        for (let sumValue = target; sumValue >= num; sumValue--) {
          // Transition:
          // - We can form (chooseCount, sumValue) by:
          //   taking "num" + a valid way to form (chooseCount-1, sumValue-num)
          dp[chooseCount][sumValue] += dp[chooseCount - 1][sumValue - num];
        }
      }
    }

    // Answer = number of ways to pick exactly k numbers to make sum = target
    return dp[k][target];
  }
}


// Time: O(n * k * target)
// Space: O(k * target)
