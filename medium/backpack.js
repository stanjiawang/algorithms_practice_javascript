/*
https://www.lintcode.com/problem/92/?fromId=213&_from=collection

Backpack

Given n items with size Ai an integer m denotes the size of a backpack. How full you can fill this backpack?
(Each item can only be selected once and the size of the item is a positive integer)

Example 1:
Input:
array = [3,4,8,5]
backpack size = 10
Output: 9
Explanation:
Load 4 and 5.

Example 2:
Input:
array = [2,3,5,7]
backpack size = 12
Output: 12
Explanation:
Load 5 and 7.
*/

export class Solution {
  /**
   * @param {number} capacity - the total size of the backpack (m)
   * @param {number[]} items - the list of item sizes (a)
   * @return {number} - the maximum size that can be filled
   */
  backPack(capacity, items) {
    // dp[j] means: is it possible to fill the backpack with total size exactly j?
    const dp = new Array(capacity + 1).fill(false);
    dp[0] = true; // base case: we can always achieve size 0 (empty backpack)

    // --- Outer loop: iterate over each item ---
    for (const itemSize of items) {
      // --- Inner loop: iterate capacity backward to avoid reusing the same item ---
      for (let currCap = capacity; currCap >= itemSize; currCap--) {
        // If we can achieve (currCap - itemSize) before,
        // it means we can now achieve currCap by adding this item
        if (dp[currCap - itemSize]) {
          dp[currCap] = true;
        }
      }
    }

    // --- Find the largest achievable capacity ---
    for (let filled = capacity; filled >= 0; filled--) {
      if (dp[filled]) {
        return filled;
      }
    }

    return 0; // fallback (should never happen)
  }
}


/*
| Type      | Complexity   | Explanation                                                                            |
| --------- | ------------ | -------------------------------------------------------------------------------------- |
| **Time**  | **O(n × m)** | n = number of items, m = backpack capacity. Each item iterates through all capacities. |
| **Space** | **O(m)**     | One-dimensional DP array of size `m + 1`.                                              |
*/
