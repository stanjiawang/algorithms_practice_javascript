/*
https://www.lintcode.com/problem/114/?fromId=213&_from=collection

Unique Paths

A robot is located at the top-left corner of a m×n grid.

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid.

How many possible unique paths are there?
*/

export class Solution {
  /**
   * @param {number} m - number of rows
   * @param {number} n - number of columns
   * @return {number} total number of unique paths
   */
  uniquePaths(m, n) {
    // Step 1️⃣: Create a 2D DP array filled with 0
    // dp[i][j] represents the number of unique paths to reach cell (i, j)
    const dp = Array.from({ length: m }, () => Array(n).fill(0));

    // Step 2️⃣: Initialize the first row and first column
    // Because there's only one way to reach any cell in the first row (move right)
    // or the first column (move down)
    for (let row = 0; row < m; row++) {
      dp[row][0] = 1;
    }
    for (let col = 0; col < n; col++) {
      dp[0][col] = 1;
    }

    // Step 3️⃣: Fill the rest of the grid using the recurrence relation
    // dp[i][j] = dp[i-1][j] + dp[i][j-1]
    // The robot can only come from the top or from the left
    for (let row = 1; row < m; row++) {
      for (let col = 1; col < n; col++) {
        dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
      }
    }

    // Step 4️⃣: Return the bottom-right cell as the result
    return dp[m - 1][n - 1];
  }
}


