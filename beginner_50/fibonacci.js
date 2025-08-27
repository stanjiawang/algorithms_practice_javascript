/*
https://www.lintcode.com/problem/366

Find the Nth number in Fibonacci sequence. (N starts at 1)

A Fibonacci sequence is defined as follow:

The first two numbers are 0 and 1.
The i th number is the sum of i-1 th number and i-2 th number.
The first ten numbers in Fibonacci sequence is:

0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ...

Example 1:
	Input:  1
	Output: 0
	
	Explanation: 
	return the first number in  Fibonacci sequence .

Example 2:
	Input:  2
	Output: 1
	
	Explanation: 
	return the second number in  Fibonacci sequence .
*/

export class Solution {
  /**
   * @param {number} n
   * @return {number}
   */
  fibonacci(n) {
    // if (n < 1) {
    //   return -1;
    // }

    // if (n === 1) {
    //   return 0;
    // }

    // if (n === 2) {
    //   return 1;
    // }

    // return this.fibonacci(n -1) + this.fibonacci(n - 2);
    
    if (n === 1) return 0;
    if (n === 2) return 1;

    let a = 0, b = 1;
    for (let i = 3; i <= n; i++) {
      const c = a + b;
      a = b;
      b = c;
    }
    return b;
  }
}
