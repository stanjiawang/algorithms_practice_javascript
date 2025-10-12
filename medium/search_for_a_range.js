/*
https://www.lintcode.com/problem/61/?fromId=213&_from=collection

Search for a Range

Given a sorted array of n integers, find the starting and ending position of a given target value.Example 1:

Input:
array = []
target = 9
Output: [-1,-1]
Explanation:
9 is not in the array.

Example 2:
Input:
array = [5, 7, 7, 8, 8, 10]
target = 8
Output: [3,4]
Explanation:
The [3,4] subinterval of the array 1 has the value 8.
If the target is not found in the array, return [-1, -1].
*/

export class Solution {
  /**
   * @param {number[]} nums - sorted array of integers
   * @param {number} target - value to search for
   * @return {number[]} - [firstIndex, lastIndex]
   */
  searchRange(nums, target) {
    // Edge case: empty array
    if (!nums || nums.length === 0) return [-1, -1];

    // --- Helper 1: Find first (leftmost) position of target ---
    const findFirst = () => {
      let left = 0;
      let right = nums.length - 1;
      let firstIndex = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] >= target) {
          // Move left even if nums[mid] === target
          // because there might be another target on the left
          right = mid - 1;
        } else {
          left = mid + 1;
        }

        // Record index when we find the target
        if (nums[mid] === target) firstIndex = mid;
      }

      return firstIndex;
    };

    // --- Helper 2: Find last (rightmost) position of target ---
    const findLast = () => {
      let left = 0;
      let right = nums.length - 1;
      let lastIndex = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] <= target) {
          // Move right even if nums[mid] === target
          // because there might be another target on the right
          left = mid + 1;
        } else {
          right = mid - 1;
        }

        // Record index when we find the target
        if (nums[mid] === target) lastIndex = mid;
      }

      return lastIndex;
    };

    const first = findFirst();
    const last = findLast();

    return [first, last];
  }
}

/*
| Operation       | Complexity   | Explanation                  |
| --------------- | ------------ | ---------------------------- |
| **findFirst()** | O(log n)     | Standard binary search       |
| **findLast()**  | O(log n)     | Standard binary search       |
| **Total**       | **O(log n)** | Two binary searches combined |
| **Space**       | **O(1)**     | Only a few variables used    |
*/

