/*
https://www.lintcode.com/problem/18/?fromId=213&_from=collection

Subsets II

Given a collection of integers that might contain duplicate numbers, return all possible subsets.

Each element in a subset must be in non-descending order.
The ordering between two subsets is free.
The solution set must not contain duplicate subsets.

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
Input: nums = [1,2,2]
Output:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
Explanation:
The distinct subsets of [1,2,2] are [], [1], [2], [1,2], [2,2], [1,2,2].
*/

export class Solution {
  /**
   * @param {number[]} nums - Input array (may contain duplicates)
   * @return {number[][]} - All unique subsets
   */
  subsetsWithDup(nums) {
    const results = [];
    nums.sort((a, b) => a - b); // Step 1: Sort to handle duplicates

    /**
     * @param {number} start - Current index in nums
     * @param {number[]} currentSubset - Current subset being built
     */
    const dfs = (start, currentSubset) => {
      // Step 2: Add the current subset (make a copy)
      results.push([...currentSubset]);

      // Step 3: Explore further elements
      for (let i = start; i < nums.length; i++) {
        // Step 4: Skip duplicates (only for the same recursion level)
        if (i > start && nums[i] === nums[i - 1]) continue;

        // Step 5: Include current number
        currentSubset.push(nums[i]);

        // Step 6: Recurse with next index
        dfs(i + 1, currentSubset);

        // Step 7: Backtrack (remove last added number)
        currentSubset.pop();
      }
    };

    dfs(0, []); // Start DFS from index 0 with an empty subset
    return results;
  }
}

/*
| Complexity Type | Analysis                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------- |
| **Time**        | **O(2ⁿ)** — Each element can be included or not (though duplicates reduce some branches). |
| **Space**       | **O(n)** — Recursion depth up to `n` (length of `nums`).                                  |
*/

