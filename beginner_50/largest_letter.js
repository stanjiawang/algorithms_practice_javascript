/*
https://www.lintcode.com/problem/353

Given a string S, find an alphabetic character whose upper and lower case letters appear in S. Return the upper case of the letter, or the largest letter if more than one answer exists, or "NO" if none exists.

1<=len(s)<=10^6

Input: S = "admeDCAB"
Output: "D"

Input: S = "adme"
Output: "NO"
*/

export class Solution {
  /**
   * @param s: a string
   * @return: a string
   */
  largestLetter(s) {
    // write your code here
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const upper = new Array(26).fill(false);
    const lower = new Array(26).fill(false);

    for (let char of s) {
        if (char >= "A" && char <= "Z") {
            const index = alphabet.indexOf(char);
            upper[index] = true;
        } else if (char >= "a" && char <= "z") {
            const index = alphabet.indexOf(char.toUpperCase());
            lower[index] = true;
        }
    }

    for (let i = alphabet.length - 1; i >= 0; i--) {
        if (upper[i] && lower[i]) {
            return alphabet[i];
        }
    }

    return "NO";
  }
}
