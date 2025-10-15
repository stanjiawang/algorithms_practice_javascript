/*
https://www.lintcode.com/problem/586

Sqrt(x) II

Implement a function to compute the square root of a given non-negative number x.
The result should be a double precision floating-point value.

You don’t need to return an exact value; any result that is accurate within 1e-10 (i.e. absolute error ≤ 1e-10) is acceptable.
*/

export class Solution {
  /**
   * @param {number} x - The input non-negative number
   * @return {number} - The approximate square root of x
   */
  sqrt(x) {
    // Handle edge cases
    if (x < 0) return NaN;     // Square root not defined for negatives
    if (x === 0 || x === 1) return x; // Quick return for 0 or 1

    // Define search boundaries
    let left = 0;
    let right = x >= 1 ? x : 1; // if x < 1, search in [0,1]; else [0,x]
    const epsilon = 1e-12;      // acceptable precision threshold

    // Binary search for sqrt(x)
    while (right - left > epsilon) {
      const mid = (left + right) / 2;
      const square = mid * mid;

      if (square < x) {
        left = mid;    // sqrt(x) is larger
      } else {
        right = mid;   // sqrt(x) is smaller
      }
    }

    // Either left or right is fine; both are within epsilon difference
    return (left + right) / 2;
  }
}
