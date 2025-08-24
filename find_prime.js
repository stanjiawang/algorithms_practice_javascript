/*
https://www.lintcode.com/problem/298

Find prime
Output all prime numbers within n.

We promise that n is an integer within 100.

Example 1:
Input：5
Output：[2, 3, 5]
*/

export class Solution {
  /**
   * @param n: an integer
   * @return: return all prime numbers within n.
   */
  prime(n) {
    // write your code here
    let result = [];
    for (let i = 2; i <= n; i++) {
      if (this.isPrime(i)) {
        result.push(i);
      }
    }
    return result;
  }

  isPrime(m) {
    for (let j = 2; j * j <= m; j++) {
      if (m % j == 0) {
        return false;
      }
    }
    return true;
  }
}
