/*
Given a string s, find the first non-repeating character and return its index.
If no unique character exists, return -1.

Input: s = "leetcode"
Output: 0
Explanation: 'l' appears only once and is the first unique character.

Input: s = "loveleetcode"
Output: 2
Explanation: 'v' appears only once and is the first unique character.

Input: s = "aabb"
Output: -1
Explanation: All characters repeat, so no unique character exists.
*/

export class Solution {
  /**
   * Find the first unique (non-repeating) character in a string.
   * @param {string} s - Input string
   * @return {number} - Index of the first unique character, or -1 if none exists
   */
  firstUniqChar(s) {
    // Step 1: Count the frequency of each character
    const frequencyMap = new Map();

    for (const char of s) {
      frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }

    // Step 2: Find the first character whose frequency is 1
    for (let i = 0; i < s.length; i++) {
      if (frequencyMap.get(s[i]) === 1) {
        return i; // Found the first unique character, return its index
      }
    }

    // Step 3: If no unique character exists, return -1
    return -1;
  }
}

/*
Complexity	Explanation
Time	O(N) — One pass to count, one pass to find
Space	O(K) — Number of unique characters in the string
*/
