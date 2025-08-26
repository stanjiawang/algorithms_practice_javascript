/*
https://www.lintcode.com/problem/767

Reverse the given array nums inplace.

Example 1:
Input : nums = [1,2,5]
Output : [5,2,1]
*/

export class Solution {
  /**
   * @param nums: a integer array
   * @return: nothing
   */
  reverseArray(nums) {
    // write your code here
    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end --;
    }
  }
}
