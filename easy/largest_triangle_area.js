/*
https://www.lintcode.com/problem/1005/?fromId=213&_from=collection

Largest Triangle Area

You have a list of points in the plane. Return the area of the largest triangle that can be formed by any 3 of the points.
3 <= points.length <= 50.
Points do not repeat.
-50 <= points[i][j] <= 50.
The result error is within 10 ^(-6) and can be considered correct.

Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2
Explanation: 
The five points are show in the figure below. The red triangle is the largest.
*/

export class Solution {
  /**
   * Largest Triangle Area
   * ---------------------
   * Given a set of 2D points, find the largest possible area
   * of any triangle formed by choosing 3 of them.
   *
   * Approach:
   * 1. Enumerate all unique combinations of three points (i < j < k).
   * 2. For each triple, compute the triangle area using the cross product formula:
   *      Area = |(x2 - x1)*(y3 - y1) - (y2 - y1)*(x3 - x1)| / 2
   * 3. Keep track of the maximum area found.
   *
   * Time Complexity:  O(n^3)
   * Space Complexity: O(1)
   *
   * Notes:
   * - The cross product gives the parallelogram area; divide by 2 for the triangle.
   * - Take absolute value to remove orientation sign.
   * - Works well since n ≤ 50 (per LeetCode constraints).
   */
  largestTriangleArea(points) {
    const n = points.length;
    if (n < 3) return 0;

    let maxArea = 0;

    // Helper function: compute the area of a triangle given 3 points
    const triangleArea = (a, b, c) => {
      const [x1, y1] = a;
      const [x2, y2] = b;
      const [x3, y3] = c;

      // Cross product magnitude divided by 2
      const cross = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
      return Math.abs(cross) / 2;
    };

    // Enumerate all unique triples of points
    for (let i = 0; i < n; i++) {          // first point index
      for (let j = i + 1; j < n; j++) {    // second point index
        for (let k = j + 1; k < n; k++) {  // third point index
          const area = triangleArea(points[i], points[j], points[k]);
          maxArea = Math.max(maxArea, area);
        }
      }
    }

    return maxArea;
  }
}
