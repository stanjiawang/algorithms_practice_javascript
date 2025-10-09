/*
https://www.lintcode.com/problem/156/?fromId=213&_from=collection

Merge Intervals

We take a list intervals of type Interval to represent a collection of intervals, where a single interval is (start, end).
You need to merge all overlapping intervals and return an array of non-overlapping intervals that covers exactly all intervals in the input.
*/

/**
 * Merge Overlapping Intervals
 *
 * Given a list of intervals [start, end], merge all overlapping ones
 * and return a new list of non-overlapping intervals.
 *
 * Example:
 * Input:  [(1,3), (2,6), (8,10), (15,18)]
 * Output: [(1,6), (8,10), (15,18)]
 *
 * Time Complexity:  O(n log n)  (due to sorting)
 * Space Complexity: O(n)
 */

import { Interval } from '/opt/node/lib/lintcode/index.js';

export class Solution {
  /**
   * @param {Interval[]} intervals - array of Interval objects
   * @return {Interval[]} merged - array of merged, non-overlapping intervals
   */
  merge(intervals) {
    // --- Step 1: Handle edge cases ---
    if (!intervals || intervals.length <= 1) return intervals || [];

    // --- Step 2: Sort intervals by their start value ---
    // Ensures that overlapping intervals are adjacent.
    intervals.sort((a, b) => a.start - b.start);

    // --- Step 3: Initialize result container and current interval tracker ---
    const merged = [];
    let currentInterval = intervals[0]; // The interval we are currently merging

    // --- Step 4: Traverse all intervals ---
    for (let i = 1; i < intervals.length; i++) {
      const nextInterval = intervals[i];

      // Case 1: Overlapping intervals → extend the current interval's end
      if (nextInterval.start <= currentInterval.end) {
        currentInterval.end = Math.max(currentInterval.end, nextInterval.end);
      } 
      // Case 2: No overlap → push the current interval into result
      //          and move to the next one.
      else {
        merged.push(currentInterval);
        currentInterval = nextInterval;
      }
    }

    // --- Step 5: Push the final interval ---
    // The last merged interval won't be pushed inside the loop,
    // because there’s no "next interval" to trigger the non-overlapping case.
    merged.push(currentInterval);

    // --- Step 6: Return merged intervals ---
    return merged;
  }
}
