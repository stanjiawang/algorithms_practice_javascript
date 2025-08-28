/*
https://www.lintcode.com/course/98

Given an array with n objects colored red, white or blue, sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Example:
Input : [1, 0, 1, 2]
Output : [0, 1, 1, 2]
Explanation : sort it in-place

Could you come up with an one-pass algorithm using only O(1) space?
*/

export class Solution {
  /**
   * @param nums: A list of integer which is 0, 1 or 2
   * @return: nothing
   */
  sortColors(nums) {
    // write your code here
    let low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
     }
  }
}
