/*
https://www.lintcode.com/problem/766
Leap Year

Determine whether year n is a leap year.return true if n is a leap year.
A leap year (also known as an intercalary year or bissextile year) is a calendar year containing one additional day.if a year is divisible by 4 and not divisible by 100 or divisible by 400,it is a leap year. 

Example 1:
Input : n = 2008
Output : true

Example 2:
Input : n = 2018
Output : false
*/

export class Solution {
  /**
   * @param n: a number represent year
   * @return: whether year n is a leap year.
   */
  isLeapYear(n) {
    // write your code here
    if (n % 4 === 0 && n % 100 !== 0 || n % 400 === 0) {
        return true;
    }

    return false;
  }
}
