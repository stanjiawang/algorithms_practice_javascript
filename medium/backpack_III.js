/*
https://www.lintcode.com/problem/440/?fromId=213&_from=collection

Backpack III

Given n kinds of items, and each kind of item has an infinite number available.
The i-th item has size A[i] and value V[i].

Also given a backpack with size m. What is the maximum value you can put into the backpack?

You cannot divide item into small pieces.
Total size of items you put into backpack can not exceed m.

Input: A = [2, 3, 5, 7], V = [1, 5, 2, 4], m = 10
Output: 15
Explanation: Put three item 1 (A[1] = 3, V[1] = 5) into backpack.

Input: A = [1, 2, 3], V = [1, 2, 3], m = 5
Output: 5
Explanation: Strategy is not unique. For example, put five item 0 (A[0] = 1, V[0] = 1) into backpack.
*/
export class Solution {
  /**
   * Backpack III (Unbounded Knapsack)
   * @param {number[]} sizes - sizes[i] is the size of item i
   * @param {number[]} values - values[i] is the value of item i
   * @param {number} capacity - backpack capacity m
   * @return {number} maximum total value that fits into the backpack
   */
  backpackIII(sizes, values, capacity) {
    const n = sizes.length;

    // Guard cases
    if (capacity <= 0 || n === 0) return 0;
    if (n !== values.length) throw new Error("sizes and values length mismatch");

    // dp[j] := max value achievable with capacity exactly j (or up to j)
    // Initialize to 0: with empty set or zero capacity, best value is 0
    const dp = new Array(capacity + 1).fill(0);

    // For unbounded knapsack, iterate capacity forward (allow reuse of current item)
    for (let i = 0; i < n; i++) {
      const itemSize = sizes[i];
      const itemValue = values[i];

      // If item is too large for the backpack at all, skip iteration safely
      if (itemSize > capacity) continue;

      // Forward loop enables using the same item multiple times:
      // dp[j] can use dp[j - itemSize] updated in the same i-iteration.
      for (let c = itemSize; c <= capacity; c++) {
        const takeItem = dp[c - itemSize] + itemValue; // take current item (unbounded)
        const skipItem = dp[c];                         // do not take current item
        dp[c] = Math.max(skipItem, takeItem);
      }
    }

    // dp[capacity] = best value achievable within capacity
    return dp[capacity];
  }
}

/*
Unbounded means you can reuse the same item many times.
Using for (c = itemSize → capacity) ensures dp[c - itemSize] already includes the effect of taking the current item, allowing repeated use in the same iteration.
In contrast, 0/1 knapsack must loop backward to prevent reusing the same item.

Complexity
Time: O(n * capacity) where n is the number of item types.
Space: O(capacity) for the 1D DP array.
*/
