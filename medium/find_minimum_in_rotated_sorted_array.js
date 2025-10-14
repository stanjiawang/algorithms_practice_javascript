/*
https://www.lintcode.com/problem/159/?fromId=213&_from=collection

Find Minimum in Rotated Sorted Array

Suppose a sorted array in ascending order is rotated at some pivot unknown to you beforehand.
(i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
Find the minimum element.

No duplicate elements in the array.

Input：[4, 5, 6, 7, 0, 1, 2]
Output：0
Explanation：
The minimum value in an array is 0.

Input：[2,1]
Output：1
Explanation：
The minimum value in an array is 1.
*/

export class Solution {
  /**
   * Find the minimum element in a rotated sorted array.
   *
   * Example:
   * [4,5,6,7,0,1,2] → 0
   *
   * @param {number[]} nums - Rotated sorted array (no duplicates)
   * @return {number} The minimum number in the array
   */
  findMin(nums) {
    // ✅ Base case: if the array has only one element, that’s the min.
    if (nums.length === 1) return nums[0];

    let left = 0;
    let right = nums.length - 1;

    // If the array is not rotated (already sorted ascending)
    // e.g., [1,2,3,4,5] → just return the first element.
    if (nums[left] < nums[right]) {
      return nums[left];
    }

    // 🔍 Binary search for the "inflection point" — the smallest element
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);

      // If mid element is greater than right element,
      // that means the minimum is in the *right half* (unsorted side)
      if (nums[mid] > nums[right]) {
        left = mid + 1;
      } else {
        // Otherwise, the minimum is in the *left half*
        // (including mid, because mid could be the minimum itself)
        right = mid;
      }
    }

    // 🏁 When the loop ends, left === right and both point to the minimum
    return nums[left];
  }
}

/*
| Type                 | Explanation                                                | Big O        |
| -------------------- | ---------------------------------------------------------- | ------------ |
| **Time Complexity**  | Each step halves the search range — classic binary search. | **O(log n)** |
| **Space Complexity** | Uses only a few pointers (`left`, `right`, `mid`).         | **O(1)**     |
*/
