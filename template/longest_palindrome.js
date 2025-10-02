/*
https://www.lintcode.com/course/90/learn/627?chapterId=467&sectionId=3279&ac=true

Longest Palindrome

Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.
This is case sensitive, for example "Aa" is not considered a palindrome here.

Input : s = "abccccdd"
Output : 7
Explanation :
One longest palindrome that can be built is "dccaccd", whose length is `7`.
*/

export class Solution {
  /**
   * @param s: a string which consists of lowercase or uppercase letters
   * @return: the length of the longest palindromes that can be built
   */
  longestPalindrome(s) {
    // Edge case
    if (!s || s.length === 0) return 0;

    const oddChars = new Set(); // holds chars with odd occurrences so far

    for (const ch of s) {
      if (oddChars.has(ch)) {
        // We've seen 'ch' before (odd -> even): complete a pair, remove it
        oddChars.delete(ch);
      } else {
        // First/odd occurrence: mark as odd
        oddChars.add(ch);
      }
    }

    // oddChars.size = number of characters with odd counts
    // We can use all even parts: s.length - oddCount
    // If there is any odd at all, we can place exactly one in the center (+1)
    const oddCount = oddChars.size;
    return s.length - oddCount + (oddCount > 0 ? 1 : 0);
  }
}
