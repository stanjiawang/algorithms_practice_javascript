/*
https://www.lintcode.com/problem/50
Product of Array Exclude Itself

Given an integers array A.Define B[i]=A[0]∗...∗A[i−1]∗A[i+1]∗...∗A[n−1], calculate B WITHOUT divide operation.Out put B

Example 1:
Input: A = [1,2,3]
Output: [6,3,2]
Explanation:
B[0] = A[1] * A[2] = 6; B[1] = A[0] * A[2] = 3; B[2] = A[0] * A[1] = 2

Example 2:
Input: A = [2,4,6]
Output: [24,12,8]
Explanation:
B[0] = A[1] * A[2] = 24; B[1] = A[0] * A[2] = 12; B[2] = A[0] * A[1] = 8
*/

export class Solution {
  /**
   * @param nums: Given an integers array A
   * @return: A long long array B and B[i]= A[0] * ... * A[i-1] * A[i+1] * ... * A[n-1]
   */
  productExcludeItself(nums) {
    // write your code here
    const B = [];

    for (let i = 0; i < nums.length; i++) {
        let res = 1;
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                res = nums[j] * res;
            }
        }
        B.push(res);
    }

    return B;
  }
}
