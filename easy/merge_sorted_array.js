/*
https://www.lintcode.com/course/98/learn/64?chapterId=517&sectionId=3907&ac=false

Merge Sorted Array 

Given two sorted integer arrays A and B, merge B into A as one sorted array.
Modify array A in-place to merge array B into the back of array A.

You may assume that A has enough space (size that is greater or equal to m + n) to hold additional elements from B. The number of elements initialized in A and B are m and n respectively.

Example 1:

Input:
A = [1,2,3]
m = 3
B = [4,5]
n = 2
Output:
[1,2,3,4,5]
Explanation:
After merge, A will be filled as [1,2,3,4,5]

Example 2:
Input:
A = [1,2,5]
m = 3
B = [3,4]
n = 2
Output:
[1,2,3,4,5]
Explanation:
After merge, A will be filled as [1,2,3,4,5]
*/

// A has enough trailing space to fit all elements from B.
// Start merging from the back to avoid overwriting useful elements in A.

export class Solution {
  /**
   * @param {number[]} A - first array, has size >= m + n
   * @param {number} m   - number of initialized elements in A
   * @param {number[]} B - second array
   * @param {number} n   - number of initialized elements in B
   * @return {void}  Do not return anything, modify A in-place.
   */
  merge(A, m, B, n) {
    let i = m - 1;      // last valid element in A
    let j = n - 1;      // last element in B
    let k = m + n - 1;  // last position in A (including extra space)

    // Fill A from the back
    while (i >= 0 && j >= 0) {
      if (A[i] > B[j]) {
        A[k] = A[i];
        i--;
      } else {
        A[k] = B[j];
        j--;
      }
      k--;
    }

    // Copy any leftover elements from B
    while (j >= 0) {
      A[k] = B[j];
      j--;
      k--;
    }
  }
}



