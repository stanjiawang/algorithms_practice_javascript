/*
https://www.lintcode.com/problem/295/?fromId=213&_from=collection

Intersection

Given two sorted interval sequences, each interval in the sequence does not intersect each other, and returns the index of the interval where the two sequences intersect

imput: a = [[0,3], [7,10]] , b = [[-1,1],[2,8]]
output: ans = [[0,0],[0,1],[1,1]]
*/

export class Solution {
  /**
   * Find all index pairs (i, j) such that interval a[i] intersects interval b[j].
   *
   * Assumptions (standard for this problem):
   *  1) Each list is sorted by start time.
   *  2) Intervals within the same list are pairwise disjoint (no internal overlaps).
   *  3) Intervals are closed ranges [start, end]; touching at an endpoint counts as overlap.
   *
   * Overlap rule:
   *   [s1, e1] intersects [s2, e2]  <=>  max(s1, s2) <= min(e1, e2)
   *
   * Core idea (two pointers):
   *   Compare a[i] and b[j]. If they overlap, record (i, j).
   *   Then advance the pointer whose interval ends first:
   *     - If a[i].end < b[j].end, increment i
   *     - Else if a[i].end > b[j].end, increment j
   *     - Else (they end together), increment both
   *   Rationale: the one that ends earlier cannot overlap future intervals from the other list.
   *
   * Time complexity:  O(m + n), where m = a.length, n = b.length
   * Space complexity: O(1) extra (excluding the output array)
   *
   * @param {number[][]} a - first sorted, non-overlapping interval list, e.g. [[0,3],[7,10]]
   * @param {number[][]} b - second sorted, non-overlapping interval list, e.g. [[-1,1],[2,8]]
   * @return {number[][]} list of index pairs, e.g. [[0,0],[0,1],[1,1]]
   */
  intersection(a, b) {
    const indexPairs = [];
    let i = 0; // pointer into 'a'
    let j = 0; // pointer into 'b'

    // Edge cases: empty inputs
    if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0) {
      return indexPairs;
    }

    while (i < a.length && j < b.length) {
      const [aStart, aEnd] = a[i];
      const [bStart, bEnd] = b[j];

      // Compute the potential intersection window
      const latestStart = Math.max(aStart, bStart);
      const earliestEnd = Math.min(aEnd, bEnd);

      // If the window is valid, we have an intersection -> record the index pair
      if (latestStart <= earliestEnd) {
        indexPairs.push([i, j]);
      }

      // Advance the pointer whose interval ends first:
      //  - The one that ends first cannot intersect any future interval from the other list
      //    (because the other list is sorted by start and future intervals start even later).
      if (aEnd < bEnd) {
        i++;
      } else if (aEnd > bEnd) {
        j++;
      } else {
        // Same end; neither interval can intersect anything further with the other list
        i++;
        j++;
      }
    }

    return indexPairs;
  }
}

/* ----------------------------
   Optional: interview extras
   ----------------------------
   If the interviewer asks for the actual intersection ranges as well,
   you can modify to return both index pairs and the intersected intervals.
   The core pointer advancement logic stays exactly the same.

   Example snippet:

   const intersections = [];
   if (latestStart <= earliestEnd) {
     intersections.push({
       aIndex: i,
       bIndex: j,
       range: [latestStart, earliestEnd], // the actual overlap
     });
   }

   This demonstrates adaptability without changing asymptotic complexity.
*/
