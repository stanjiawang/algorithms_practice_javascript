/*
https://www.lintcode.com/problem/479

Find the second max number in a given array.

Example1:
Input: [1,3,2,4]
Output: 3

Example2:
Input: [1,1,2,2]
Output: 2
*/

export class Solution {
  /**
   * @param nums: An integer array
   * @return: The second max number in the array.
   */
  secondMax(nums) {
    // write your code here
    let max, secondMax;
    if (nums[0] >= nums[1]) {
        max = nums[0];
        secondMax = nums[1];
    } else {
        max = nums[1];
        secondMax = nums[0];
    }

    for (let i = 2; i < nums.length; i++) {
        if (nums[i] >= max) {
            secondMax = max;
            max = nums[i];
        } else if (nums[i] >= secondMax && nums[i] <= max) {
            secondMax = nums[i];
        }
    }

    return secondMax;
  }
}
