/*
https://www.lintcode.com/course/98/learn/57?chapterId=519&sectionId=3935&ac=true

3Sum

Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Elements in a triplet (a,b,c) must be in non-descending order. (ie, a ≤ b ≤ c)
The solution set must not contain duplicate triplets.
Arrays may contain duplicate elements, but elements of the same index subscript may not be reused.

Example 1:
Input: numbers = [2,7,11,15]
Output: []
Explanation: Cannot find triples such that the sum of three numbers is 0.

Example 2:
Input: numbers = [-1,0,1,2,-1,-4]
Output: [[-1, 0, 1],[-1, -1, 2]]
Explanation: [-1, 0, 1] and [-1, -1, 2] are the 2 eligible triples.
*/

export class Solution {
  /**
   * @param {number[]} numbers
   * @return {number[][]} all unique triplets [a,b,c] with a+b+c === 0 (a ≤ b ≤ c)
   */
  threeSum(numbers) {
    const res = [];
    const n = numbers.length;

    // Step 1: Sort the array
    // Sorting helps with two things:
    //   - we can use the two-pointer technique efficiently
    //   - the triplets will naturally be in non-decreasing order (a ≤ b ≤ c)
    numbers.sort((a, b) => a - b);

    // Step 2: Iterate through the array, fixing the first element numbers[i]
    for (let i = 0; i < n - 2; i++) {
      // --- Deduplication 1: skip duplicate first elements ---
      // If the current number is the same as the previous one, 
      // we would generate duplicate triplets. Skip it.
      if (i > 0 && numbers[i] === numbers[i - 1]) {
        continue;
      }

      // --- Optimization: break early ---
      // Since the array is sorted, if numbers[i] > 0,
      // then all numbers after i are also ≥ 0.
      // So their sum can never be 0. We can stop.
      if (numbers[i] > 0) {
        break;
      }

      // Step 3: Two-pointer search for the other two numbers
      let l = i + 1;     // left pointer (just after i)
      let r = n - 1;     // right pointer (at the end)

      // Step 4: move l and r inward to find valid triplets
      while (l < r) {
        const sum = numbers[i] + numbers[l] + numbers[r];

        if (sum === 0) {
          // Found a valid triplet
          res.push([numbers[i], numbers[l], numbers[r]]);

          // Move both pointers inward to look for the next solution
          l++;
          r--;

          // --- Deduplication 2: skip duplicate left values ---
          while (l < r && numbers[l] === numbers[l - 1]) {
            l++;
          }

          // --- Deduplication 3: skip duplicate right values ---
          while (l < r && numbers[r] === numbers[r + 1]) {
            r--;
          }

        } else if (sum < 0) {
          // If the sum is too small, move the left pointer rightward
          l++;
        } else {
          // If the sum is too large, move the right pointer leftward
          r--;
        }
      }
    }

    return res;
  }
}

// Time complexity: O(n^2) (outer loop + inner two-pointer scan).
