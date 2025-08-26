/*
https://www.lintcode.com/problem/9

Given number n. Print number from 1 to n. According to following rules:

when number is divided by 3, print "fizz".
when number is divided by 5, print "buzz".
when number is divided by both 3 and 5, print "fizz buzz".
when number can't be divided by either 3 or 5, print the number itself.

Example 1:
Input: n = 15

Output:
[
  "1", "2", "fizz",
  "4", "buzz", "fizz",
  "7", "8", "fizz",
  "buzz", "11", "fizz",
  "13", "14", "fizz buzz"
]
*/

export class Solution {
  /**
   * @param n: An integer
   * @return: A list of strings.
   */
  fizzBuzz(n) {
    // write your code here
    const array = [];
    for (let i = 1; i <= n; i++)
      if (i % 3 === 0 && i % 5 === 0) {
          array.push('fizz buzz');
      } else if (i % 3 === 0) {
        array.push('fizz');
      } else if (i % 5 === 0) {
        array.push('buzz');
      } else {
        array.push(i.toString())
      }

      return array;
  }
}
