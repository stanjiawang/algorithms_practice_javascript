/*
https://www.lintcode.com/problem/281/?fromId=213&_from=collection

Paint the Ceiling

You want to build yourself a house.
The building company you hired can only build houses with sides from their specific set s.
That means they can build you a square house or a rectangular one but if and only if its length and width belong to the sets.
This month, they have a special promotion: they will paint the ceiling of a new house for free... but only if its area is not more than a.
You want them to do it for free but you also want to be sure that the house will be comfortable and not too small. 
How many possible house configurations can you create to have the ceiling painted for free given the side lengths offered?
There is a method to how the company decides what lengths of sides to produce.
To determine n lengths of wall segments to offer, they start with a seed value s0 , some variables k, b and m, and use the following equation to determine all other side lengths
si​=((k×si−1​+b)modm)+1+si−1​,for 1≤i<n
*/

export class Solution {
  /**
   * Paint the Ceiling
   * 
   * Given parameters (s0, n, k, b, m, a),
   * generate a sequence s[0..n-1] using the recurrence:
   * 
   *    s[i] = ((k * s[i-1] + b) % m) + 1 + s[i-1]
   * 
   * Then, count all pairs (i, j) such that:
   * 
   *    s[i] * s[j] <= a
   * 
   * Each pair represents a possible rectangular (or square) house
   * whose area is within the free-paint threshold `a`.
   * 
   * @param {number} s0 - initial seed value
   * @param {number} n  - number of lengths to generate
   * @param {number} k  - multiplier constant
   * @param {number} b  - additive constant
   * @param {number} m  - modulus
   * @param {number} a  - maximum allowed area
   * @return {number} - total count of valid configurations
   */
  painttheCeiling(s0, n, k, b, m, a) {
    // ---------- Step 1. Generate side lengths ----------
    const s = new Array(n);
    s[0] = s0;

    // The formula guarantees an increasing sequence.
    for (let i = 1; i < n; i++) {
      s[i] = ((k * s[i - 1] + b) % m) + 1 + s[i - 1];
    }

    // ---------- Step 2. Use two-pointer technique ----------
    // We count all pairs (i, j) where s[i] * s[j] <= a.
    // Because s is sorted increasing, we can move pointers efficiently.
    let count = 0n;  // Use BigInt to avoid overflow (since a <= 1e18)
    let j = n - 1;   // Start from the largest side

    for (let i = 0; i < n; i++) {
      // Move j left until the product is within limit
      while (j >= 0 && BigInt(s[i]) * BigInt(s[j]) > BigInt(a)) {
        j--;
      }

      // Once j < 0, no further valid pairs exist
      if (j < 0) break;

      // For current i, all sides 0..j can form valid rectangles with s[i]
      count += BigInt(j + 1);
    }

    // Convert BigInt to Number for the final output
    return Number(count);
  }
}

/*
| Step                 | Description                       | Time Complexity | Space Complexity      |
| -------------------- | --------------------------------- | --------------- | --------------------- |
| Sequence generation  | Compute `s[i]` for n elements     | **O(n)**        | **O(n)**              |
| Two-pointer counting | Traverse list with decreasing `j` | **O(n)**        | **O(1)** (beyond `s`) |
| **Overall**          | —                                 | **O(n)**        | **O(n)**              |
*/

