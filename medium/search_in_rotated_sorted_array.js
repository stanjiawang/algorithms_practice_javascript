/*
https://www.lintcode.com/problem/62/?fromId=213&_from=collection

Search in Rotated Sorted Array

Suppose a sorted array is rotated at some pivot unknown to you beforehand.
(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

You are given a target value to search. If found in the array return its index, otherwise return -1.
You may assume no duplicate exists in the array.

Example 1:

Input:
array = [4, 5, 1, 2, 3]
target = 1
Output: 2
Explanation:
1 is indexed at 2 in the array.

Example 2:
Input:
array = [4, 5, 1, 2, 3]
target = 0
Output: -1
Explanation:
0 is not in the array. Returns -1.
*/

export class Solution {
  /**
   * Search a target value in a rotated sorted array (no duplicates)
   *
   * @param {number[]} a - Rotated sorted array of unique integers
   * @param {number} target - Value to search for
   * @return {number} - Index of target if found, otherwise -1
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  search(a, target) {
    // 🧱 Edge case: empty or invalid array
    if (!Array.isArray(a) || a.length === 0) return -1;

    let left = 0;
    let right = a.length - 1;

    // 🧭 Standard binary search loop
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      // 🎯 Step 1: Direct match
      if (a[mid] === target) return mid;

      // 🧩 Step 2: Determine which half is sorted
      if (a[left] <= a[mid]) {
        // ✅ Left half is sorted

        // Check if target lies within [a[left], a[mid])
        if (a[left] <= target && target < a[mid]) {
          right = mid - 1; // shrink to left half
        } else {
          left = mid + 1;  // search in right half
        }
      } else {
        // ✅ Right half is sorted

        // Check if target lies within (a[mid], a[right]]
        if (a[mid] < target && target <= a[right]) {
          left = mid + 1;  // shrink to right half
        } else {
          right = mid - 1; // search in left half
        }
      }
    }

    // ❌ Step 3: Not found
    return -1;
  }
}

/*
| Metric               | Complexity   | Explanation                                                     |
| -------------------- | ------------ | --------------------------------------------------------------- |
| **Time Complexity**  | **O(log n)** | Each iteration halves the search range (binary search).         |
| **Space Complexity** | **O(1)**     | Only uses constant auxiliary variables: `left`, `right`, `mid`. |
*/
