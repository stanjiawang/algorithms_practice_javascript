/*
https://www.lintcode.com/problem/37/
Reverse a 3-digit integer.
You can assume the given number is larger or equal to 100 but smaller than 1000.

Example 1:
Input:
number = 123

Output:
321

Explanation:
Reverse the number.

Example 2:
Input:
number = 900

Output:
9

Explanation:
Reverse the number.
*/

export class Solution {
  /**
   * @param number: A 3-digit number.
   * @return: Reversed number.
   */
  reverseInteger(number) {
    // write your code here
    return Number(String(number).split("").reverse().join(""));
  }
}
