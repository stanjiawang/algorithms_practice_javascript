/*
https://www.lintcode.com/problem/1332/?fromId=213&_from=collection

Number of 1 Bits

Write a function that takes an unsigned integer and returns the number of ’1' bits the corresponding binary number has (also known as the Hamming weight).

Input：n = 11
Output：3
Explanation：11(10) = 1011(2), so return 3

Input：n = 7
Output：3
Explanation：7(10) = 111(2), so return 3
*/
export class Solution {
  /**
   * Count the number of '1' bits (Hamming weight)
   * 
   * @param {number} n - an unsigned integer
   * @return {number} - count of bits set to 1
   */
  hammingWeight(n) {
    let count = 0;

    // Keep looping until all bits are shifted out
    while (n !== 0) {
      // (n & 1) isolates the last bit — if it's 1, add to count
      count += n & 1;

      // Unsigned right shift by 1 to move to the next bit
      n >>>= 1;  // '>>>' fills left side with 0 (important for unsigned numbers)
    }

    return count;
  }
}

