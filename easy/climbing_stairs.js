/*
https://www.lintcode.com/problem/111/description?fromId=213&_from=collection

Climbing Stairs

You are climbing a stair case. It takes n steps to reach to the top.
Each time you can either climb 1 or 2 steps.
In how many distinct ways can you climb to the top?
*/

export class Solution {
  /**
   * @param n: An integer (number of steps)
   * @return: An integer (distinct ways to reach the top)
   */
  climbStairs(n) {
    // Base cases
    if (n === 0) return 0; // no step → no way
    if (n === 1) return 1; // one step → one way

    // dp[i] represents the number of ways to reach step (i + 1)
    const dp = [];
    dp[0] = 1; // one way to climb 1 step
    dp[1] = 2; // two ways to climb 2 steps (1+1, or 2)

    // Build up from the bottom using the recurrence relation:
    // dp[i] = dp[i - 1] + dp[i - 2]
    for (let i = 2; i < n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }

    // dp[n - 1] is the number of ways to reach the nth step
    return dp[n - 1];
  }
}
