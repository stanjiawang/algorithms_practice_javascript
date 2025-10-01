/*
https://www.lintcode.com/course/90/learn/460?chapterId=439&sectionId=3153&ac=true

Find K Closest Elements

Given target, a non-negative integer k and an integer array A sorted in ascending order.
Find the k closest numbers to target in A, sorted in ascending order by the difference between the number and target.
Otherwise, sorted in ascending order by number if the difference is same.

Example 1:
Input: A = [1, 2, 3], target = 2, k = 3
Output: [2, 1, 3]

Example 2:
Input: A = [1, 4, 6, 8], target = 3, k = 3
Output: [4, 1, 6]
*/

export class Solution {
  /**
   * @param arr: sorted array of integers (ascending order)
   * @param target: the number we want to find closest elements to
   * @param k: how many closest numbers to return
   * @return: an array of k numbers ordered by closeness to target
   *          (if tie, smaller number comes first)
   */
  kClosestNumbers(arr, target, k) {
    const n = arr.length;
    if (n === 0 || k <= 0) return [];

    // ---------- Step 1: Binary search for lowerBound ----------
    // lowerBound = first index where arr[i] >= target
    // Template to remember:
    //   search space [left, right)
    //   while (left < right): mid = (left+right)/2
    //   if arr[mid] >= target → move right
    //   else move left
    const lowerBound = (arr, target) => {
      let left = 0, right = arr.length; // half-open interval [left, right)
      while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] >= target) {
          right = mid;   // keep mid (could be the first >= target)
        } else {
          left = mid + 1; // discard left half including mid
        }
      }
      return left; // first index where arr[i] >= target, or n if none
    };

    // right pointer starts at the first >= target
    let right = lowerBound(arr, target);
    // left pointer is the element just before right
    let left = right - 1;

    // ---------- Step 2: Expand outwards k times ----------
    // Compare distance of arr[left] and arr[right] to target
    // If tie, choose arr[left] (smaller number)
    const result = [];
    const total = Math.min(k, n); // in case k > n

    while (result.length < total) {
      // Case 1: left pointer is out of range → must take right side
      if (left < 0) {
        result.push(arr[right]);
        right++;
      }
      // Case 2: right pointer is out of range → must take left side
      else if (right >= n) {
        result.push(arr[left]);
        left--;
      }
      // Case 3: both pointers are valid → pick the closer one
      else {
        const distLeft = Math.abs(arr[left] - target);
        const distRight = Math.abs(arr[right] - target);

        if (distLeft <= distRight) {
          result.push(arr[left]);
          left--;
        } else {
          result.push(arr[right]);
          right++;
        }
      }
    }

    // result is already ordered by closeness (ties resolved by smaller value first)
    return result;
  }
}
