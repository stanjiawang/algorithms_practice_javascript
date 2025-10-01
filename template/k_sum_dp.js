export class Solution {
  /**
   * Count how many ways to choose exactly k numbers from nums
   * so that their sum equals target.
   */
  kSumCount(nums, k, target) {
    // dp[chooseCount][sumValue] = number of ways
    // Dimensions: (k+1) × (target+1)
    const dp = Array.from({ length: k + 1 }, () => Array(target + 1).fill(0));

    // Base case: there is 1 way to pick 0 numbers with sum 0
    dp[0][0] = 1;

    // Process each number
    for (const num of nums) {
      // Traverse chooseCount backwards (to avoid reusing the same number)
      for (let chooseCount = k; chooseCount >= 1; chooseCount--) {
        // Traverse sumValue backwards (to avoid overcounting in the same round)
        for (let sumValue = target; sumValue >= num; sumValue--) {
          // Transition:
          // ways to form (chooseCount, sumValue)
          // = ways we already have
          // + ways formed by taking "num" and combining with
          //   (chooseCount-1, sumValue - num)
          dp[chooseCount][sumValue] += dp[chooseCount - 1][sumValue - num];
        }
      }
    }

    // Final answer: number of ways to pick k numbers to form target
    return dp[k][target];
  }
}
