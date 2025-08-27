/*
https://www.lintcode.com/problem/491

Check a positive number is a palindrome or not.

A palindrome number is that if you reverse the whole number you will get exactly the same number.
It's guaranteed the input number is a 32-bit integer, but after reversion, the number may exceed the 32-bit integer.

Example 1:
Input:11
Output:true

Example 2:
Input:1232
Output:false
Explanation: 1232!=2321
*/

export class Solution {
  /**
   * @param num: a positive number
   * @return: true if it's a palindrome or false
   */
  isPalindrome(num) {
    // write your code here
    const str = num.toString();
    const len = str.length;

    let start = 0;
    let end = len - 1;

    while (start < end) {
        if (str[start] !== str[end]) {
            return false;
        }
        start++;
        end--;
    }

    return true;
  }
}
