/*
https://www.lintcode.com/course/98/learn/141/description?chapterId=519&sectionId=3940&ac=false

Sqrt(x)

Implement int sqrt(int x).
Compute and return the square root of x.

Example 1:
	Input:  0
	Output: 0

Example 2:
	Input:  3
	Output: 1
	
	Explanation:
	return the largest integer y that y*y <= x. 
	
Example 3:
	Input:  4
	Output: 2
*/

export class Solution {
  /**
   * @param x: An integer
   * @return: The integer square root of x
   */
  sqrt(x) {
    // Edge cases
    if (x < 2) return x;

    // Start with a guess = x
    let g = x;

    // Keep refining guess until g*g <= x
    while (g * g > x) {
      // Update guess using Newton’s formula:
      // g_next = (g + x/g) / 2
      g = Math.floor((g + Math.floor(x / g)) / 2);
    }

    return g;
  }
}
