/*
https://www.lintcode.com/problem/488/?fromId=213&_from=collection

Happy Number

Write an algorithm to determine if a number is happy.

A happy number is a number defined by the following process:
Starting with any positive integer,
replace the number by the sum of the squares of its digits,
and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. 
Those numbers for which this process ends in 1 are happy numbers.

Input:19
Output:true
Explanation:
19 is a happy number
    1^2 + 9^2 = 82
    8^2 + 2^2 = 68
    6^2 + 8^2 = 100
    1^2 + 0^2 + 0^2 = 1

Input:5
Output:false
Explanation:
5 is not a happy number
25->29->85->89->145->42->20->4->16->37->58->89
89 appears again.
*/

export class Solution {
  /**
   * Determine if a number is a happy number using a Set
   *
   * Idea:
   * - Continuously replace n with the sum of the squares of its digits.
   * - If we ever see the same number again → we are in a loop → not happy.
   * - If we reach 1 → it’s a happy number.
   *
   * Time Complexity: O(log n)  (since the number of digits shrinks quickly)
   * Space Complexity: O(k)  (k = number of distinct numbers seen)
   */
  isHappyWithHashSet(n) {
    const seenNumbers = new Set();

    while (n !== 1) {
      // If we've already seen this number, it means we are looping
      if (seenNumbers.has(n)) return false;

      seenNumbers.add(n);
      n = this.getSumOfSquares(n);
    }

    // If we reach 1, it's a happy number
    return true;
  }

  /**
   * Helper function to compute the sum of the squares of digits of a number
   * Example: 19 → 1² + 9² = 82
   */
  getSumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;     // Extract the last digit
      sum += digit * digit;       // Add the square
      num = Math.floor(num / 10); // Remove the last digit
    }
    return sum;
  }
}


export class Solution {
  /**
   * Determine if a number is a happy number using Floyd’s Cycle Detection
   *
   * Idea:
   * - Treat each transformation (sum of squares) as a “next” step.
   * - Move one pointer (slow) one step at a time, and another pointer (fast) two steps.
   * - If they meet (and not at 1), we have a cycle → not happy.
   * - If the fast pointer reaches 1 → happy number.
   *
   * Time Complexity: O(log n)
   * Space Complexity: O(1)
   */
  isHappyWithFloydCycle(n) {
    let slow = n;                     // moves one step each iteration
    let fast = this.getSumOfSquares(n); // moves two steps initially

    // Loop until they meet or fast reaches 1
    while (fast !== 1 && slow !== fast) {
      slow = this.getSumOfSquares(slow);                         // 1 step
      fast = this.getSumOfSquares(this.getSumOfSquares(fast));   // 2 steps
    }

    return fast === 1;
  }

  getSumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }
}
