/*
https://www.lintcode.com/problem/316/?fromId=213&_from=collection

Combination set

Give an array, give all possible permutations and combinations, the number is less than the given number.

1<=len(num)<=10 
0<=num[i]<=9
target<=10^6 
Ignore the timing of returning ans

input : num = [0,1,2,3] target = 30
output: ans = [0,1,10,11,12,13,2,20,21,22,23,3]
*/

export class Solution {
  /**
   * Generate all possible numeric combinations formed by the given digits
   * such that each number is less than the given target.
   * Digits can be reused (A-mode).
   *
   * @param {number[]} num - Array of digits (0–9)
   * @param {number} target - Upper bound; generated numbers must be < target
   * @return {number[]} - All valid combinations in ascending order
   */
  combinationSet(num, target) {
    // ---- Step 1. Initialization --------------------------------------------
    // Use a Set to store unique numbers (avoid duplicates like "01" -> 1 and "1" -> 1)
    const result = new Set();

    // Sort digits to keep output stable and ordered
    num.sort((a, b) => a - b);

    /**
     * Depth-First Search (DFS)
     * Recursively build numbers by appending digits.
     * @param {number} val - current numeric value being built
     */
    const dfs = (val) => {
      // ---- Step 2. Pruning -------------------------------------------------
      // Stop recursion once current value reaches or exceeds target
      if (val >= target) return;

      // ---- Step 3. Record valid result ------------------------------------
      // Exclude the initial seed 0, but include 0 itself once
      if (val !== 0) result.add(val);

      // ---- Step 4. Expand next digit --------------------------------------
      for (const d of num) {
        // ⚠️ Special case: avoid infinite recursion on 0→0→0...
        if (val === 0 && d === 0) continue;

        // Append next digit (numeric concatenation, not string)
        // Example: val=12, d=3  → newVal = 12*10 + 3 = 123
        dfs(val * 10 + d);
      }
    };

    // ---- Step 5. Start recursion ------------------------------------------
    dfs(0);

    // ---- Step 6. Convert to sorted array ---------------------------------
    return Array.from(result).sort((a, b) => a - b);
  }
}

/*
| Category               | Symbolic Expression | Explanation                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Time Complexity**    | **O(kᵈ)**           | The DFS explores a *k-ary tree* of depth *d*. <br>• **k** = `num.length` (number of available digits). <br>• **d** ≈ `⌈log₁₀(target)⌉` (the maximum number of digits a generated number can have before reaching `target`). <br><br>Each node appends one of k digits and recurses until the value ≥ target. In the worst case, the total number of nodes visited ≈ k + k² + … + kᵈ = O(kᵈ). |
| **Space Complexity**   | **O(kᵈ)**           | • The `Set` stores all unique results (upper-bounded by the number of DFS nodes = O(kᵈ)). <br>• The recursion stack depth is O(d), negligible compared with the result storage.                                                                                                                                                                                                              |
| **Best Case**          | **O(1)**            | If `num` is empty or every first digit ≥ `target`, the DFS returns immediately.                                                                                                                                                                                                                                                                                                              |
| **Average Case**       | **O(kᵈ′)**          | Where *d′ < d*, since most branches prune early (`val ≥ target`).                                                                                                                                                                                                                                                                                                                            |
| **Depth of Recursion** | **O(d)**            | Because each recursive call adds one digit (maximum number of digits ≈ log₁₀(target)).                                                                                                                                                                                                                                                                                                       |
*/
