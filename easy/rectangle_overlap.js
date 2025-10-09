/*
Rectangle Overlap

Given two axis-aligned rectangles rec1 and rec2, return true if they overlap, otherwise return false.
Each rectangle is represented as an array of 4 integers: [x1, y1, x2, y2]
Where:
(x1, y1) → bottom-left corner
(x2, y2) → top-right corner
A rectangle is valid only when x1 < x2 and y1 < y2.
Two rectangles overlap if their intersection area is positive
if they only touch edges or corners, that is not an overlap.

Input: rec1 = [0, 0, 2, 2], rec2 = [1, 1, 3, 3]
Output: true
Explanation: They overlap in a 1×1 square area.

Input: rec1 = [0, 0, 1, 1], rec2 = [1, 0, 2, 1]
Output: false
Explanation: They only touch at the edge, no overlapping area.
*/

export class Solution {
  /**
   * Check if two axis-aligned rectangles overlap
   * @param {number[]} rec1 - [x1, y1, x2, y2] of rectangle 1
   * @param {number[]} rec2 - [x1, y1, x2, y2] of rectangle 2
   * @return {boolean} true if they overlap, false otherwise
   */
  isRectangleOverlap(rec1, rec2) {
    // Case 1: one rectangle is completely to the left of the other
    const noOverlapHorizontally = rec1[2] <= rec2[0] || rec2[2] <= rec1[0];

    // Case 2: one rectangle is completely above or below the other
    const noOverlapVertically = rec1[3] <= rec2[1] || rec2[3] <= rec1[1];

    // If either case is true, they don't overlap
    // Otherwise, they do overlap
    return !(noOverlapHorizontally || noOverlapVertically);
  }
}


