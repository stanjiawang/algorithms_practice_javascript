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

// O(n) time complexity and O(1) extra space
export class Solution {
  /**
   * @param nums: absolute-value-sorted array (all numbers distinct)
   * @param target: target sum
   * @return: all index pairs [i, j] with i < j and nums[i] + nums[j] == target
   *
   * Idea:
   * - Build two VIRTUAL iterators (no extra arrays):
   *   * lowIterator: yields indices in increasing numeric order
   *     (negatives from most negative -> less negative, then non-negatives from small -> large)
   *   * highIterator: yields indices in decreasing numeric order
   *     (non-negatives from large -> small, then negatives from less negative -> most negative)
   * - Run classic two-pointer on these two streams.
   * - Each index is advanced at most once by each iterator => O(n) time, O(1) space.
   */
  twoSumVII(nums, target) {
    const n = nums.length;
    const result = [];
    if (n < 2) return result;

    // -------------------------
    // 1) Initialize four cursors
    // -------------------------
    // For lowIterator (increasing numeric):
    //   - lowNeg: rightmost negative (scan from end to find nums[i] < 0)
    //   - lowNonNeg: leftmost non-negative (scan from start to find nums[i] >= 0)
    let lowNeg = n - 1;
    while (lowNeg >= 0 && nums[lowNeg] >= 0) lowNeg--;

    let lowNonNeg = 0;
    while (lowNonNeg < n && nums[lowNonNeg] < 0) lowNonNeg++;

    // For highIterator (decreasing numeric):
    //   - highNonNeg: rightmost non-negative (scan from end to find nums[i] >= 0)
    //   - highNeg: leftmost negative (scan from start to find nums[i] < 0)
    let highNonNeg = n - 1;
    while (highNonNeg >= 0 && nums[highNonNeg] < 0) highNonNeg--;

    let highNeg = 0;
    while (highNeg < n && nums[highNeg] >= 0) highNeg++;

    // -------------------------
    // 2) Helpers to jump to next index of a given sign in-place
    // -------------------------
    function moveLeftToNextNegative(i) {
      // Move left until we hit a negative or run out
      while (--i >= 0 && nums[i] >= 0) {}
      return i;
    }

    function moveRightToNextNegative(i) {
      // Move right until we hit a negative or run out
      while (++i < n && nums[i] >= 0) {}
      return i;
    }

    function moveLeftToNextNonNegative(i) {
      // Move left until we hit a non-negative or run out
      while (--i >= 0 && nums[i] < 0) {}
      return i;
    }

    function moveRightToNextNonNegative(i) {
      // Move right until we hit a non-negative or run out
      while (++i < n && nums[i] < 0) {}
      return i;
    }

    // -------------------------
    // 3) Define the two virtual iterators (return next index or -1 if exhausted)
    // -------------------------
    function advanceLow() {
      // Increasing numeric order:
      //   1) negatives right->left (most negative -> less negative)
      //   2) non-negatives left->right (small -> large)
      if (lowNeg >= 0) {
        const cur = lowNeg;
        lowNeg = moveLeftToNextNegative(lowNeg);
        return cur;
      }
      if (lowNonNeg < n) {
        const cur = lowNonNeg;
        lowNonNeg = moveRightToNextNonNegative(lowNonNeg);
        return cur;
      }
      return -1; // exhausted
    }

    function advanceHigh() {
      // Decreasing numeric order:
      //   1) non-negatives right->left (large -> small)
      //   2) negatives left->right (less negative -> most negative)
      if (highNonNeg >= 0) {
        const cur = highNonNeg;
        highNonNeg = moveLeftToNextNonNegative(highNonNeg);
        return cur;
      }
      if (highNeg < n) {
        const cur = highNeg;
        highNeg = moveRightToNextNegative(highNeg);
        return cur;
      }
      return -1; // exhausted
    }

    // -------------------------
    // 4) Classic two-pointer over the virtual order
    // -------------------------
    let leftIndex = advanceLow();   // index of current smallest (by value)
    let rightIndex = advanceHigh(); // index of current largest (by value)

    // Continue while the numeric order still makes sense: nums[left] <= nums[right]
    while (leftIndex !== -1 && rightIndex !== -1 && nums[leftIndex] <= nums[rightIndex]) {
      if (leftIndex === rightIndex) {
        // Cannot use the same element twice: advance the "smaller" side
        leftIndex = advanceLow();
        continue;
      }

      const sum = nums[leftIndex] + nums[rightIndex];

      if (sum === target) {
        const i = Math.min(leftIndex, rightIndex);
        const j = Math.max(leftIndex, rightIndex);
        result.push([i, j]);

        // Move both ends to seek more pairs (numbers are distinct)
        leftIndex = advanceLow();
        rightIndex = advanceHigh();
      } else if (sum < target) {
        // Need a larger sum -> take a larger number from the low side
        leftIndex = advanceLow();
      } else {
        // Need a smaller sum -> take a smaller number from the high side
        rightIndex = advanceHigh();
      }
    }

    return result;
  }
}
