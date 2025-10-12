/*
https://www.lintcode.com/problem/38/?fromId=213&_from=collection

Search a 2D Matrix II

Write an efficient algorithm that searches for a value in an m x n matrix, return The number of occurrence of it.

This matrix has the following properties:

Integers in each row are sorted from left to right.
Integers in each column are sorted from up to bottom.
No duplicate integers in each row or column.

Example 1:
Input:
matrix = [[3,4]]
target = 3
Output: 1
Explanation:
There is only one 3 in the matrix.

Example 2:
Input:
matrix = [
      [1, 3, 5, 7],
      [2, 4, 7, 8],
      [3, 5, 9, 10]
    ]
target = 3
Output: 2
Explanation:
There are two 3 in the matrix.
*/

export class Solution {
  /**
   * @param {number[][]} matrix - 2D sorted matrix
   * @param {number} target - value to search
   * @return {number} - total number of occurrences of target
   */
  searchMatrix(matrix, target) {
    // ✅ 1. Edge case: empty matrix
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
      return 0;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    let count = 0;

    // ✅ 2. Start from the top-right corner
    let row = 0;
    let col = cols - 1;

    // ✅ 3. Traverse while within matrix bounds
    while (row < rows && col >= 0) {
      const value = matrix[row][col];

      if (value === target) {
        // Found one occurrence
        count++;

        // Move down to check if target appears again in lower rows
        // (no need to move left, since each row has unique numbers)
        row++;
      } else if (value > target) {
        // Current value too large → move left to smaller values
        col--;
      } else {
        // Current value too small → move down to larger values
        row++;
      }
    }

    return count;
  }
}

/*
| 类型                   | 说明                                |
| -------------------- | --------------------------------- |
| **Time Complexity**  | O(m + n) — 每次移动要么向左、要么向下，最多 m+n 步 |
| **Space Complexity** | O(1) — 只使用常数额外变量                  |
*/
