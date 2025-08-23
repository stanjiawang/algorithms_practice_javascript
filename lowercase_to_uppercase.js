/*
https://www.lintcode.com/problem/145
Lowercase to Uppercase

Convert a lowercase character to uppercase.

Example 1:
Input: 'a'

Output: 'A'

Example 2:
Input: 'b'

Output: 'B'
*/

export class Solution {
  /**
   * @param character: a character
   * @return: a character
   */
  lowercaseToUppercase1(character) {
    // write your code here
    return String.fromCharCode(character.charCodeAt()-32)
  }

  lowercaseToUppercase2(character) {
    // write your code here
    return character.toUpperCase();
  }
}
