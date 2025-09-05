/*
https://www.lintcode.com/course/98/learn/1319?chapterId=517&sectionId=3905&ac=true

Contains Duplicate II

Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j] and the absolute difference between i and j is at most k.

Example 1：
Input：nums = [1,2,1], k = 0
Output：False

Example 2：
Input：nums = [1,2,1], k = 2
Output：True
Explanation：nums[0] = nums[2] and 2 - 0 <= 2
*/

export class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {boolean}
   */
  containsNearbyDuplicate(nums, k) {
    if (!Array.isArray(nums) || nums.length < 2 || k < 0) return false;

    const lastSeen = new Map(); // value -> last index

    for (let i = 0; i < nums.length; i++) {
      const val = nums[i];
      if (lastSeen.has(val) && i - lastSeen.get(val) <= k) {
        return true;
      }
      lastSeen.set(val, i);
    }
    return false;
  }
}
