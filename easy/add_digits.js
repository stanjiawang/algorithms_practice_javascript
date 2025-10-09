/*
https://www.lintcode.com/problem/569/?fromId=213&_from=collection

Add Digits

Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

Input: num=38
Output: 2
Explanation:
The process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return 2.

Input: num=9
Output: 9
Explanation:
9<10,return 9.
*/

export class Solution {
  /**
   * @param {number} num - A non-negative integer
   * @return {number} - The single-digit result after repeatedly summing digits
   */
  addDigits(num) {
    // Continue the process until num becomes a single-digit number
    while (num >= 10) {
      let digitSum = 0;

      // Sum all digits of the current number
      while (num > 0) {
        digitSum += num % 10;        // Extract the last digit
        num = Math.floor(num / 10);  // Remove the last digit
      }

      // Replace num with the newly computed sum
      num = digitSum;
    }

    // When num < 10, we have a single-digit result
    return num;
  }
}

/*
Time Complexity: O(log n) — each round reduces number size by roughly a factor of 10
Space Complexity: O(1)
*/
