/*
https://www.lintcode.com/problem/1141
The month's days

Given a year and month, return the days of that month.
The conditions for a leap year are

1. a year divisible by 4 but not divisible by 100
2. a year divisible by 400.
A leap year is one of the above two conditions.

1≤year≤10000
1≤month≤12

Example 1:
Input: 2020 2
Output: 29

Example 2:
Input: 2020 3
Output: 31
*/

export class Solution {
  /**
   * @param year: a number year
   * @param month: a number month
   * @return: return the number of days of the month.
   */
  getTheMonthDays(year, month) {
    // write your code here
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        return 31;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        return 30;
    } else if (year % 4 === 0 && year %100 !== 0 || year % 400 === 0 && month === 2) {
        return 29;
    } else {
        return 28;
    }
  }
}
