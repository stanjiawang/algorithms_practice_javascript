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
   * Word Break — Dynamic Programming with length pruning
   *
   * @param {string} s - The input string to segment.
   * @param {string[]|Set<string>} wordSet - Dictionary; words can be reused.
   * @return {boolean} True if `s` can be segmented into dictionary words, else false.
   *
   * Idea (based on the string, not the dictionary):
   * ------------------------------------------------
   * Let canSegmentUpTo[i] mean: the prefix s[0..i-1] (first i chars) can be segmented.
   * Transition: canSegmentUpTo[end] = true if there exists a start such that
   *   - canSegmentUpTo[start] is true, and
   *   - s.slice(start, end) is in the dictionary.
   *
   * Pruning:
   *   Only try substring lengths that actually exist in the dictionary (e.g., {1,2,5}),
   *   and skip lengths longer than the current end index. This avoids useless checks.
   *
   * Time:  O(n * K), where n = s.length, K = number of distinct word lengths in the dict
   * Space: O(n)
   */
  wordBreak(s, wordSet) {
    // Edge cases
    if (s.length === 0) return true;

    // Normalize dictionary to a Set for O(1) lookups; filter out empty strings if any.
    const dictionary = new Set();
    if (wordSet && typeof wordSet[Symbol.iterator] === "function") {
      for (const w of wordSet) {
        if (typeof w === "string" && w.length > 0) dictionary.add(w);
      }
    }
    if (dictionary.size === 0) return false;

    // Collect actual word lengths to iterate precisely (e.g., {1, 2, 5})
    const wordLengths = new Set();
    for (const w of dictionary) wordLengths.add(w.length);

    const n = s.length;

    // canSegmentUpTo[i] == true  ⇔  s[0..i-1] can be segmented
    const canSegmentUpTo = new Array(n + 1).fill(false);
    canSegmentUpTo[0] = true; // empty prefix is segmentable (base case)

    // Try to build up segmentability from left to right
    for (let endIndex = 1; endIndex <= n; endIndex++) {
      // Only try lengths that exist in the dictionary and fit into [0..endIndex)
      for (const length of wordLengths) {
        if (length > endIndex) continue;

        const startIndex = endIndex - length;

        // If the prefix up to startIndex isn't segmentable, no need to check this piece
        if (!canSegmentUpTo[startIndex]) continue;

        const candidate = s.slice(startIndex, endIndex);
        if (dictionary.has(candidate)) {
          canSegmentUpTo[endIndex] = true;
          break; // Found a valid cut ending at endIndex; no need to try other lengths
        }
      }
    }

    return canSegmentUpTo[n];
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
