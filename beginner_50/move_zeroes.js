/*
https://www.lintcode.com/problem/539

Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Example 1:
Input: nums = [0, 1, 0, 3, 12],
Output: [1, 3, 12, 0, 0].

Example 2:
Input: nums = [0, 0, 0, 3, 1],
Output: [3, 1, 0, 0, 0].
*/

export class Solution {
  /**
   * @param nums: an integer array
   * @return: nothing
   */
  moveZeroes(nums) {
    // write your code here
    let zeroCount = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            nums.splice(i, 1);
            zeroCount++;
            i--;
        } 
    }

    for (let j = 0; j < zeroCount; j++) {
        nums.push(0);
    }
  }
}
