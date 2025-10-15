/*
https://www.lintcode.com/problem/406/?fromId=213&_from=collection

Minimum Size Subarray Sum

Given an array of n positive integers and a positive integer s,
find the minimal length of a subarray of which the sum ≥ s.
If there isn't one, return -1 instead.

Subarray consist of consecutive elements in an array.
The subarray should contain at least one number.

Input: [2,3,1,2,4,3], s = 7
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Input: [1, 2, 3, 4, 5], s = 100
Output: -1
*/

export class Solution {
  /**
   * @param nums: an array of integers
   * @param s: An integer
   * @return: an integer representing the minimum size of subarray
   */
  minimumSize(nums, s) {
    const n = nums.length;
    let left = 0;
    let sum = 0;
    let minLength = Infinity; // track minimal window length

    for (let right = 0; right < n; right++) {
      sum += nums[right]; // expand window by including nums[right]

      // shrink window from the left while sum >= s
      while (sum >= s) {
        minLength = Math.min(minLength, right - left + 1);
        sum -= nums[left]; // remove leftmost element
        left++; // move window start
      }
    }

    // if no valid subarray found
    return minLength === Infinity ? -1 : minLength;
  }
}

/*
| Type      | Complexity | Explanation                                                    |
| --------- | ---------- | -------------------------------------------------------------- |
| **Time**  | O(n)       | Each element is added and removed from the window at most once |
| **Space** | O(1)       | Only constant extra variables are used                         |
*/
