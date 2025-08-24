/*
https://www.lintcode.com/problem/297
Find the maximum
Find the maximum of n numbers.

We promise that all numbers in the list are in the range of int.

Example 1:
Input：[1, 2, 3, 4, 5]
Output：5
*/

export class Solution {
  /**
   * @param nums: the list of numbers
   * @return: return the maximum number.
   */
  maxNum(nums) {
    // write your code here
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        if (max < nums[i]) {
            max = nums[i]
        }
    }

    return max;
  }
}
