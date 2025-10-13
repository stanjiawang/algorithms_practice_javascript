/*
https://www.lintcode.com/problem/124/description?fromId=213&_from=collection

Longest Consecutive Sequence

Given an unsorted array num of integers, find the length of the longest consecutive elements sequence.

Example 1:
Input:
num = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation:
The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length:4
*/

export class Solution {
  /**
   * longestConsecutive
   * Find the length of the longest consecutive elements sequence.
   *
   * Example:
   * Input: [100, 4, 200, 1, 3, 2]
   * Output: 4  // sequence [1, 2, 3, 4]
   *
   * @param {number[]} num - Input array of integers (unsorted, may contain duplicates)
   * @return {number} - Length of the longest consecutive sequence
   */
  longestConsecutive(num) {
    // 🧱 Step 1. Edge case: if the array is empty, return 0 immediately
    if (!num || num.length === 0) return 0;

    // 🪜 Step 2. Sort the array in ascending order so consecutive numbers are adjacent
    num.sort((a, b) => a - b);

    // 🧩 Step 3. Initialize tracking variables
    let longest = 1;       // longest consecutive sequence found so far
    let currentStreak = 1; // length of the current consecutive streak

    // 🌀 Step 4. Traverse the sorted array to count consecutive numbers
    for (let i = 1; i < num.length; i++) {
      // If current number is a duplicate, skip it
      // (so that duplicates won't break the sequence)
      if (num[i] === num[i - 1]) continue;

      // ✅ Case 1: If current number is consecutive to the previous one
      if (num[i] === num[i - 1] + 1) {
        currentStreak++; // extend the streak
        longest = Math.max(longest, currentStreak); // update max if needed
      } 
      // ❌ Case 2: Sequence breaks (gap found)
      else {
        currentStreak = 1; // reset streak counter
      }
    }

    // 🏁 Step 5. Return the longest consecutive sequence length
    return longest;
  }
}

/*
| Complexity Type | Description                                                            |
| --------------- | ---------------------------------------------------------------------- |
| **Time**        | **O(n log n)** — sorting dominates the complexity                      |
| **Space**       | **O(1)** — only uses constant extra variables (ignoring sorting space) |
*/

export class Solution {
  /**
   * longestConsecutive
   * Find the length of the longest consecutive elements sequence.
   *
   * Example:
   * Input: [100, 4, 200, 1, 3, 2]
   * Output: 4   // sequence [1, 2, 3, 4]
   *
   * @param {number[]} num - Unsorted integer array
   * @return {number} - Length of the longest consecutive sequence
   */
  longestConsecutive(num) {
    // 🧱 Step 1. Handle edge case: empty input
    if (!num || num.length === 0) return 0;

    // 🪜 Step 2. Put all numbers into a Set for O(1) lookups
    const set = new Set(num);
    let longest = 0; // record the longest consecutive length found so far

    // 🧩 Step 3. Traverse each number in the set
    for (const n of set) {
      /**
       * 💡 Key insight:
       * A number n is the *start* of a sequence
       * only if (n - 1) does NOT exist in the set.
       *
       * That ensures we only start counting once per sequence.
       * e.g. in [1,2,3,4], only 1 will trigger the counting.
       */
      if (!set.has(n - 1)) {
        let current = n;     // current number being checked
        let streak = 1;      // length of the current sequence

        // 🌀 Step 4. Expand to the right (n+1, n+2, …)
        while (set.has(current + 1)) {
          current++;
          streak++;
        }

        // 🏁 Step 5. Update global maximum if needed
        longest = Math.max(longest, streak);
      }
    }

    // ✅ Step 6. Return the longest sequence length found
    return longest;
  }
}

/*
Time Complexity	O(n) — each number visited once
Space Complexity	O(n) — because of the Set
*/
