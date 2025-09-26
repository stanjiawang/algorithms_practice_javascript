/*
Squares of a Sorted Array

Given an array of integers A sorted in non-decreasing order, return an array of the squares of each number, also in sorted non-decreasing order.

Example 1
Input: [-4,-1,0,3,10]
Output: [0,1,9,16,100]

Example 2
Input: [-7,-3,2,3,11]
Output: [4,9,9,49,121]

Example 3
Input: [-4,-2,-1]
Output: [1,4,16]
*/

// O(N)
export class Solution {
  /**
   * @param a: The array A.
   * @return: The array of the squares.
   */
  squareArray(a) {
    // write your code here
    const n = a.length;
    let left = 0;
    let right = n - 1;
    const res = new Array(n);

    for (let i = n - 1; i >= 0; i--) {
      if (Math.abs(a[left]) > Math.abs(a[right])) {
        res[i] = a[left] * a[left];
        left++;
      } else {
        res[i] = a[right] * a[right];
        right--;
      }
    }

    return res;
  }
}

// O(nlogn)
export class Solution {
  /**
   * @param a: The array A.
   * @return: The array of the squares.
   */
  squareArray(a) {
    // write your code here
    const res = a.map(e => e * e);

    return res.sort((a, b) => a - b);
  }
}
