/*
https://www.lintcode.com/problem/588/?fromId=213&_from=collection

Partition Equal Subset Sum

Given a non-empty array containing only positive integers,
find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

Each of the array element will not exceed 100.
The array size will not exceed 200.

Input: nums = [1, 5, 11, 5], 
Output: true
Explanation:
two subsets: [1, 5, 5], [11]

Input: nums = [1, 2, 3, 9], 
Output: false
*/

export class Solution {
  /**
   * @param nums: a non-empty array of positive integers
   * @return: true if the array can be partitioned into two subsets with equal sum
   */
  canPartition(nums) {
    // ---- Step 1. Compute total sum of all numbers ----
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    // If total sum is odd, it cannot be evenly split
    if (totalSum % 2 !== 0) return false;

    // ---- Step 2. Target is half of total sum ----
    const target = totalSum / 2;

    // ---- Step 3. Initialize DP array ----
    // dp[j] = true means we can form sum "j" using some of the numbers
    const dp = new Array(target + 1).fill(false);
    dp[0] = true; // Base case: sum = 0 is always achievable (by choosing nothing)

    // ---- Step 4. Iterate over each number (outer loop) ----
    for (const num of nums) {
      // Traverse backwards (target → num) to ensure each number is used only once (0/1 knapsack)
      for (let j = target; j >= num; j--) {
        // Either we already could form j, or we can form (j - num) and add this num
        dp[j] = dp[j] || dp[j - num];
      }
    }

    // ---- Step 5. Result ----
    return dp[target];
  }
}

/*
| Complexity | Value                                     | Explanation                                             |
| ---------- | ----------------------------------------- | ------------------------------------------------------- |
| **Time**   | **O(n × target)** = O(n × (sumTotal / 2)) | For each number, we iterate up to `target`              |
| **Space**  | **O(target)**                             | One-dimensional DP array (space optimized 0/1 knapsack) |
*/


