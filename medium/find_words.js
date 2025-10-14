/*
https://www.lintcode.com/problem/194/?fromId=213&_from=collection

Find Words

Given a string str and a dictionary dict, you need to find out which words in the dictionary are subsequences of the string and return those words.
The order of the words returned should be the same as the order in the dictionary.

|str|<=1000
the sum of all words length in dictionary<=1000

Input:
str="bcogtadsjofisdhklasdj"
dict=["book","code","tag"]
Output:
["book"]
Explanation:Only book is a subsequence of str

Input:
str="nmownhiterer"
dict=["nowhere","monitor","moniter"]
Output:
["nowhere","moniter"]
*/

export class Solution {
  /**
   * Find all words in the dictionary that are subsequences of the given string.
   *
   * @param {string} str - The main string.
   * @param {string[]} dict - List of candidate words.
   * @return {string[]} - Words that are subsequences of str.
   */
  findWords(str, dict) {
    const result = [];

    for (const word of dict) {
      if (this.isSubsequence(word, str)) {
        result.push(word);
      }
    }

    return result;
  }

  /**
   * Helper function to check if 'word' is a subsequence of 'str'.
   *
   * Two-pointer approach:
   * - i → scans the main string 'str'
   * - j → scans the candidate word 'word'
   * - Move both when chars match; otherwise, move only i.
   * - If j reaches word.length, all chars were matched in order.
   *
   * @param {string} word - Candidate word to check.
   * @param {string} str - The main string.
   * @return {boolean} - True if word is a subsequence of str.
   */
  isSubsequence(word, str) {
    let i = 0; // pointer for str
    let j = 0; // pointer for word

    while (i < str.length && j < word.length) {
      if (str[i] === word[j]) {
        j++; // match found, move to next char in word
      }
      i++; // always move in str
    }

    return j === word.length; // all chars matched
  }
}

/*
Time Complexity: O(N + ΣM) → We scan the main string once for each word,
but since the total length of all words is limited, it’s linear overall.
Space Complexity: O(1) → We only use two pointers.
In a more general case (if dictionary is unbounded), it would be O(N × K).
*/


