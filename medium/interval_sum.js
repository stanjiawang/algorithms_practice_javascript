/*
https://www.lintcode.com/problem/206/?fromId=213&_from=collection

Interval Sum

Given an integer array (index from 0 to n-1, where n is the size of this array), and an query list.
Each query has two integers [start, end].
For each query, calculate the sum of numbers between index start and end in the given array and return in the result list.

Input: array = [1,2,7,8,5],  queries = [(0,4),(1,2),(2,4)]
Output: [23,9,20]

Input: array = [4,3,1,2],  queries = [(1,2),(0,2)]
Output: [4,8]
*/

import {
  Interval,
} from '/opt/node/lib/lintcode/index.js';

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
   * Interval Sum
   * 
   * Given an integer array `a` and a list of queries (each query is an Interval),
   * return the sum of elements between each query's start and end index.
   *
   * @param {number[]} a - The input integer array
   * @param {Interval[]} queries - The list of query intervals [start, end]
   * @return {number[]} - The list of sums for each interval
   */
  intervalSum(a, queries) {
    // ✅ Edge case: if array is empty, return empty result
    if (!a || a.length === 0) return [];

    const n = a.length;
    const prefixSum = new Array(n + 1).fill(0);

    // ✅ Step 1: Build prefix sum array
    // prefixSum[i] stores sum of elements from a[0] to a[i - 1]
    for (let i = 1; i <= n; i++) {
      prefixSum[i] = prefixSum[i - 1] + a[i - 1];
    }

    // ✅ Step 2: Answer each query in O(1) time
    const result = [];
    for (const { start, end } of queries) {
      // sum of a[start...end] = prefixSum[end + 1] - prefixSum[start]
      const sum = prefixSum[end + 1] - prefixSum[start];
      result.push(sum);
    }

    return result;
  }
}


/*
| Step              | Time Complexity | Space Complexity | Explanation                           |
| ----------------- | --------------- | ---------------- | ------------------------------------- |
| Build prefix sum  | O(n)            | O(n)             | Single pass to precompute prefix sums |
| Each query lookup | O(1)            | —                | Constant-time subtraction             |
| **Total**         | **O(n + q)**    | **O(n)**         | Efficient for multiple queries        |
*/
