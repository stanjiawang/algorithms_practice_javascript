/*
https://www.lintcode.com/problem/152/?fromId=213&_from=collection

Combinations

Given two integers n and k. Return all possible combinations of k numbers out of 1, 2, ... , n.

You can return all combinations in any order, but numbers in a combination should be in ascending order.

Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

Input: n = 4, k = 1
Output: [[1],[2],[3],[4]]
*/

export class Solution {
  /**
   * Return all possible combinations of k numbers out of 1..n
   *
   * @param {number} n - the range of numbers (1..n)
   * @param {number} k - number of elements to choose
   * @return {number[][]} - all valid combinations
   */
  combine(n, k) {
    const res = [];      // store all valid combinations
    const path = [];     // temporary path for current combination

    /**
     * DFS + Backtracking helper
     * @param {number} start - current starting number for this recursion
     */
    const dfs = (start) => {
      // ✅ base case: when we have selected k numbers
      if (path.length === k) {
        res.push([...path]); // make a copy and store result
        return;
      }

      /**
       * 🔥 Pruning Optimization:
       * If there are not enough numbers left to fill the combination,
       * stop early to avoid unnecessary recursion.
       *
       * Formula:
       *   remaining numbers = n - i + 1
       *   numbers needed = k - path.length
       * We must ensure remaining >= needed
       * ⇒ i <= n - (k - path.length) + 1
       */
      for (let i = start; i <= n - (k - path.length) + 1; i++) {
        path.push(i);       // choose current number
        dfs(i + 1);         // explore further (next number)
        path.pop();         // backtrack (remove last chosen number)
      }
    };

    dfs(1); // start from 1
    return res;
  }
}

/*
| Type                 | Complexity         | Explanation                                                                                        |
| -------------------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| **Time Complexity**  | **O(C(n, k) × k)** | We generate each of the C(n, k) combinations, and each combination takes O(k) to copy into result. |
| **Space Complexity** | **O(k)**           | Recursion depth and temporary `path` array store up to k elements.                                 |
| **Result Storage**   | **O(C(n, k) × k)** | The output itself contains C(n, k) combinations, each of size k. (not counted as auxiliary space)  |
*/
