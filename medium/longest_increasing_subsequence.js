/*
https://www.lintcode.com/course/90/learn/76?chapterId=473&sectionId=3298&ac=true

Longest Increasing Subsequence

Given a sequence of integers, find the longest increasing subsequence (LIS).
You code should return the length of the LIS.

Example 1:
Input:
nums = [5,4,1,2,3]
Output: 3
Explanation:
LIS is [1,2,3]

Example 2:
Input:
nums = [4,2,4,5,3,7]
Output: 4
Explanation:
LIS is [2,4,5,7]
*/

export class Solution {
  /**
   * @param {number[]} nums - The input integer array
   * @return {number} - The length of the Longest Increasing Subsequence (LIS)
   *
   * Approach: Dynamic Programming (O(n^2))
   *
   * Definition:
   *   dp[i] = the length of the longest strictly increasing subsequence
   *           that ends with element nums[i].
   *
   * Transition:
   *   For each index i:
   *     Look at all indices j < i:
   *       If nums[j] < nums[i], then nums[i] can be appended to the LIS ending at nums[j].
   *       So: dp[i] = Math.max(dp[i], dp[j] + 1)
   *
   * Initialization:
   *   Every element itself is a subsequence of length 1,
   *   so initialize dp[i] = 1 for all i.
   *
   * Answer:
   *   The maximum value in dp[].
   *
   * Complexity:
   *   Time = O(n^2), Space = O(n)
   */
  longestIncreasingSubsequence(nums) {
    if (!Array.isArray(nums) || nums.length === 0) return 0;

    const n = nums.length;
    const dp = new Array(n).fill(1); // At least 1 (each element itself)

    let globalBest = 1;

    // For each element, try to extend LIS from all previous elements
    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[j] < nums[i]) {
          // Either keep the current dp[i],
          // or extend the subsequence ending at j by nums[i]
          dp[i] = Math.max(dp[i], dp[j] + 1);
        }
      }
      globalBest = Math.max(globalBest, dp[i]); // Update overall LIS
    }

    return globalBest;
  }
}

  /**
   * DP with path reconstruction (strictly increasing)
   * Returns both length and one actual LIS sequence.
   *
   * dp[i]  = length of LIS ending at i
   * prev[i]= predecessor index of i in the chosen LIS (or -1 if none)
   *
   * Time: O(n^2), Space: O(n)
   *
   * @param {number[]} nums
   * @return {{ length: number, sequence: number[] }}
   */
  longestIncreasingSubsequenceWithPathDP(nums) {
    if (!Array.isArray(nums) || nums.length === 0) {
      return { length: 0, sequence: [] };
    }

    const n = nums.length;
    const dp = new Array(n).fill(1);     // Base: single element subsequence
    const prev = new Array(n).fill(-1);  // To reconstruct the path

    let bestLen = 1;
    let bestEnd = 0;

    for (let i = 1; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          prev[i] = j; // Record: we extend the LIS ending at j
        }
      }
      if (dp[i] > bestLen) {
        bestLen = dp[i];
        bestEnd = i;
      }
    }

    // Reconstruct one LIS by walking prev[] backward from bestEnd
    const sequence = [];
    for (let k = bestEnd; k !== -1; k = prev[k]) {
      sequence.push(nums[k]);
    }
    sequence.reverse();

    return { length: bestLen, sequence };
  }
}

// Example:
// const s = new Solution();
// console.log(s.longestIncreasingSubsequence([4,2,4,5,3,7])); // 4
// console.log(s.longestIncreasingSubsequenceWithPathDP([4,2,4,5,3,7]));
// -> { length: 4, sequence: [2, 4, 5, 7] }
