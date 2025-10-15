/*
https://www.lintcode.com/problem/394/?fromId=213&_from=collection

Coins in a Line

There are n coins in a line. Two players take turns to take one or two coins from right side until there are no more coins left.
The player who take the last coin wins.

Could you please decide the first player will win or lose?

If the first player wins, return true, otherwise return false.

Input: 1
Output: true

Input: 4
Output: true
Explanation:
The first player takes 1 coin at first. Then there are 3 coins left.
Whether the second player takes 1 coin or two, then the first player can take all coin(s) left.
*/
export class Solution {
  /**
   * @param {number} n - number of coins
   * @return {boolean} - true if the first player will win
   *
   * Core idea:
   * - Positions where n % 3 === 0 are losing (first player cannot avoid giving
   *   the opponent a winning state).
   * - Otherwise winning (first player can move to a multiple of 3).
   *
   * Time: O(1)
   * Space: O(1)
   */
  firstWillWin(n) {
    // Guard (optional): if n is not a positive integer, handle gracefully.
    if (n <= 0) return false; // with 0 coin, first cannot move -> lose
    return n % 3 !== 0;
  }
}
