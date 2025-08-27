/*
https://www.lintcode.com/problem/8

Given a character array and an offset, rotate the array by offset in place. (from left to right).

offset >= 0
the length of s >= 0
In place means you should change array in the function.
You don't return anything, we check the s after executing the function, not the return value of function.

Example 1:
Input:
s = "abcdefg"
offset = 3
Output: "efgabcd"
Explanation:
Note that it is rotated in place, that is, after s is rotated, it becomes "efgabcd".

Example 2:
Input:
s = ""abcdefg"
offset = 0
Output: "abcdefg"
Explanation:
Note that it is rotated in place, that is, after s is rotated, it becomes "abcdefg".

Example 3:
Input:
s = ""abcdefg"
offset = 1
Output: "gabcdef"
Explanation:
Note that it is rotated in place, that is, after s is rotated, it becomes "gabcdef".

Example 4:
Input:
s = ""abcdefg"
offset = 2
Output: "fgabcde"
Explanation:
Note that it is rotated in place, that is, after s is rotated, it becomes "fgabcde".

Example 5:
Input:
s = ""abcdefg"
offset = 10
Output: "efgabcd"
Explanation:
Note that it is rotated in place, that is, after s is rotated, it becomes "efgabcd".
*/

export class Solution {
  /**
   * @param s: An array of char
   * @param offset: An integerRotate Character Array
   * @return: nothing
   */
  rotateString(s, offset) {
    // write your code here
    const len = s.length
    const moveTimes = offset % len;

    for (let i = 0; i < moveTimes; i++) {
        s.unshift(s.pop());
    }
  }
}
