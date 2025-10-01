export class Solution {
  /**
   * @param {number[]} nums - Sorted integer array
   * @param {number} target - Target number to search
   * @return {number} The first position of target, or -1 if not found
   */
  binarySearch(nums, target) {
    // corner case check
    if (!nums || nums.length === 0) {
      return -1;
    }

    let start = 0;
    let end = nums.length - 1;

    // use start + 1 < end to avoid infinite loop
    // ensures start and end always shrink towards each other
    while (start + 1 < end) {
      // JS may overflow with start + end, so use safe formula
      let mid = start + Math.floor((end - start) / 2);

      if (nums[mid] < target) {
        start = mid; // move right
      } else {
        // nums[mid] >= target
        end = mid; // move left
      }
    }

    // post-processing: check remaining two elements
    if (nums[start] === target) {
      return start;
    }
    if (nums[end] === target) {
      return end;
    }

    return -1;
  }
}
