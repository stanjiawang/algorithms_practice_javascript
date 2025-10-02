/*
https://www.lintcode.com/course/90/learn/1712?chapterId=467&sectionId=3278&ac=true

Binary Subarrays With Sum

In an array A of 0s and 1s, how many non-empty subarrays have sum S?
A.length <= 30000
0 <= S <= A.length
A[i] is either 0 or 1.

Input: A = [1,0,1,0,1], S = 2
Output: 4
Explanation: 
The 4 subarrays are bolded below:
[1,0,1]
[1,0,1]
[1,0,1,0]
[0,1,0,1]

Input: A = [0,0,0,0,0,0,1,0,0,0], S = 0
Output: 27
Explanation: 
And 27 subarrays for S.
*/

export class Solution {
  /**
   * @param {number[]} a - binary array (0/1 only)
   * @param {number} s - target sum
   * @return {number} - number of subarrays with sum exactly s
   */
  numSubarraysWithSum(a, s) {
    // Trick: count(subarrays with sum == s)
    // = count(subarrays with sum <= s) - count(subarrays with sum <= s-1)
    return this.countAtMost(a, s) - this.countAtMost(a, s - 1);
  }

  /**
   * Count subarrays where sum <= k
   * Works because array has only non-negative numbers (0/1).
   */
  countAtMost(a, k) {
    if (k < 0) return 0; // no subarray can have sum < 0

    let left = 0;    // left pointer of sliding window
    let sum = 0;     // current window sum
    let total = 0;   // total valid subarrays

    for (let right = 0; right < a.length; right++) {
      sum += a[right]; // expand window by including a[right]

      // shrink window until sum <= k
      while (sum > k) {
        sum -= a[left];
        left++;
      }

      // Now sum <= k
      // All subarrays ending at 'right' and starting anywhere from [left..right] are valid.
      // Count = (right - left + 1)
      total += (right - left + 1);
    }

    return total;
  }
}

/*
Key points for interview memory

Formula:
= countAtMost(S) - countAtMost(S-1)

Why it works:
countAtMost(S) = all subarrays with sum ≤ S
countAtMost(S-1) = all subarrays with sum ≤ S-1
Their difference = all subarrays with sum exactly S

Why sliding window works:
Array is binary (0/1, non-negative).
Window sum grows when right moves, shrinks when left moves.
Each element enters/leaves window at most once → O(n).
*/
