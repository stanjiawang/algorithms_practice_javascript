/*
https://www.lintcode.com/course/90/learn/1879?chapterId=467&sectionId=3277&ac=true

Two Sum VII

Given an array of integers that is already sorted in ascending order of absolute value, find two numbers so that the sum of them equals a specific number.
The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Note: the subscript of the array starts with 0
You are not allowed to sort this array.

Input: 
[0,-1,2,-3,4]
1
Output: 
[[1,2],[3,4]]
Explanation: 
nums[1] + nums[2] = -1 + 2 = 1, nums[3] + nums[4] = -3 + 4 = 1
You can return [[3,4],[1,2]], the system will automatically help you sort it to [[1,2],[3,4]]. But [[2,1],[3,4]] is invaild.
*/

export class Solution {
  /**
   * @param nums: array sorted by absolute value (distinct numbers)
   * @param target: target sum
   * @return: all index pairs [i, j] with i < j and nums[i] + nums[j] == target
   */
  twoSumVII(nums, target) {
    const length = nums.length;
    if (length < 2) return [];

    const sortedByValueIndices = [];

    // Step 1. Collect negative numbers' indices from right to left.
    // Because nums is sorted by absolute value, the most negative number
    // (smallest value) is at the far right among negatives.
    // Example: [-1, -3, -10] in absolute-value order -> to make ascending by value,
    // we need to traverse them from right to left: [-10, -3, -1].
    for (let i = length - 1; i >= 0; i--) {
      if (nums[i] < 0) {
        sortedByValueIndices.push(i);
      }
    }

    // Step 2. Collect non-negative numbers' indices from left to right.
    // For numbers >= 0, the original order is already ascending by value,
    // so we can simply collect from left to right.
    for (let i = 0; i < length; i++) {
      if (nums[i] >= 0) {
        sortedByValueIndices.push(i);
      }
    }

    // Now sortedByValueIndices represents the array indices in ascending
    // order of the actual number values.
    // Example:
    // nums = [0, -1, 2, -3, 4]
    // sortedByValueIndices = [3, 1, 0, 2, 4]
    // corresponding values = [-3, -1, 0, 2, 4]

    const result = [];

    // Step 3. Apply the standard two-pointer approach on this "value-sorted" index list.
    let leftPointer = 0;
    let rightPointer = sortedByValueIndices.length - 1;

    while (leftPointer < rightPointer) {
      const indexLeft = sortedByValueIndices[leftPointer];
      const indexRight = sortedByValueIndices[rightPointer];
      const sum = nums[indexLeft] + nums[indexRight];

      if (sum === target) {
        // Always return indices in ascending order (indexLeft < indexRight).
        const smallerIndex = Math.min(indexLeft, indexRight);
        const largerIndex = Math.max(indexLeft, indexRight);
        result.push([smallerIndex, largerIndex]);

        // Move both pointers inward after finding a valid pair.
        leftPointer++;
        rightPointer--;
      } else if (sum < target) {
        // If the sum is too small, increase the smaller side.
        leftPointer++;
      } else {
        // If the sum is too large, decrease the larger side.
        rightPointer--;
      }
    }

    return result;
  }
}
