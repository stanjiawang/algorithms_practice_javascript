/*
https://www.lintcode.com/problem/382

Triangle Count

Given an array of non-negative integers S, where each element represents the length of a line segment,
return the number of triplets (i, j, k) that can form a triangle.

To form a triangle, the sum of any two sides must be greater than the third:
S[i] + S[j] > S[k]
*/

export class Solution {
  /**
   * Triangle Count
   * @param {number[]} S - Input array of side lengths
   * @return {number} - Number of valid triangle triplets
   */
  triangleCount(S) {
    const n = S.length;
    if (n < 3) return 0; // Fewer than 3 sides cannot form a triangle

    // Step 1️⃣: Sort the array in ascending order
    S.sort((a, b) => a - b);

    let count = 0;

    // Step 2️⃣: Fix the largest side S[k]
    for (let k = 2; k < n; k++) {
      let i = 0;
      let j = k - 1;

      // Step 3️⃣: Use two pointers to find valid smaller sides
      while (i < j) {
        if (S[i] + S[j] > S[k]) {
          // If the sum of S[i] and S[j] is greater than S[k],
          // then every pair (i', j) with i' in [i, j-1] also works,
          // because S[i'] >= S[i] (array is sorted).
          count += (j - i);
          j--; // Move the right pointer inward
        } else {
          // Otherwise, S[i] is too small; try a larger S[i]
          i++;
        }
      }
    }

    return count;
  }
}

/*
| Step                  | Explanation              | Complexity |
| --------------------- | ------------------------ | ---------- |
| Sorting               | Built-in `sort()`        | O(n log n) |
| Outer loop (`k`)      | Fixing each largest side | O(n)       |
| Inner loop (`i`, `j`) | Two-pointer scan per `k` | O(n)       |
| **Total Time**        |                          | **O(n²)**  |
| **Space**             | In-place sort only       | **O(1)**   |
*/
