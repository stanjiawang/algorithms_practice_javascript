/*
https://www.lintcode.com/problem/407

Plus One

Given a non-negative number represented as an array of digits, plus one to the number.Returns a new array.

The number is arranged according to the number of digits, with the highest digit at the top of the list.

Example 1:
Input: [1,2,3]
Output: [1,2,4]

Example 2:
Input: [9,9,9]
Output: [1,0,0,0]
*/

export class Solution {
  /**
   * @param digits: a number represented as an array of digits
   * @return: the result
   */
  plusOne(digits) {
    // write your code here
    const numberString = digits.join("");
    const number = Number(numberString);

    const resNum = number + 1;
    const resString = resNum.toString();

    const resStringArray = resString.split('');

    const res = resStringArray.map((i) => {
        return Number(i);
    })

    return res;
  }
}
