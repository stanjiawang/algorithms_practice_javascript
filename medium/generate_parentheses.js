/*
https://www.lintcode.com/problem/427/?fromId=213&_from=collection

Generate Parentheses

Given n, and there are n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
And return the combination result.

Input: 3
Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]

Input: 2
Output: ["()()", "(())"]
*/

export class Solution {
  /**
   * @param {number} n - The number of pairs of parentheses
   * @return {string[]} - All combinations of well-formed parentheses
   */
  generateParenthesis(n) {
    const result = [];

    /**
     * Depth-First Search helper with backtracking and pruning.
     * @param {string} current - The current parentheses string being built
     * @param {number} openCount - How many '(' have been used so far
     * @param {number} closeCount - How many ')' have been used so far
     */
    const dfs = (current, openCount, closeCount) => {
      // ✅ Base case: when both counts reach n, we have a valid combination
      if (openCount === n && closeCount === n) {
        result.push(current);
        return;
      }

      // ➕ Try adding '(' if we still have any left to use
      if (openCount < n) {
        dfs(current + "(", openCount + 1, closeCount);
      }

      // ➕ Try adding ')' only when it won't break validity
      //    i.e., there are more '(' placed than ')'
      if (closeCount < openCount) {
        dfs(current + ")", openCount, closeCount + 1);
      }
    };

    // Start DFS from an empty string
    dfs("", 0, 0);

    return result;
  }
}

/*
We use DFS (Depth-First Search) to explore all possible parentheses combinations.
The pruning conditions ensure we only generate valid prefixes:
openCount < n: limit total '(' usage.
closeCount < openCount: prevent invalid sequences like ")(".
result.push(current) saves a snapshot when a full valid string is built.

| Type      | Complexity   | Explanation                                                                                                 |
| --------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| **Time**  | `O(4ⁿ / √n)` | Number of valid parentheses combinations is the *n-th Catalan number*, `Cₙ = (1 / (n + 1)) * (2n choose n)` |
| **Space** | `O(n)`       | Maximum recursion depth and temporary string storage                                                        |
*/
