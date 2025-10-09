/*
https://www.lintcode.com/problem/115/?fromId=213&_from=collection

Unique Paths II

Follow up for "Unique Paths":
A robot is located at the top-left corner of a mxn grid.

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid.

Now consider if some obstacles are added to the grids. How many unique paths would there be?

An obstacle and empty space is marked as 1 and 0 respectively in the grid.
*/

export class Solution {
  /**
   * Count unique paths from top-left to bottom-right with obstacles (1 = blocked, 0 = free).
   * Moves allowed: only Right or Down.
   *
   * @param {number[][]} obstacleGrid - m x n grid, where 1 = obstacle, 0 = empty
   * @return {number} number of unique paths
   */
  uniquePathsWithObstacles(obstacleGrid) {
    const rows = obstacleGrid.length;
    const cols = obstacleGrid[0].length;

    // If start or destination is blocked, no path exists.
    if (obstacleGrid[0][0] === 1 || obstacleGrid[rows - 1][cols - 1] === 1) {
      return 0;
    }

    // ways[r][c] = number of ways to reach cell (r, c)
    const ways = Array.from({ length: rows }, () => new Array(cols).fill(0));

    // Start cell: exactly 1 way to be here (we start here).
    ways[0][0] = 1;

    // Initialize first row:
    // You can only move from left to right. Once an obstacle appears, everything to the right stays 0.
    for (let c = 1; c < cols; c++) {
      if (obstacleGrid[0][c] === 0 && ways[0][c - 1] > 0) {
        ways[0][c] = 1;
      } else {
        ways[0][c] = 0; // explicit else for clarity
      }
    }

    // Initialize first column:
    // You can only move from top to bottom. Once an obstacle appears, everything below stays 0.
    for (let r = 1; r < rows; r++) {
      if (obstacleGrid[r][0] === 0 && ways[r - 1][0] > 0) {
        ways[r][0] = 1;
      } else {
        ways[r][0] = 0; // explicit else for clarity
      }
    }

    // Fill the rest of the table.
    for (let r = 1; r < rows; r++) {
      for (let c = 1; c < cols; c++) {
        if (obstacleGrid[r][c] === 1) {
          // Current cell is blocked: no ways to stand here.
          ways[r][c] = 0;
        } else {
          // Sum of ways from top and left neighbors.
          const fromTop = ways[r - 1][c];
          const fromLeft = ways[r][c - 1];
          ways[r][c] = fromTop + fromLeft;
        }
      }
    }

    return ways[rows - 1][cols - 1];
  }
}
