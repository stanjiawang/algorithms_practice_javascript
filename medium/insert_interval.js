/*
https://www.lintcode.com/problem/30/?fromId=213&_from=collection

Insert Interval

Given a non-overlapping interval list which is sorted by start point.
Insert a new interval into it, make sure the list is still in order and non-overlapping (merge intervals if necessary).

The number of intervals in the data guarantee interval list is less than 10

Example 1:
Input:
interval list = [(1,2), (5,9)]
new interval = (2, 5)
Output:
[(1,9)]
Explanation:
The interval after insertion overlaps and needs to be merged.

Example 2:
Input:
interval list = [(1,2), (5,9)]
new interval = (3, 4)
Output:
[(1,2), (3,4), (5,9)]
Explanation:
Intervals are ordered by starting endpoints.
*/

import { Interval } from '/opt/node/lib/lintcode/index.js';

/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

export class Solution {
  /**
   * @param {Interval[]} intervals - Sorted interval list (non-overlapping)
   * @param {Interval} newInterval - Interval to insert
   * @return {Interval[]} - New sorted interval list after insertion
   */
  insert(intervals, newInterval) {
    const result = [];
    let i = 0;

    // 1️⃣ Add all intervals that end before the new interval starts
    while (i < intervals.length && intervals[i].end < newInterval.start) {
      result.push(intervals[i]);
      i++;
    }

    // 2️⃣ Merge overlapping intervals
    while (i < intervals.length && intervals[i].start <= newInterval.end) {
      newInterval.start = Math.min(newInterval.start, intervals[i].start);
      newInterval.end = Math.max(newInterval.end, intervals[i].end);
      i++;
    }

    // Add the merged new interval
    result.push(newInterval);

    // 3️⃣ Add the rest of intervals after the new interval
    while (i < intervals.length) {
      result.push(intervals[i]);
      i++;
    }

    return result;
  }
}


/*
Time Complexity
O(n) — we traverse the list once.
O(1) extra space (besides the output list).
*/


