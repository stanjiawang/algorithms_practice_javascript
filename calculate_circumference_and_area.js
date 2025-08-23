/*
https://www.lintcode.com/problem/764
Calculate Circumference And Area

Given an integer r which pretends the radius of a circle.
Your task is return an array.
The first element of this array represents the circumference of this circle.
The second element of this array represents the area of this circle.

PI = 3.14

Example 1:
Input : r = 2
Output : [12.56, 12.56]
*/

export class Solution {
  /**
   * @param r: a Integer represent radius
   * @return: the circle's circumference nums[0] and area nums[1]
   */
  calculate(r) {
    // write your code here
    const PI = 3.14;
    const circumference = 2 * PI * r;
    const area = PI * r * r;

    return [circumference,  area]
  }
}
