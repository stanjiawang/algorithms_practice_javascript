/*
https://www.lintcode.com/problem/1883/?fromId=225&_from=collection

Top K Frequently Mentioned Keywords

Given a list of reviews, a list of keywords and an integer k .

Find out the top k keywords that appear most frequently in different comments, and the k keywords are sorted according to the number of times.

The comparison of strings is case-insensitive. If the mentioned times of keywords are the same in different reviews, list the keywords in alphabetical order.

Example 1:
Input:
k = 2
keywords = ["anacell", "cetracular", "betacellular"]
reviews = [
  "Anacell provides the best services in the city",
  "betacellular has awesome services",
  "Best services provided by anacell, everyone should use anacell",
]
Output:
["anacell", "betacellular"]
Explanation:
"anacell" is occuring in 2 different reviews and "betacellular" is only occuring in 1 review.

Example 2:
Input:
k = 2
keywords = ["anacell", "betacellular", "cetracular", "deltacellular", "eurocell"]
reviews = [
  "I love anacell Best services; Best services provided by anacell",
  "betacellular has great services",
  "deltacellular provides much better services than betacellular",
  "cetracular is worse than anacell",
  "Betacellular is better than deltacellular.",
]
Output:
["betacellular", "anacell"]
Explanation:
"betacellular" is occuring in 3 different reviews. "anacell" and "deltacellular" are occuring in 2 reviews, but "anacell" is lexicographically smaller.
*/

export class Solution {
  /**
   * @param k: an integer
   * @param keywords: a list of string
   * @param reviews: a list of string
   * @return: return the top k keywords list
   */
  topkKeywords(k, keywords, reviews) {
    // write your code here
    if (!k || k <= 0) {
      return [];
    }

    const dictionary = new Set(keywords.map(s => s.toLowerCase()));
    const counts = new Map();

    for (const keyword of dictionary) {
      counts.set(keyword, 0);
    };

    const wordReview = /\b[a-z]+\b/gi;

    for (const review of reviews) {
      const words = review.match(wordReview) || [];
      const seen = new Set(words.map(w => w.toLowerCase()));

      for (const w of seen) {
        if (dictionary.has(w)) {
          counts.set(w, counts.get(w) + 1);
        }
      }
    }

    const candidates = [...counts.entries()].filter(([, c]) => c > 0);

    candidates.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    return candidates.slice(0, k).map(([kw]) => kw);
  }
}
