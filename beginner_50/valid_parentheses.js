/*
https://www.lintcode.com/problem/423

Valid Parentheses

Given a sequence of parentheses represented by a string containing the following characters: '('、')'、'{'、'}'、'[' and ']', determine whether it is a valid sequence of parentheses, which satisfies the following conditions:

The left parenthesis must be closed by a right parenthesis of the same type
The left parentheses must be closed by right parentheses of the same type
each right parenthesis has a corresponding left parenthesis of the same type

Example 1:
Input: s = "([)]"
Output: False

Example 2:
Input: s = "(){}[]"
Output: True

Example 3:
Input: s = "({})"
Output: True

Example 4:
Input: s = "({[()]})"
Output: True
*/

export class Solution {
  /**
   * @param s: A string
   * @return: whether the string is a valid parentheses
   */
  isValidParentheses(s) {
    // write your code here
    const stack = [];
    if (s[0] === ')' || s[0] === ']' || s[0] === '}') {
        return false;
    }

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
            stack.push(s[i]);
        } else if ((s[i] === ')' && stack[stack.length - 1] === '(') || (s[i] === ']' && stack[stack.length - 1] === '[') || (s[i] === '}' && stack[stack.length - 1] === '{')) {
            stack.pop();
        } else if ((s[i] === ')' && stack[stack.length - 1] !== '(') || (s[i] === ']' && stack[stack.length - 1] !== '[') || (s[i] === '}' && stack[stack.length - 1] !== '{')) {
            return false;
        }
    }

    return stack.length === 0;
  }
}
