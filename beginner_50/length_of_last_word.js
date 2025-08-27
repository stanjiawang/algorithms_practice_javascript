/*
https://www.lintcode.com/problem/422

Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word in the string.
A word is the largest substring consisting only of letters and containing no space characters.

1≤s.length≤10^4
s contains at least one word
s contains only upper and lower case letters and spaces

Example 1:
Input: "Hello World"
Output: 5

Example 2:
Input: "Hello LintCode"
Output: 8
*/

export class Solution {
  /**
   * @param s: A string
   * @return: the length of last word
   */
  lengthOfLastWord(s) {
    // write your code here
    const stringArray = s.trim().split(/\s+/);

    const length = stringArray.length;

    return stringArray[length - 1].length;
  }
}
