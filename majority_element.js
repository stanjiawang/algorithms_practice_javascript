/*
https://www.lintcode.com/problem/46

Majority Element
Given an array of integers, the majority number is the number that occurs more than half of the size of the array. Find it.

You may assume that the array is non-empty and the majority number always exist in the array.

Example 1:
Input: array = [1, 1, 1, 1, 2, 2, 2]
Output: 1
Explanation:
The number of 1 in the array is greater than one-half of the array elements.

Example 2:
Input: array = [1, 1, 1, 2, 2, 2, 2]
Output: 2
Explanation:
The number of 2 in the array is greater than one-half of the array elements.
*/


export class Solution {
  /**
   * @param nums: a list of integers
   * @return: find a  majority number
   */
  majorityNumber1(nums) {
    // write your code here
    const sorted = nums.sort();

    return sorted[Math.floor(nums.length / 2)]
  }

  majorityNumber2(nums) {
    // write your code here
    let count = new Map();

    for (let i = 0; i < nums.length; i++) {
      if(count[nums[i]]) {
        count[nums[i]]++;
      } else {
        count[nums[i]] = 1;
      }
    }

    for (const key in count) {
      if (count[key] > Math.floor(nums.length / 2)) {
        return parseInt(key);
      }
    }
  }
}
