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

/*
观察小写字母和大写字母的 ASCII 码表示：

小写字母 a - z 的 ASCII 码范围为 [97,122]
大写字母 A - Z 的 ASCII 码范围为 [65,90]

// 获取字符的 ASCII 码
console.log("A".charCodeAt(0)); // 65
console.log("a".charCodeAt(0)); // 97

// 根据 ASCII 码生成字符
console.log(String.fromCharCode(65)); // "A"
console.log(String.fromCharCode(97)); // "a"

// 输出 32 到 126 的可见字符
for (let i = 32; i <= 126; i++) {
  console.log(i, String.fromCharCode(i));
}
*/


