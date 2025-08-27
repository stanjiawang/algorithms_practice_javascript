/*
https://www.lintcode.com/problem/1343

Given you two strings which are only contain digit character. You need to return a string spliced by the sum of the bits.
A and B are strings which are composed of numbers

Example 1:
Input:
A = "99"
B = "111"
Output:
"11010"
Explanation:
Formatted: A = "099", B = "111"
Because 0 + 1 = 1, 9 + 1 = 10, 9 + 1 = 10
The result after concatenation is "1" + "10" + "10" -> "11010"

Example 2:
Input:
A = "2"
B = "321"
Output:
"323"
Explanation:
Formatted: A = "002"，B = "321"
Because 0 + 3 = 3，0 + 2 = 2，2 + 1 = 3
The result after concatenation is "3" + "2" + "3" -> "323"
*/

export class Solution {
  /**
   * @param {string} a
   * @param {string} b
   * @return {string}
   */
  sumofTwoStrings(a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    let res = "";

    while (i >= 0 || j >= 0) {
      const da = i >= 0 ? Number(a[i]) : 0;
      const db = j >= 0 ? Number(b[j]) : 0;

      const sum = da + db;          // no carry; just sum the two digits
      res = sum.toString() + res;   // prepend to keep correct order

      i--;
      j--;
    }
    return res;
  }
}
