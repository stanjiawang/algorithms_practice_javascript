/*
https://www.lintcode.com/problem/17/?fromId=213&_from=collection

Subsets

Given a set with distinct integers, return all possible subsets (in any order).

The returned result set is required to contain no duplicate subsets
The subsets in the returned result set can be in any order
For each subset of the returned result set, sort the values of its elements from smallest to largest, i.e., [1, 2, 3] meets the requirements of the question, while [3, 2, 1] does not

Example 1:
Input: nums = [0] 
Output:
[ 
  [], 
  [0] 
] 
Explanation:
The subsets of [0] are only [] and [0].

Example 2:
Input: nums = [1,2,3] 
Output:
[ 
  [3], 
  [1], 
  [2], 
  [1,2,3], 
  [1,3], 
  [2,3], 
  [1,2], 
  [] 
] 
Explanation:
The subsets of [1,2,3] are [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3].
*/

export class Solution {
  /**
   * Generate all subsets (power set) of a set of distinct integers.
   * - Each subset's elements are in ascending order.
   * - No duplicate subsets are produced.
   *
   * @param {number[]} nums - Distinct integers
   * @return {number[][]} - All possible subsets
   */
  subsets(nums) {
    // Ensure each subset is ascending by sorting the input once
    nums.sort((a, b) => a - b);

    const allSubsets = [];

    /**
     * Backtracking helper to build subsets.
     * @param {number} startIndex - Next index in nums we are allowed to use
     * @param {number[]} currentSubset - Current subset being built
     */
    const buildSubsets = (startIndex, currentSubset) => {
      // Snapshot the current subset (copy) into results
      allSubsets.push([...currentSubset]);

      // Explore choices for subsequent positions
      for (let i = startIndex; i < nums.length; i++) {
        // Choose nums[i]
        currentSubset.push(nums[i]);

        // Recurse: only consider elements after i to avoid duplicates
        buildSubsets(i + 1, currentSubset);

        // Un-choose (backtrack) to explore the next candidate
        currentSubset.pop();
      }
    };

    buildSubsets(0, []);
    return allSubsets;
  }
}


/*
Here’s a clean, interview-ready DFS/backtracking solution with meaningful names, full comments, and complexity:

```js
export class Solution {
  /**
   * Generate all subsets (power set) of a set of distinct integers.
   * - Each subset's elements are in ascending order.
   * - No duplicate subsets are produced.
   *
   * @param {number[]} nums - Distinct integers
   * @return {number[][]} - All possible subsets
   */
  subsets(nums) {
    // Ensure each subset is ascending by sorting the input once
    nums.sort((a, b) => a - b);

    const allSubsets = [];

    /**
     * Backtracking helper to build subsets.
     * @param {number} startIndex - Next index in nums we are allowed to use
     * @param {number[]} currentSubset - Current subset being built
     */
    const buildSubsets = (startIndex, currentSubset) => {
      // Snapshot the current subset (copy) into results
      allSubsets.push([...currentSubset]);

      // Explore choices for subsequent positions
      for (let i = startIndex; i < nums.length; i++) {
        // Choose nums[i]
        currentSubset.push(nums[i]);

        // Recurse: only consider elements after i to avoid duplicates
        buildSubsets(i + 1, currentSubset);

        // Un-choose (backtrack) to explore the next candidate
        currentSubset.pop();
      }
    };

    buildSubsets(0, []);
    return allSubsets;
  }
}

/*
### Time & Space Complexity
Time:** (O(n * 2^n)) — there are (2^n) subsets; copying a subset costs up to (O(n)).
Space:** (O(n)) auxiliary (recursion stack and current subset), plus (O(n \cdot 2^n)) for the output.
*/
