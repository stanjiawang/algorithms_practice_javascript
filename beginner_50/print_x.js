/*
https://www.lintcode.com/problem/25

Print X
Enter a positive integer 'N'. You need to return a list of strings as shown in the Example.

Example 1:
Input: n = 1
Output:["X"]
Explanation:
The answer list can be seen as the following shape:
X

Example 2:
Input:n = 2
Output:["XX", "XX"]
Explanation:
The answer list can be seen as the following shape:
XX
XX

Example 3:
Input:n = 3
Output:["X X", " X ", "X X"]
Explanation:
The answer list can be seen as the following shape:
X X
 X 
X X

Example 4:
Input:n = 4
Output:["X  X", " XX ", " XX ", "X  X"]
Explanation:
The answer list can be seen as the following shape:
X  X 
 XX  
 XX 
X  X

Example 5:
Input:n = 5
Output:["X   X", " X X ", "  X  ", " X X ", "X   X"]
Explanation:
The answer list can be seen as the following shape:

X   X 
 X X  
  X   
 X X  
X   X 
*/

export class Solution {
  /**
   * @param n: An integer.
   * @return: A string list.
   */
  printX(n) {
    // write your code here
    let array = [];
    for (let i = 0; i < n ; i++) {
       let string = '';
        for (let j = 0; j < n ; j++) {
            if (i === j || i === n - j - 1) {
              string += 'X';
            } else {
              string += ' ';
            }
        }
        array.push(string);
    }
    return array;
  }
}
