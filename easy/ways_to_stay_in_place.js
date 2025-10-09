/*
https://www.lintcode.com/problem/1835/?fromId=213&_from=collection

Number of Ways to Stay in the Same Place After Some Steps I

You have a pointer at index 0 in an array of size arrLen.
At each step, you can move 1 position to the left, 1 position to the right in the array or stay in the same place (The pointer should not be placed outside the array at any time).
Given two integers steps and arrLen, return the number of ways such that your pointer still at index 0 after exactly steps steps.
Since the answer may be too large, return it modulo 

Input: 
3
2
Output: 
4
Explanation: 
There are 4 differents ways to stay at index 0 after 3 steps.
Right, Left, Stay
Stay, Right, Left
Right, Stay, Left
Stay, Stay, Stay

Input: 
2
4
Output: 
2
Explanation: 
There are 2 differents ways to stay at index 0 after 2 steps
Right, Left
Stay, Stay
*/

export class Solution {
  /**
   * Number of Ways to Stay in the Same Place After Some Steps (LeetCode 1269)
   *
   * @param {number} steps  - Total number of moves you can take
   * @param {number} arrLen - Length of the array
   * @return {number}       - Number of ways to be at index 0 after `steps` (mod 1e9+7)
   */
  numWays(steps, arrLen) {
    const MOD = 1_000_000_007;

    // Optimization: You can never move farther than steps/2 from 0,
    // because you won’t have enough moves to come back.
    // Also, you can’t go beyond the array boundary.
    const maxReach = Math.min(arrLen - 1, Math.floor(steps / 2) + 1);

    // waysAtPos[i] = number of ways to be at index i after current step count
    let waysAtPos = new Array(maxReach + 1).fill(0);
    waysAtPos[0] = 1; // Base case: at step 0, only 1 way to stay at index 0

    for (let step = 1; step <= steps; step++) {
      const nextWays = new Array(maxReach + 1).fill(0);

      // You can’t reach beyond either step count or maxReach
      const rightBound = Math.min(maxReach, step);

      for (let pos = 0; pos <= rightBound; pos++) {
        // 1️⃣ Stay at the same position
        nextWays[pos] = (nextWays[pos] + waysAtPos[pos]) % MOD;

        // 2️⃣ Move right → came from left (pos - 1 → pos)
        if (pos - 1 >= 0) {
          nextWays[pos] = (nextWays[pos] + waysAtPos[pos - 1]) % MOD;
        }

        // 3️⃣ Move left → came from right (pos + 1 → pos)
        if (pos + 1 <= maxReach) {
          nextWays[pos] = (nextWays[pos] + waysAtPos[pos + 1]) % MOD;
        }
      }

      // Update dp for the next step (rolling array optimization)
      waysAtPos = nextWays;
    }

    return waysAtPos[0];
  }
}

/*
Key Interview Notes
Concept	Explanation
State Definition	dp[i] = number of ways to be at index i after current step count
Transition Formula	dp[i] = dp[i] (stay) + dp[i-1] (move right) + dp[i+1] (move left)
Boundary Check	Stop moving beyond index 0 or arrLen - 1
Optimization	The farthest reachable position is min(arrLen - 1, floor(steps / 2) + 1)
Time Complexity	O(steps * min(arrLen, steps))
Space Complexity	O(min(arrLen, steps)) (rolling array)
*/
