/*
https://www.lintcode.com/course/90/learn/476?chapterId=473&sectionId=3299&ac=true

Stone Game

There is a stone game.At the beginning of the game the player picks n piles of stones in a line.

The goal is to merge the stones in one pile observing the following rules:

1. At each step of the game,the player can merge two adjacent piles to a new pile.
2. The cost of each combination is the sum of the weights of the two piles of stones combined.

Example 1:
Input: [3, 4, 3]
Output: 17

Example 2:
Input: [4, 1, 1, 4]
Output: 18
Explanation:
  1. Merge second and third piles => [4, 2, 4], score = 2
  2. Merge the first two piles => [6, 4]，score = 8
  3. Merge the last two piles => [10], score = 18
*/

export class Solution {
  /**
   * Stone Game — Minimum cost to merge adjacent piles into one pile.
   *
   * Idea (Interval DP):
   *  - dp[start][end] = minimum cost to merge a[start..end] into ONE pile
   *  - Last step must merge two single piles split at `split`:
   *      [start..split]  +  [split+1..end]
   *  - Cost of the *final* merge = sum(start..end)  ← fixed “merge tax”
   *  - Transition:
   *      dp[start][end] = min over split in [start..end-1] {
   *        dp[start][split] + dp[split+1][end] + sum(start..end)
   *      }
   *  - Base:
   *      dp[i][i] = 0  (one pile needs no merge)
   *
   * Time:  O(n^3)  (length × start × split)
   * Space: O(n^2)
   *
   * @param {number[]} a - non-negative pile weights in a line
   * @return {number} - minimum total cost to merge into one pile
   */
  stoneGame(a) {
    const n = Array.isArray(a) ? a.length : 0;
    if (n <= 1) return 0; // 0 or 1 pile ⇒ no merge cost

    // ---------- 1) Prefix sums for O(1) range sum ----------
    // prefix[i] = sum of a[0..i-1]
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
      prefix[i + 1] = prefix[i] + a[i];
    }
    // sum of a[l..r], inclusive
    const rangeSum = (l, r) => prefix[r + 1] - prefix[l];

    // ---------- 2) DP table ----------
    // dp[start][end] = min cost to merge a[start..end] into one pile
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // ---------- 3) Fill by increasing interval length ----------
    for (let length = 2; length <= n; length++) {
      for (let startIndex = 0; startIndex + length - 1 < n; startIndex++) {
        const endIndex = startIndex + length - 1;
        let best = Number.POSITIVE_INFINITY;

        // Try every last split point: [start..split] | [split+1..end]
        for (let splitIndex = startIndex; splitIndex < endIndex; splitIndex++) {
          const leftCost = dp[startIndex][splitIndex];
          const rightCost = dp[splitIndex + 1][endIndex];
          const mergeCost = rangeSum(startIndex, endIndex); // final merge tax
          best = Math.min(best, leftCost + rightCost + mergeCost);
        }

        dp[startIndex][endIndex] = best; // finalize this interval
      }
    }

    return dp[0][n - 1];
  }
}

/*
State: dp[i][j] = cost to compress [i..j] into one pile.
Last step: merge two single piles → add fixed sum(i..j).
Recurrence: min(dp[i][k] + dp[k+1][j]) + sum(i..j).
Build by length ↑; base dp[i][i] = 0.
*/
