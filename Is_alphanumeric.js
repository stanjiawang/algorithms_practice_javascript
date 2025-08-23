/*
https://www.lintcode.com/problem/23

Is alphanumeric
Given a character c,return true if it is a letter or a number,otherwise return false.

Example 1:
Input:
c = '1'

Output:
true

Explanation:
'1'belongs to the number.
*/

export class Solution {
  /**
   * @param c: A character.
   * @return: The character is alphanumeric or not.
   */
  isAlphanumeric1(c) {
    // write your code here
    return (c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')
  }

  isAlphanumeric2(c) {
    // write your code here
    const reg = /[A-Za-z0-9]/;
    return reg.test(c)
  }
}
