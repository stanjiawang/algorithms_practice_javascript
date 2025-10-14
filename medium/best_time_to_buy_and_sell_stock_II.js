/*
https://www.lintcode.com/problem/150/?fromId=213&_from=collection

Best Time to Buy and Sell Stock II

Given an array prices, which represents the price of a stock in each day.
You may complete as many transactions as you like
(ie, buy one and sell one share of the stock multiple times).
However, you may not engage in multiple transactions at the same time (ie, if you already have the stock, you must sell it before you buy again).
Design an algorithm to find the maximum profit.

Input: [2, 1, 2, 0, 1]
Output: 2
Explanation: 
    1. Buy the stock on the second day at 1, and sell the stock on the third day at 2. Profit is 1.
    2. Buy the stock on the 4th day at 0, and sell the stock on the 5th day at 1. Profit is 1.
    Total profit is 2.

Input: [4, 3, 2, 1]
Output: 0
Explanation: No transaction, profit is 0.
*/

export class Solution {
  /**
   * @param {number[]} prices - stock prices by day
   * @return {number} maximum profit achievable
   */
  maxProfit(prices) {
    if (!prices || prices.length < 2) return 0;

    let profit = 0;

    for (let i = 1; i < prices.length; i++) {
      // If today's price is higher than yesterday, we can earn that difference
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1];
      }
    }

    return profit;
  }
}

/*
Time Complexity: O(n)
Space Complexity: O(1)
*/
