export class Solution {
  /**
   * Return all unique combinations of k numbers from nums that sum to target.
   * Works for 2Sum, 3Sum, 4Sum, kSum.
   */
  kSumAll(nums, k, target) {
    nums.sort((a, b) => a - b); // sort for two-pointer + dedup
    const n = nums.length;
    const res = [];

    // Base case: 2Sum with two pointers
    function twoSum(start, target, path) {
      let l = start, r = n - 1;
      while (l < r) {
        const sum = nums[l] + nums[r];
        if (sum === target) {
          res.push([...path, nums[l], nums[r]]);
          // skip duplicates
          const lv = nums[l], rv = nums[r];
          while (l < r && nums[l] === lv) l++;
          while (l < r && nums[r] === rv) r--;
        } else if (sum < target) {
          l++;
        } else {
          r--;
        }
      }
    }

    // General kSum recursion
    function dfs(start, kk, target, path) {
      if (n - start < kk) return; // not enough numbers
      if (kk === 2) {
        twoSum(start, target, path);
        return;
      }
      for (let i = start; i <= n - kk; i++) {
        if (i > start && nums[i] === nums[i - 1]) continue; // skip duplicates
        path.push(nums[i]);
        dfs(i + 1, kk - 1, target - nums[i], path);
        path.pop();
      }
    }

    dfs(0, k, target, []);
    return res;
  }
}

/*
Memory Trick for Interviews
Sort first → makes duplicate removal + two-pointer possible.
Recursion → fix one number, reduce k by 1 and target by that number.
Base case → when k === 2, solve with two-pointer.
Dedup → skip same number in the same recursion layer.
*/
