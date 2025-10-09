/*
Given an array of integers nums and an integer k, return an array containing the sum of each contiguous subarray (window) of size k as it slides from the left to the right of the array.

The window moves one position at a time.

If the array is shorter than k, return an empty array.

Input:
nums = [1, 2, 7, 8, 5, 9, 10, 12, 14]
k = 3

Output:
[10, 17, 20, 22, 24, 31, 36]
*/

export class Solution {
  /**
   * Compute the sum of each sliding window of size k.
   * 
   * @param {number[]} nums - Input array of integers
   * @param {number} k - Window size
   * @return {number[]} - Array of sums for each window
   */
  winSum(nums, k) {
    const n = nums.length;
    if (n === 0 || k === 0 || k > n) return [];

    const result = [];
    let windowSum = 0;

    // Step 1: Initialize the first window sum
    for (let i = 0; i < k; i++) {
      windowSum += nums[i];
    }
    result.push(windowSum);

    // Step 2: Slide the window across the array
    for (let i = k; i < n; i++) {
      // Add the new element entering the window
      windowSum += nums[i];
      // Subtract the old element leaving the window
      windowSum -= nums[i - k];
      // Store the new sum
      result.push(windowSum);
    }

    return result;
  }
}
