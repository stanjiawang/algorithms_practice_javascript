/*
https://www.lintcode.com/problem/393/?fromId=213&_from=collection

Best Time to Buy and Sell Stock IV

Given an array prices and the i-th element of it represents the price of a stock on the i-th day.

You may complete at most k transactions. What's the maximum profit?

Input: k = 2, prices = [4, 4, 6, 1, 1, 4, 2 ,5]
Output: 6
Explanation: Buy at 4 and sell at 6. Then buy at 1 and sell at 5. Your profit is 2 + 4 = 6.

Input: k = 1, prices = [3, 2, 1]
Output: 0
Explanation: No transaction.
*/

export class Solution {
  /**
   * Best Time to Buy and Sell Stock IV
   * @param {number} maxTransactions - maximum number of allowed transactions (k)
   * @param {number[]} prices - array of daily stock prices
   * @return {number} maximum profit achievable
   */
  maxProfit(maxTransactions, prices) {
    const days = prices.length;

    // Base case: no prices or no transactions → no profit
    if (days <= 1 || maxTransactions === 0) {
      return 0;
    }

    // Case 1️⃣: When k is large enough, it's the same as "unlimited transactions"
    // → Just accumulate every upward price difference.
    if (maxTransactions >= Math.floor(days / 2)) {
      let totalProfit = 0;
      for (let day = 1; day < days; day++) {
        if (prices[day] > prices[day - 1]) {
          totalProfit += prices[day] - prices[day - 1];
        }
      }
      return totalProfit;
    }

    // Case 2️⃣: Limited transactions → use DP
    // dp[t][d] = max profit up to day `d` with at most `t` transactions
    const dp = Array.from({ length: maxTransactions + 1 }, () =>
      Array(days).fill(0)
    );

    // Outer loop: iterate through number of transactions
    for (let transaction = 1; transaction <= maxTransactions; transaction++) {
      // maxDiff tracks the best "dp[transaction-1][prevDay] - prices[prevDay]"
      // i.e. the best profit we could achieve if we had bought on some earlier day
      let maxDiff = -prices[0];

      // Inner loop: iterate through each day
      for (let day = 1; day < days; day++) {
        // Option 1: do nothing today (same as yesterday's best)
        // Option 2: sell today (prices[day] + best historical buy difference)
        dp[transaction][day] = Math.max(
          dp[transaction][day - 1],
          prices[day] + maxDiff
        );

        // Update maxDiff to include today's dp[transaction-1][day] - prices[day]
        // for potential future sells.
        maxDiff = Math.max(maxDiff, dp[transaction - 1][day] - prices[day]);
      }
    }

    // The final answer: best profit with up to maxTransactions by last day
    return dp[maxTransactions][days - 1];
  }
}

/*
| Type                      | Complexity   | Reason                                   |
| ------------------------- | ------------ | ---------------------------------------- |
| **Time**                  | **O(k × n)** | We iterate `k` transactions × `n` days   |
| **Space**                 | **O(k × n)** | 2D DP table of size (k+1) × n            |
| *(Optional Optimization)* | **O(n)**     | Using 1D rolling arrays (`prev`, `curr`) |
*/
