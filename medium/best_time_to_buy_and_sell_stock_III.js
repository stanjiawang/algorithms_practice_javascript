/*
https://www.lintcode.com/problem/151/?fromId=213&_from=collection

Best Time to Buy and Sell Stock III

Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete at most two transactions.

You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

Input : [4,4,6,1,1,4,2,5]
Output : 6
*/

export class Solution {
  /**
   * Best Time to Buy and Sell Stock III
   * -----------------------------------
   * You may complete at most two transactions (buy → sell).
   * Each transaction must be completed before starting another.
   *
   * Intuition:
   *   - Split the timeline into two parts at every index i:
   *       Left  side [0..i]   → at most ONE transaction
   *       Right side [i..n-1] → at most ONE transaction
   *   - For each i, compute:
   *       totalProfit = leftProfit[i] + rightProfit[i]
   *   - The maximum of all totalProfit values = answer.
   *
   * Approach:
   *   1️⃣  From left to right, track the lowest price so far (minPrice)
   *        → compute best single-transaction profit up to each day.
   *   2️⃣  From right to left, track the highest price in the future (maxPrice)
   *        → compute best single-transaction profit from each day onward.
   *   3️⃣  Combine both arrays at every split point i.
   *
   * Time  Complexity: O(n)
   * Space Complexity: O(n)
   *
   * @param {number[]} prices - daily stock prices
   * @return {number} maximum total profit with at most two non-overlapping transactions
   */
  maxProfit(prices) {
    const n = prices.length;
    if (n < 2) return 0;

    // Step 1️⃣: Left-to-Right — max profit up to each day (at most 1 transaction)
    const leftProfit = new Array(n).fill(0);
    let minPrice = prices[0];
    for (let i = 1; i < n; i++) {
      // Update minimum price so far
      minPrice = Math.min(minPrice, prices[i]);
      // Either keep previous best, or sell today at minPrice
      const profitIfSellToday = prices[i] - minPrice;
      leftProfit[i] = Math.max(leftProfit[i - 1], profitIfSellToday);
    }

    // Step 2️⃣: Right-to-Left — max profit from each day to the end (at most 1 transaction)
    const rightProfit = new Array(n).fill(0);
    let maxPrice = prices[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      // Update future maximum price
      maxPrice = Math.max(maxPrice, prices[i]);
      // Either keep next day's best, or buy today and sell later at maxPrice
      const profitIfBuyToday = maxPrice - prices[i];
      rightProfit[i] = Math.max(rightProfit[i + 1], profitIfBuyToday);
    }

    // Step 3️⃣: Combine — choose split point i that maximizes total profit
    let maxTotal = 0;
    for (let i = 0; i < n; i++) {
      maxTotal = Math.max(maxTotal, leftProfit[i] + rightProfit[i]);
    }

    return maxTotal;
  }
}

/*
| Metric    | Complexity | Explanation                                                 |
| --------- | ---------- | ----------------------------------------------------------- |
| **Time**  | **O(n)**   | One forward pass + one backward pass + one combination loop |
| **Space** | **O(n)**   | Two auxiliary arrays (`leftProfit`, `rightProfit`)          |
*/
