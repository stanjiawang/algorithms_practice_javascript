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
   * @param arr: sorted ascending array
   * @param target: the reference number
   * @param k: how many closest numbers to return
   * @return: k numbers ordered by closeness to target
   *          (if tie → smaller number first)
   */
  kClosestNumbers(arr, target, k) {
    const n = arr.length;
    if (n === 0 || k <= 0) return [];

    // ---------- Step 1: Binary search for lowerBound ----------
    // lowerBound = first index where arr[i] >= target
    // Template:
    //   while (left < right)
    //     mid = (left+right)/2
    //     if arr[mid] >= target → move right = mid
    //     else → move left = mid+1
    const lowerBound = (arr, target) => {
      let left = 0, right = arr.length; // search in [left, right)
      while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] >= target) {
          right = mid;   // keep mid, might still be the first >= target
        } else {
          left = mid + 1; // discard the left half
        }
      }
      return left; // left is the first >= target, or n if none
    };

    // right = first element >= target
    let right = lowerBound(arr, target);
    // left = one position before right (last < target)
    let left = right - 1;

    // ---------- Step 2: Expand with two pointers ----------
    // Rules:
    //   - If left is out of range → take from right
    //   - If right is out of range → take from left
    //   - If both are valid → compare distances
    //   - If distances are equal → prefer left (smaller number)
    const result = [];
    const total = Math.min(k, n);

    while (result.length < total) {
      // Case 1: left pointer exhausted → must take from right
      if (left < 0) {
        result.push(arr[right]);
        right++;
      }
      // Case 2: right pointer exhausted → must take from left
      else if (right >= n) {
        result.push(arr[left]);
        left--;
      }
      // Case 3: both pointers valid → choose closer one
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

    return result; // already ordered by closeness
  }
}

/*
Time: O(log n + k)
Space: O(k) (for output), O(1) extra
*/
