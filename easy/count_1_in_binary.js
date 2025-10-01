/*
https://www.lintcode.com/course/98/learn/365?chapterId=519&sectionId=3939&ac=true

Count 1 in Binary

Count how many 1 in binary representation of a 32-bit integer.

Example 1:
Input: 32
Output: 1
Explanation:
32(100000), return 1.

Example 2:
Input: 5
Output: 2
Explanation:
5(101), return 2.
*/

export class Solution {
  /**
   * @param num: An integer
   * @return: An integer, the number of ones in num
   */
  countOnes(num) {
    let count = 0;

    // Loop until all 1 bits are cleared
    while (num !== 0) {
      // Trick: n & (n - 1) clears the lowest set bit (the rightmost 1)
      // Example: 12 (1100) & 11 (1011) = 8 (1000)
      num = num & (num - 1);

      // Each time we clear one '1', increase the counter
      count++;
    }

    // Return the total number of 1 bits
    return count;
  }
}
