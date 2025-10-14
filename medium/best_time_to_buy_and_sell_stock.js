/*
https://www.lintcode.com/problem/149/?fromId=213&_from=collection

Best Time to Buy and Sell Stock

Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction
(ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Input: [3, 2, 3, 1, 2]
Output: 1
Explanation: You can buy at the third day and then sell it at the 4th day. The profit is 2 - 1 = 1

Input: [1, 2, 3, 4, 5]
Output: 4
Explanation: You can buy at the 0th day and then sell it at the 4th day. The profit is 5 - 1 = 4

Input: [5, 4, 3, 2, 1]
Output: 0
Explanation: You can do nothing and get nothing.
*/

export class Solution {
  /**
   * Best Time to Buy and Sell Stock
   *
   * @param {number[]} prices - prices[i] = stock price on day i
   * @return {number} - Maximum profit from one buy-sell transaction
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  maxProfit(prices) {
    if (!prices || prices.length < 2) return 0;

    let minPrice = prices[0]; // 🔹 Track the lowest price seen so far (best buy price)
    let maxProfit = 0;        // 🔹 Track the highest profit seen so far

    for (let i = 1; i < prices.length; i++) {
      const currentPrice = prices[i];

      // If we find a lower price, update the historical minimum
      if (currentPrice < minPrice) {
        minPrice = currentPrice;
      } else {
        // Otherwise, calculate the profit if we sell today
        const currentProfit = currentPrice - minPrice;

        // Update maxProfit if today's profit is greater
        maxProfit = Math.max(maxProfit, currentProfit);
      }
    }

    return maxProfit;
  }
}

/*
| Metric               | Analysis                             |
| -------------------- | ------------------------------------ |
| **Time Complexity**  | O(n) → Single pass through the array |
| **Space Complexity** | O(1) → Only two variables stored     |
*/


