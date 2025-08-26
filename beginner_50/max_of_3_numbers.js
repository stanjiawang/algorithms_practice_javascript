/* https://www.lintcode.com/problem/283
Max of 3 Numbers
Given 3 integers, return the max of them.

Example 1:
	Input:  num1 = 1, num2 = 9, num3 = 0
	Output: 9
	
	Explanation: 
	return the Max of them.

Example 2:
	Input:  num1 = 1, num2 = 2, num3 = 3
	Output: 3
	
	Explanation: 
	return the Max of them.
*/

export class Solution {
  /**
   * @param num1: An integer
   * @param num2: An integer
   * @param num3: An integer
   * @return: an interger
   */
  maxOfThreeNumbers1(num1, num2, num3) {
    let max;
    if (num1 >= num2) {
        max = num1;
    } else {
        max = num2;
    }
    if (max >= num3) {
        return max;
    } else {
        return num3;
    }
  }

  maxOfThreeNumbers2(num1, num2, num3) {
    // write your code here
    if (num1 > num2 && num1 > num3) {
      return num1;
    } else if (num2 > num1 && num2 > num3) {
      return num2;
    } else {
      return num3;
    }
  }
}
