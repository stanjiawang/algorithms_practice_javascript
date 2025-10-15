/*
https://www.lintcode.com/problem/562/?fromId=213&_from=collection

Backpack IV

Give n items and an array, num[i] indicate the size of ith item.
An integer target denotes the size of backpack.
Find the number of ways to fill the backpack.

Each item may be chosen unlimited number of times

Input: nums = [2,3,6,7] and target = 7
Output: 2
Explanation:
Solution sets are: 
[7]
[2, 2, 3]

Input: nums = [2,3,4,5] and target = 7
Output: 3
Explanation:
Solution sets are: 
[2, 5]
[3, 4]
[2, 2, 3]
*/

export class Solution {
  /**
   * @param {number[]} nums - An array of positive integers (item sizes)
   * @param {number} target - The backpack capacity (target sum)
   * @return {number} - The number of combinations that exactly fill the backpack
   */
  backPackIV(nums, target) {
    // --- Edge Case Check ---
    if (!nums || nums.length === 0 || target <= 0) {
      return 0;
    }

    // dp[i] = number of ways to get sum i
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1; // base case: one way to reach 0 (choose nothing)

    // --- Complete Knapsack DP ---
    // Outer loop over nums ensures we count COMBINATIONS, not PERMUTATIONS.
    for (const item of nums) {
      // For each possible sum j from 'item' to 'target'
      // Because we can reuse the same item unlimited times
      for (let currentSum = item; currentSum <= target; currentSum++) {
        // State transition:
        // Add ways to form (currentSum - item) to ways to form currentSum
        dp[currentSum] += dp[currentSum - item];
      }
    }

    // The number of ways to fill the backpack to exactly 'target'
    return dp[target];
  }
}

/*
| Complexity | Description                                                          |
| ---------- | -------------------------------------------------------------------- |
| **Time**   | **O(n × target)** — Each of the `n` items iterates up to `target`.   |
| **Space**  | **O(target)** — One-dimensional DP array storing combination counts. |
*/
