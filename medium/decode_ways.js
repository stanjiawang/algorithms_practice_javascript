/*
https://www.lintcode.com/problem/512/?fromId=213&_from=collection

Decode Ways

A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26

Given an encoded message containing digits, determine the total number of ways to decode it.

we can't decode an empty string. So you should return 0 if the message is empty.
The length of message n≤100

Input: "12"
Output: 2
Explanation: It could be decoded as AB (1 2) or L (12).

Input: "10"
Output: 1
*/
export class Solution {
  /**
   * @param s: a string, encoded message
   * @return: an integer, the number of ways decoding
   */
  numDecodings(s) {
    // --- Edge case: empty string cannot be decoded ---
    if (!s || s.length === 0) return 0;

    const n = s.length;
    const dp = new Array(n + 1).fill(0);

    // --- Base cases ---
    dp[0] = 1; // Empty prefix, 1 way to start (for transition formula)
    dp[1] = s[0] !== '0' ? 1 : 0; // First char must not be '0'

    // --- DP iteration ---
    for (let i = 2; i <= n; i++) {
      const oneDigit = Number(s.slice(i - 1, i));   // Single char
      const twoDigits = Number(s.slice(i - 2, i));  // Two-char substring

      // Case 1: valid single digit (1–9)
      if (oneDigit >= 1 && oneDigit <= 9) {
        dp[i] += dp[i - 1];
      }

      // Case 2: valid two digits (10–26)
      if (twoDigits >= 10 && twoDigits <= 26) {
        dp[i] += dp[i - 2];
      }
    }

    return dp[n];
  }
}

/*
| Type      | Complexity | Explanation                         |
| --------- | ---------- | ----------------------------------- |
| **Time**  | `O(n)`     | Linear scan through the string      |
| **Space** | `O(n)`     | DP array (can be optimized to O(1)) |
*/
