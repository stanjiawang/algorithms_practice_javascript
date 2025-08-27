/*
https://www.lintcode.com/problem/1535

Implement function ToLowerCase() that has a string parameter str.And convert the uppercase letters in the string to lowercase letters, and then return the new string.

Example 1:
Input: "Hello"
Output: "hello"

Example 2:
Input: "here"
Output: "here"

Example 3:
Input: "LOVELY"
Output: "lovely"
*/

export class Solution {
  /**
   * @param s: the input string
   * @return: The lower case string
   */
  toLowerCase(s) {
    // Write your code here
    let result = "";

    for (let char of s) {
        if (char >= "A" && char <= "Z") {
            const lower = String.fromCharCode(char.charCodeAt(0) + 32);
            result += lower;
        } else {
            result += char;
        }
    }

    return result;
  }
}
