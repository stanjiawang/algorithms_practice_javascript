/*
https://www.lintcode.com/problem/263

Matching of parentheses

Given a string containing just the characters '(', ')', determine if the input string is valid.

The brackets must close in the correct order, "()" and "()" are all valid but "(]" and ")(" are not.

Example 1:
Input: ")("
Output: False

Example 2:
Input: "()"
Output: True
*/

export class Solution {
  /**
   * @param string: A string
   * @return: whether the string is valid 
   */
  matchParentheses(string) {
    // write your code here
    let stack = [];
    for (const char of string) {
        if (char == '(') {
            stack.push('(');
        } else {
            if (char == ")" && stack.length == 0) {
                return false;
            } else {
                stack.pop();
            }
        }
    }
    return stack.length === 0;
  }
}
