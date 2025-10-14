/*
https://www.lintcode.com/problem/153/?fromId=213&_from=collection

Combination Sum II

Given an array num and a number target.
Find all unique combinations in num where the numbers sum to target.

Each number in num can only be used once in one combination.
All numbers (including target) will be positive integers.
Numbers in a combination a1, a2, … , ak must be in non-descending order. (ie, a1 ≤ a2 ≤ … ≤ ak)
Different combinations can be in any order.
The solution set must not contain duplicate combinations.

Input: num = [7,1,2,5,1,6,10], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]

Input: num = [1,1,1], target = 2
Output: [[1,1]]
Explanation: The solution set must not contain duplicate combinations.
*/
export class Solution {
  /**
   * Combination Sum II
   *
   * @param {number[]} num - Array of candidate numbers (may contain duplicates)
   * @param {number} target - Target sum value
   * @return {number[][]} - List of all unique combinations that sum to target
   */
  combinationSum2(num, target) {
    const res = [];

    // Step 1: Sort the array to handle duplicates and ensure non-descending order
    num.sort((a, b) => a - b);

    /**
     * DFS helper function (backtracking)
     * @param {number} start - Current index to start exploring
     * @param {number[]} path - Current combination path
     * @param {number} sum - Current sum of chosen numbers
     */
    const dfs = (start, path, sum) => {
      // ✅ Base Case: Found a valid combination
      if (sum === target) {
        res.push([...path]); // Copy current path
        return;
      }

      // 🚫 Prune: Stop exploring if sum already exceeds target
      if (sum > target) return;

      // Step 2: Explore candidates
      for (let i = start; i < num.length; i++) {
        // ⚠️ Skip duplicate numbers on the same DFS level
        // e.g. when num[i] === num[i - 1] and i > start
        if (i > start && num[i] === num[i - 1]) continue;

        // Step 3: Choose current number
        path.push(num[i]);

        // Step 4: Recurse with next index (i + 1 ensures each number is used once)
        dfs(i + 1, path, sum + num[i]);

        // Step 5: Backtrack - remove the last chosen number
        path.pop();
      }
    };

    // Initial call
    dfs(0, [], 0);

    return res;
  }
}

/*
| Complexity Type                        | Explanation                                                                                                                                                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Time Complexity:**                   | **O(2ⁿ)** in the worst case — each number can be either chosen or not. Sorting adds **O(n log n)**, which is negligible compared to the DFS complexity. Pruning and duplicate-skipping reduce actual runtime drastically in practice. |
| **Space Complexity:**                  | **O(n)** — recursion depth and temporary path storage. The final result `res` may contain up to O(2ⁿ) combinations, but that’s output size.                                                                                           |
| **Auxiliary Space (recursion stack):** | O(n) — depth of recursion proportional to input length.                                                                                                                                                                               |
*/
