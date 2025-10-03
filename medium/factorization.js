/*
https://www.lintcode.com/course/90/learn/652?chapterId=472&sectionId=3295&ac=true

Factorization

A non-negative numbers can be regarded as product of its factors.
Write a function that takes an integer n and return all possible combinations of its factors.

Example1
Input: 8
Output: [[2,2,2],[2,4]]
Explanation:
8 = 2 x 2 x 2 = 2 x 4

Example2
Input: 1
Output: []
*/

export class Solution {
  /**
   * @param {number} n - The integer to factorize (n >= 1)
   * @return {number[][]} - All combinations of factors (excluding 1 and n),
   *                        each combination is in non-decreasing order.
   *                        The judge will sort the outer array, so order here doesn't matter.
   */
  getFactors(n) {
    const res = [];
    const path = [];

    /**
     * DFS tries to factorize `target` by picking next factor >= `start`.
     * We only iterate up to sqrt(target) because pairs beyond that would duplicate earlier work.
     *
     * @param {number} start  - minimum factor to try next (enforces non-decreasing order)
     * @param {number} target - current number we want to break down
     */
    function dfs(start, target) {
      // Try all candidate factors i from `start` up to floor(sqrt(target))
      for (let i = start; i * i <= target; i++) {
        if (target % i !== 0) continue; // i must divide target

        const other = target / i;

        // 1) Record a complete factor combination: [...path, i, other]
        //    This always forms a valid multiplication to the original n.
        path.push(i);
        res.push([...path, other]); // e.g., [2, 2, 2] or [2, 4], etc.

        // 2) Continue factorizing `other` to find longer combinations, e.g., [2, 2, 3] from 12:
        //    Keep `i` as the new start to maintain non-decreasing order (avoid [3,2] duplicates).
        dfs(i, other);

        // Backtrack: remove i to try next candidate factor
        path.pop();
      }
    }

    // Start from factor 2 to exclude using 1, and to respect the problem's requirement.
    dfs(2, n);

    return res;
  }
}
