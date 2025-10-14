/*
https://www.lintcode.com/problem/374/?fromId=213&_from=collection

Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

Input:	[[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]]
Output: [1,2,3,6,9,8,7,4,5]

Input:	[[ 6,4,1 ], [ 7,8,9 ]]
Output: [6,4,1,9,8,7]
*/

export class Solution {
  /**
   * Return all elements of a 2D matrix in spiral order.
   * @param {number[][]} matrix - 2D matrix (m rows × n columns)
   * @return {number[]} - elements in spiral order
   */
  spiralOrder(matrix) {
    // Handle empty matrix
    if (!matrix || matrix.length === 0) return [];

    const result = [];
    let top = 0;                          // upper boundary
    let bottom = matrix.length - 1;       // lower boundary
    let left = 0;                         // left boundary
    let right = matrix[0].length - 1;     // right boundary

    // Continue until boundaries overlap
    while (top <= bottom && left <= right) {
      // 1️⃣ Traverse the top row (left → right)
      for (let col = left; col <= right; col++) {
        result.push(matrix[top][col]);
      }
      top++; // shrink the top boundary inward

      // 2️⃣ Traverse the right column (top → bottom)
      for (let row = top; row <= bottom; row++) {
        result.push(matrix[row][right]);
      }
      right--; // shrink the right boundary inward

      // 3️⃣ Traverse the bottom row (right → left)
      // Only if there’s still a remaining row
      if (top <= bottom) {
        for (let col = right; col >= left; col--) {
          result.push(matrix[bottom][col]);
        }
        bottom--; // shrink the bottom boundary inward
      }

      // 4️⃣ Traverse the left column (bottom → top)
      // Only if there’s still a remaining column
      if (left <= right) {
        for (let row = bottom; row >= top; row--) {
          result.push(matrix[row][left]);
        }
        left++; // shrink the left boundary inward
      }
    }

    return result;
  }
}
/*
| Metric    | Complexity                  | Reason                                         |
| --------- | --------------------------- | ---------------------------------------------- |
| **Time**  | **O(m × n)**                | Each matrix element is visited exactly once    |
| **Space** | **O(1)** (excluding output) | Only four integer pointers used for boundaries |
*/
