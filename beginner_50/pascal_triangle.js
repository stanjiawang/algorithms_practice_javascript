/*
https://www.lintcode.com/problem/768

Given an integer n, return the first n-line Pascal's triangle.

0<=n<=20

Input : n = 4
Output :  
[
 [1]
 [1,1]
 [1,2,1]
 [1,3,3,1]
]
*/


export class Solution {
  /**
   * @param n: a Integer
   * @return: the first n-line Yang Hui's triangle
   */
  calcYangHuisTriangle(n) {
    // write your code here
    if (n <= 0) return [];

    const res = [];
    // build rows of length 1..n
    for (let i = 1; i <= n; i++) {
      res.push(new Array(i).fill(0));
    }

    // set borders to 1
    for (let j = 0; j < n; j++) {
      res[j][0] = 1;
      res[j][j] = 1; // last element in row j (row length = j+1)
    }

    // fill inner cells using Pascal rule
    for (let k = 2; k < n; k++) {
      for (let l = 1; l < k; l++) {                 // <-- only 1..k-1
        res[k][l] = res[k - 1][l - 1] + res[k - 1][l];
      }
    }
    return res;
  }
}
