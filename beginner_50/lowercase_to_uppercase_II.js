/*
https://www.lintcode.com/problem/146

Implement an upper method to convert all characters in a string to uppercase.

The characters not in alphabet don't need to convert.

Example 1:
Input: str = "abc"
Output: "ABC"

Example 2:
Input: str = "aBc"
Output: "ABC"

Example 3:
Input: str = "abC12"
Output: "ABC12"
*/

export class Solution {
  /**
   * @param letters: A string
   * @return: A string
   */
  lowercaseToUppercase2(letters) {
    // write your code here
    const res = [];
    const regex = /[a-z]/;
    for (let i = 0; i < letters.length; i++) {
        if (regex.test(letters[i])) {
            let uppercase = String.fromCharCode(letters[i].charCodeAt(0) - 32);
            res.push(uppercase);
        } else {
            res.push(letters[i]);
        }
    }

    return res.join('');
  }
}
