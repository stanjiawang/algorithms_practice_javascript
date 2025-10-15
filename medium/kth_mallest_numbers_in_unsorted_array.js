/*
https://www.lintcode.com/problem/461

Kth Smallest Numbers in Unsorted Array

Find the k smallest numbers in an unsorted integer array.
You may return the result in any order.
Make sure your algorithm is efficient for large input arrays.

Input: nums = [3, 4, 1, 2, 5], k = 3
Output: [1, 2, 3]
Explanation: The 3 smallest numbers are 1, 2, and 3.

Input: nums = [9, 8, 7, 6, 5], k = 1
Output: [5]

Approach 1 — Max-Heap (Priority Queue)

We maintain a max-heap of size k.
Iterate over all numbers.
Push each number into the heap.
If heap size exceeds k, pop the largest number.
The heap now contains the k smallest numbers.
Time Complexity: O(n log k)
Space Complexity: O(k)
*/

export class Solution {
  /**
   * @param nums: an integer array
   * @param k: an integer
   * @return: the k smallest numbers in nums
   */
  kthSmallestNumbers(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) return [];
    if (k >= nums.length) return nums;

    // -------- Helper: Partition Function --------
    const partition = (left, right) => {
      // Pick a random pivot to avoid worst-case
      const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
      const pivotValue = nums[pivotIndex];
      [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]]; // move pivot to end

      let storeIndex = left;
      for (let i = left; i < right; i++) {
        if (nums[i] < pivotValue) {
          [nums[i], nums[storeIndex]] = [nums[storeIndex], nums[i]];
          storeIndex++;
        }
      }

      // Move pivot to its final position
      [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];
      return storeIndex;
    };

    // -------- Helper: QuickSelect Function --------
    const quickSelect = (left, right, kIndex) => {
      if (left >= right) return;
      const pivotIndex = partition(left, right);

      if (pivotIndex === kIndex) return;
      else if (pivotIndex > kIndex) quickSelect(left, pivotIndex - 1, kIndex);
      else quickSelect(pivotIndex + 1, right, kIndex);
    };

    // Run QuickSelect to put k smallest in front
    quickSelect(0, nums.length - 1, k - 1);

    // Return first k elements (they are the smallest)
    return nums.slice(0, k);
  }
}



