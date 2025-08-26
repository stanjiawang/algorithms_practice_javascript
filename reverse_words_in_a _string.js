/*
https://www.lintcode.com/problem/53

Given an input string, reverse the string word by word.

Example 1:
Input: s = "the sky is blue"
Output: "blue is sky the"
Explanation:
return a reverse the string word by word.

Example 2:
Input: s = "hello world"
Output: "world hello"
Explanation:
return a reverse the string word by word.
*/

export class Solution {
  /**
   * @param s: A string
   * @return: A string
   */
  reverseWords(s) {
    // write your code here
    const stringArray = s.trim().split(/\s+/);

    let start = 0;
    let end = stringArray.length - 1;
    while (end > start) {
        [stringArray[start], stringArray[end]] = [stringArray[end], stringArray[start]];
        start++;
        end--;
    }

    const res = stringArray.join(" ");
    return res;
  }
}
