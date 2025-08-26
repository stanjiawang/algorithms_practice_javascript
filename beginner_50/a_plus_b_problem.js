/*
https://www.lintcode.com/problem/1
Write a function that add two numbers a and b, and return the answer as an integer(int).

Example 1:

Input:
a = 1
b = 2

Output:
3

Explanation:
a + b = 1 + 2 = 3

Example 2:

Input:
a = -1
b = 1

Output:
0

Explanation:
a + b = -1 + 1 = 0

Of course you can just return a + b to get accepted. But Can you challenge not do it like that?(You should not use + or any arithmetic operators.)
*/

export class Solution {
  /**
   * @param a: An integer
   * @param b: An integer
   * @return: The sum of a and b 
   */
  aplusb1(a, b) {
    // write your code here
    return a + b;
  }

  aplusb2(a, b) {
  // write your code here
  while (b != 0) {
    // carry now contains common 
    //set bits of a and b
    let carry = a & b;    
    // Sum of bits of x and y where at 
    //least one of the bits is not set
    a = a ^ b; 
 
    // Carry is shifted by one so that adding
    // it to x gives the required sum
    b = carry << 1;
  }
  return a;
}
}
