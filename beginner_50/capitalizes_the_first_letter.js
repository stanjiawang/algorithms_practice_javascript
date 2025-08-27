/*
https://www.lintcode.com/problem/936

Given a sentence of English, update the first letter of each word to uppercase.

The given sentence may not be a grammatical sentence.
The length of the sentence does not exceed 100.
Except for the beginning of the sentence, the rest of the letters are all lowercase

Example1
Input: s =  "i want to get an accepted"
Output: "I Want To Get An Accepted"

Example2
Input: s =  "i jidls    mdijf  i  lsidj  i p l   "
Output: "I Jidls    Mdijf  I  Lsidj  I P L   "
*/

export class Solution {
  /**
   * @param s: a string
   * @return: a string after capitalizes the first letter
   */
  capitalizesFirst(s) {
    // Write your code here
    const res = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] >= "a" && s[i] <= "z" && (i === 0 || s[i - 1] === " ")) {
        res.push(s[i].toUpperCase());
      } else {
        res.push(s[i]);
      }
    }

    return res.join("");
  }
}
