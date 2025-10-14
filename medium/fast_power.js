/*
https://www.lintcode.com/problem/140/?fromId=213&_from=collection

Fast Power

Calculate the a^n %b where a, b and n are all 32bit non-negative integers.

a, b and n are all 32-bit non-negative integers

Example 1:
Input:
a = 3
b = 7
n = 5
Output: 5
Explanation:
3 ^ 5 % 7 = 5

Example 2:
Input:
a = 3
b = 1
n = 0
Output: 0
Explanation:
3 ^ 0 % 1 = 0
*/

export class Solution {
  /**
   * Fast Power — Iterative version
   * Calculates (a^n) % b efficiently using modular exponentiation.
   *
   * @param {number} a - base
   * @param {number} b - modulus
   * @param {number} n - exponent
   * @return {number} result of (a^n % b)
   */
  fastPower(a, b, n) {
    if (b === 1) return 0; // anything mod 1 is always 0

    // Use BigInt to avoid precision loss in JavaScript
    let base = BigInt(a) % BigInt(b);
    let exponent = BigInt(n);
    let mod = BigInt(b);
    let result = 1n; // start with 1 (multiplicative identity)

    // Loop until the exponent becomes 0
    while (exponent > 0n) {
      // If the current bit of the exponent is 1 (i.e., exponent is odd)
      // it means we need to multiply this "base" into our result
      if (exponent % 2n === 1n) {
        result = (result * base) % mod;
      }

      // Square the base (for next bit) and take mod to keep it small
      base = (base * base) % mod;

      // Divide the exponent by 2 (shift right by 1 bit)
      exponent = exponent / 2n;
    }

    // Convert result back to normal Number (safe since result < b)
    return Number(result);
  }
}


/*
| Category              | Complexity   | Reason                    |
| --------------------- | ------------ | ------------------------- |
| **Time**              | **O(log n)** | Exponent halves each loop |
| **Space (iterative)** | **O(1)**     | Constant variables        |
| **Space (recursive)** | **O(log n)** | Call-stack depth          |
*/
