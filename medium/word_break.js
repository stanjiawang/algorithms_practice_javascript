/*
https://www.lintcode.com/course/90/learn/107?chapterId=473&sectionId=3301&ac=true

Word Break

Given the string s and the word dictionary dict, determine whether s can be concatenated using the words that appear in the dictionary dict, where the words in the dictionary dict can be reused.

Because we have used stronger data, the ordinary DFS method can not pass this question now.


Example 1:
Input:
s = "lintcode"
dict = ["lint", "code"]
Output: true
Explanation:
Lintcode can be divided into lint and code.

Example 2:
Input:
s = "a"
dict = ["a"]
Output: true
Explanation:
a is in the dict.
*/

export class Solution {
  /**
   * Word Break — minimal DP with length pruning
   * @param {string} s
   * @param {string[]|Set<string>} wordSet
   * @return {boolean}
   */
  wordBreak(s, wordSet) {
    // Empty string is segmentable by definition.
    if (s.length === 0) return true;

    // O(1) lookups; works for array or Set input.
    const dictionary = new Set(wordSet);

    // Only try real word lengths (pruning).
    const wordLengths = new Set();
    for (const w of dictionary) wordLengths.add(w.length);

    const n = s.length;
    // canSegment[i]: s[0..i) can be segmented.
    const canSegment = new Array(n + 1).fill(false);
    canSegment[0] = true;

    for (let end = 1; end <= n; end++) {
      for (const len of wordLengths) {
        if (len > end) continue;              // too long to fit here
        const start = end - len;
        if (!canSegment[start]) continue;     // prefix not segmentable

        if (dictionary.has(s.slice(start, end))) {
          canSegment[end] = true;             // found a valid cut
          break;                              // no need to try more lengths
        }
      }
    }
    return canSegment[n];
  }
}


/*
How to explain it in an interview (short & crisp)

“I use DP where canSegmentUpTo[i] means the prefix of length i is segmentable.
For each endIndex, I only try substring lengths that actually occur in the dictionary.
If any such piece s[startIndex..endIndex) is a dictionary word and the prefix before it was segmentable, I mark canSegmentUpTo[endIndex] = true.
The answer is canSegmentUpTo[n].”

Why it’s fast

Set lookups are O(1).

You don’t try every startIndex—only the few lengths that exist in the dictionary.
*/
