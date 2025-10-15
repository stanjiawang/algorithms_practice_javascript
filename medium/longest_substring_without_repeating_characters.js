/*
https://www.lintcode.com/problem/384/?fromId=213&_from=collection

Given a string, find the length of the longest substring without repeating characters.

Input: "abcabcbb"
Output: 3
Explanation: The longest substring is "abc".

Input: "bbbbb"
Output: 1
Explanation: The longest substring is "b".
*/

export class Solution {
  /**
   * @param {string} s - input string
   * @return {number} - length of the longest substring without repeating characters
   */
  lengthOfLongestSubstring(s) {
    const seen = new Set(); // stores characters currently in the sliding window
    let left = 0;           // left boundary of the window
    let maxLen = 0;         // record the maximum window size found

    // Expand the right boundary of the window one character at a time
    for (let right = 0; right < s.length; right++) {
      const char = s[right];

      // If we encounter a duplicate, shrink the window from the left
      // until the duplicate character is removed
      while (seen.has(char)) {
        seen.delete(s[left]);
        left++;
      }

      // Add the new character to the current window
      seen.add(char);

      // Update the maximum length found so far
      maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
  }
}

/*
Approach: Sliding Window + HashSet
Time Complexity: O(n)
Space Complexity: O(k)
*/
