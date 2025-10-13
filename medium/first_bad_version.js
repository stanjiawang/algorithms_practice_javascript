/*
https://www.lintcode.com/problem/74/description?fromId=213&_from=collection

First Bad Version

The code base version is an integer start from 1 to n.
One day, someone committed a bad version in the code case, so it caused this version and the following versions are all failed in the unit tests.
Find the first bad version.
You can call isBadVersion to help you determine which version is the first bad one.
The details interface can be found in the code's annotation part.

Example 1:
Input: n = 5, first bad version is 4
Output: 4
Explanation:
isBadVersion(3) -> false
isBadVersion(5) -> true
isBadVersion(4) -> true
Therefore, it can be determined that the fourth version is the first incorrect version.
*/

export class Solution {
  /**
   * @param {number} n - total number of versions
   * @return {number} - the first bad version
   */
  findFirstBadVersion(n) {
    let left = 1;
    let right = n;

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);

      // Call the API isBadVersion(mid)
      if (SVNRepo.isBadVersion(mid)) {
        // mid could be the first bad version
        // so we keep it in the search space
        right = mid;
      } else {
        // mid is good, so the first bad must be after mid
        left = mid + 1;
      }
    }

    // When left === right, we've found the first bad version
    return left;
  }
}

// Time Complexity O(log n)


