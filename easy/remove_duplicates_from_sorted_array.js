/*
Given a sorted integer array nums, remove the duplicates in place such that each element appears only once and return the new length.

Do not allocate extra space for another array — you must do this by modifying the input array in place with O(1) extra memory.

Input:  nums = [1, 1, 2]
Output: 2, nums = [1, 2, _]
Explanation: The function should return length = 2, 
and the first two elements of nums should be 1 and 2.

Input:  nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: 5, nums = [0, 1, 2, 3, 4, _]
*/

export class Solution {
  /**
   * Remove duplicates from a sorted array (in place)
   * @param {number[]} nums - A sorted array of integers
   * @return {number} - The new length of the array with unique elements
   */
  removeDuplicates(nums) {
    // Edge case: if array is empty, return 0
    if (nums.length === 0) return 0;

    // 'uniqueIndex' points to the position of the last unique number
    let uniqueIndex = 0;

    // Start scanning from the second element
    for (let currentIndex = 1; currentIndex < nums.length; currentIndex++) {

      // If we find a new unique value
      if (nums[currentIndex] !== nums[uniqueIndex]) {
        uniqueIndex++; // expand the unique zone
        nums[uniqueIndex] = nums[currentIndex]; // move the new unique element forward
      }
    }

    // The number of unique elements = uniqueIndex + 1
    return uniqueIndex + 1;
  }
}

