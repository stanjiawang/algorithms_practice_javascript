/*
https://www.lintcode.com/problem/158/?fromId=213&_from=collection

Valid Anagram

Write a method anagram(s,t) to decide if two strings are anagrams or not.

What is Anagram?
Two strings are anagram if they can be the same after change the order of characters.
*/

export class Solution {
  /**
   * Determine whether two strings are anagrams.
   * Two strings are anagrams if they contain exactly the same characters
   * in any order and with the same frequency.
   *
   * @param {string} firstString - The first input string
   * @param {string} secondString - The second input string
   * @return {boolean} - True if they are anagrams, otherwise false
   */
  anagram(firstString, secondString) {
    // Step 1: If lengths differ, they can't be anagrams
    if (firstString.length !== secondString.length) return false;

    // Step 2: Count character occurrences from the first string
    const charFrequencyMap = new Map();

    for (const char of firstString) {
      const currentCount = charFrequencyMap.get(char) || 0;
      charFrequencyMap.set(char, currentCount + 1);
    }

    // Step 3: For each character in the second string, reduce the count
    for (const char of secondString) {
      // If character does not exist or its count is already zero,
      // it means there's an imbalance → not an anagram
      if (!charFrequencyMap.has(char) || charFrequencyMap.get(char) === 0) {
        return false;
      }
      charFrequencyMap.set(char, charFrequencyMap.get(char) - 1);
    }

    // Step 4: If we reach here, all counts must be balanced to zero
    // (No need to explicitly check, guaranteed by logic above)
    return true;
  }
}

/*
⏱ Complexity
Time: O(n) — One pass over each string
Space: O(k) — Where k is the number of distinct characters
(O(1) if only lowercase a–z)
*/
