/*
https://www.lintcode.com/problem/125/?fromId=213&_from=collection

Backpack II

There are n items and a backpack with size m. Given array A representing the size of each item and array V representing the value of each item.

What's the maximum value can you put into the backpack?

Example 1:

Input:
m = 10
A = [2, 3, 5, 7]
V = [1, 5, 2, 4]
Output: 9
Explanation:
Put A[1] and A[3] into backpack, getting the maximum value V[1] + V[3] = 9

Example 2:
Input:
m = 10
A = [2, 3, 8]
V = [2, 5, 8]
Output: 10
Explanation:
Put A[0] and A[2] into backpack, getting the maximum value V[0] + V[2] = 10
*/

export class Solution {
  /**
   * Backpack II — 0/1 Knapsack
   * @param {number} m - Backpack capacity
   * @param {number[]} A - Item sizes
   * @param {number[]} V - Item values
   * @return {number} - Maximum achievable value
   */
  backPackII(m, A, V) {
    const n = A.length;
    if (n === 0 || m === 0) return 0;

    // dp[j]: max value with capacity j
    const dp = new Array(m + 1).fill(0);

    // Iterate over each item
    for (let i = 0; i < n; i++) {
      // Traverse capacity backward to ensure 0/1 (each item used once)
      for (let j = m; j >= A[i]; j--) {
        // Option 1: skip current item -> dp[j]
        // Option 2: take current item -> dp[j - A[i]] + V[i]
        dp[j] = Math.max(dp[j], dp[j - A[i]] + V[i]);
      }
    }

    // dp[m] is the max value achievable with full capacity
    return dp[m];
  }
}

/*
Time & Space Complexity
Time	O(n × m)	Loop over all items (n) × capacities (m)
Space	O(m)	1D array dp[0..m]
*/
