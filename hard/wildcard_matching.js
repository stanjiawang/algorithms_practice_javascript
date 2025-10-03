/*
https://www.lintcode.com/course/90/learn/192?chapterId=473&sectionId=3300&ac=true

Wildcard Matching

Given an input string s and a pattern p, implement wildcard pattern matching with support for '?' and '*'. The matching rules are as follows：

'?' Matches any single character.
'*' Matches any sequence of characters (including the empty sequence).
The matching should cover the entire input string (not partial).

Example 1
Input:
"aa"
"a"
Output: false

Example 2
Input:
"aa"
"aa"
Output: true

Example 3
Input:
"aaa"
"aa"
Output: false

Example 4
Input:
"aa"
"*"
Output: true
Explanation: '*' can replace any string

Example 5
Input:
"aa"
"a*"
Output: true

Example 6
Input:
"ab"
"?*"
Output: true
Explanation: '?' -> 'a' '*' -> 'b'

Example 7
Input:
"aab"
"c*a*b"
Output: false
*/

/**
 * Wildcard Matching ('?' matches any single char, '*' matches any sequence incl. empty)
 *
 * Greedy two-pointers with a single fallback to the last seen '*'.
 * Time: O(n + m), Space: O(1), where n = s.length, m = p.length
 *
 * Core idea:
 * - Scan s (string) and p (pattern) left to right.
 * - On letter or '?': they consume exactly one char from both s and p.
 * - On '*': record its index in p and the current index in s, then let '*' match an empty sequence for now
 *           (move pattern pointer past '*'). If a mismatch happens later, "expand" this '*' by one more char:
 *           restore pattern pointer to just after '*', advance the saved s index by one, and resume.
 * - When s is consumed, any remaining chars in p must be '*' (they match empty); otherwise it's not a full match.
 */
export class Solution {
  /**
   * @param {string} s - input string (lowercase letters)
   * @param {string} p - pattern     (lowercase letters, plus '?' and '*')
   * @return {boolean} - true if the entire s matches the entire p
   */
  isMatch(s, p) {
    // Pointers while scanning s and p
    let stringIndex = 0;   // index in s
    let patternIndex = 0;  // index in p

    // Fallback bookkeeping for the most recent '*'
    let lastStarInPattern = -1;       // index of last seen '*' in p; -1 means "no star seen yet"
    let stringIndexWhenStarTried = 0; // s index where that '*' currently starts matching

    // Process until we've consumed the entire input string s
    while (stringIndex < s.length) {
      // Case 1: Exact match or '?' wildcard → consume one char from both s and p
      if (
        patternIndex < p.length &&
        (p[patternIndex] === s[stringIndex] || p[patternIndex] === '?')
      ) {
        stringIndex++;
        patternIndex++;
      }
      // Case 2: We see a '*' in the pattern → record it and move past it
      // For now, assume this '*' matches an empty sequence at stringIndex.
      else if (patternIndex < p.length && p[patternIndex] === '*') {
        lastStarInPattern = patternIndex;         // remember where the '*' is
        stringIndexWhenStarTried = stringIndex;   // remember where in s the '*' started
        patternIndex++;                           // skip '*' to try matching subsequent pattern
      }
      // Case 3: Mismatch, but we have a previous '*' to fallback to
      // Expand that '*' to cover one more character from s, then retry the char after '*'.
      else if (lastStarInPattern !== -1) {
        patternIndex = lastStarInPattern + 1;     // return to the char right after '*'
        stringIndexWhenStarTried += 1;            // let '*' eat one additional char
        stringIndex = stringIndexWhenStarTried;   // resume matching from this new s position
      }
      // Case 4: Mismatch and no '*' to save us → fail fast
      else {
        return false;
      }
    }

    // s is fully consumed. Any remaining pattern chars must be '*' (which can match empty).
    while (patternIndex < p.length && p[patternIndex] === '*') {
      patternIndex++;
    }

    // Valid match only if we've also consumed the entire pattern.
    return patternIndex === p.length;
  }
}
