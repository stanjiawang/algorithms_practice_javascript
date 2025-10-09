/*
https://www.lintcode.com/problem/1887/?fromId=213&_from=collection

Stretch Word

Given a string, you can get a new string by manipulating the same consecutive characters in the string.
You are only allowed to do the following:
Keep 1 or 2 characters of the same character whose continuous times are greater than or equal to 2, and delete the rest.

You have to make sure that there are no more than two consecutive identical characters in the new string.
If the input string meets the requirements, you don't need to do anything with it.

Input: 
S = "helllllooo"
Output: 
4
Explanation: 
The answers are "hello", "helo","heloo","helloo"

Input: 
S = "bbaa"
Output: 
4
Explanation: 
The answers are "bbaa", "bba","baa","ba"
*/

export class Solution {
  /**
   * Count how many distinct valid strings can be formed by compressing
   * each run (group of consecutive identical characters) so that the result
   * contains at most two identical characters in a row.
   *
   * Rule per run:
   *  - If run length = 1  → exactly 1 choice (keep 1)
   *  - If run length ≥ 2  → exactly 2 choices (keep 1 or keep 2)
   *
   * Overall count = product of choices over all runs
   *               = 2^(number of runs with length ≥ 2)
   *
   * @param s - input string
   * @returns number of distinct valid strings
   *
   * Time:  O(n)  — one pass to identify runs
   * Space: O(1)  — constant extra space
   */
  stretchWord(s: string): number {
    if (s.length === 0) return 1; // empty string is already valid

    let resultCount = 1; // multiply choices per run
    let index = 0;

    while (index < s.length) {
      // Find the end of the current run starting at `index`
      let next = index + 1;
      while (next < s.length && s[next] === s[index]) {
        next++;
      }

      const runLength = next - index;

      // For any run of length >= 2, we have 2 choices: keep 1 or keep 2.
      if (runLength >= 2) {
        resultCount *= 2;
      }

      // Advance to the next run
      index = next;
    }

    return resultCount;
  }
}
