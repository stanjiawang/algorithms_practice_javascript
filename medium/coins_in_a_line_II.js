/*
https://www.lintcode.com/problem/395/?fromId=213&_from=collection

Coins in a Line II

There are n coins with different value in a line.
Two players take turns to take one or two coins from left side until there are no more coins left.
The player who take the coins with the most value wins.

Could you please decide the first player will win or lose?

If the first player wins, return true, otherwise return false.

Input: [1, 2, 2]
Output: true
Explanation: The first player takes 2 coins.

Input: [1, 2, 4]
Output: false
Explanation: Whether the first player takes 1 coin or 2, the second player will gain more value.
*/

export class Solution {
  /**
   * @param {number[]} values - The list of coin values.
   * @return {boolean} - True if the first player will win, otherwise false.
   */
  firstWillWin(values) {
    const n = values.length;

    // Edge cases
    if (n === 0) return false; // no coins → no win
    if (n <= 2) return true;   // 1 or 2 coins → first player takes all

    // dp[i] = the maximum score difference (current player - opponent)
    // starting from index i to the end of the array.
    const dp = new Array(n + 1).fill(0);

    // Base cases (tail of the array)
    dp[n] = 0;                               // no coins left → score difference = 0
    dp[n - 1] = values[n - 1];               // one coin left → take it
    dp[n - 2] = values[n - 2] + values[n - 1]; // two coins left → take both

    // State transition: from back to front
    for (let i = n - 3; i >= 0; i--) {
      // Option 1: take one coin, opponent starts from i + 1
      const takeOne = values[i] - dp[i + 1];

      // Option 2: take two coins, opponent starts from i + 2
      const takeTwo = values[i] + values[i + 1] - dp[i + 2];

      // Choose the better (maximize current player's lead)
      dp[i] = Math.max(takeOne, takeTwo);
    }

    // If the first player's total advantage > 0 → they win
    return dp[0] > 0;
  }
}

/*
| Measure                           | Complexity | Explanation                                                        |
| --------------------------------- | ---------- | ------------------------------------------------------------------ |
| **Time**                          | O(n)       | One backward loop over n coins.                                    |
| **Space**                         | O(n)       | dp array of size n + 1 to store states.                            |
| **Space Optimization (Optional)** | O(1)       | Only `dp[i+1]` and `dp[i+2]` are used → can reduce to 3 variables. |
*/
