/*
https://www.lintcode.com/problem/13

Implement strStr()

For a given source string and a target string, you should output the first index(from 0) of target string in the source string.If the target does not exist in source, just return -1.

Do I need to implement KMP Algorithm in a real interview?
Not necessary. When you meet this problem in a real interview, the interviewer may just want to test your basic implementation ability. But make sure you confirm how to implement with the interviewer first.

Example 1:
Input:
source = "source"
target = "target"
Output: -1
Explanation:
If the source does not contain the target's content, return - 1.

Example 2:
Input:
source = "abcdabcdefg"
target = "bcd"
Output: 1
Explanation:
If the source contains the target's content, return the location where the target first appeared in the source.

Example 3：
Input:
source = "lintcode"
target = ""
Output: 0
*/

export class Solution {
  /**
   * @param source: 
   * @param target: 
   * @return: return the index
   */
    strStr(source, target) {
    // edge cases
    if (target === "") return 0;
    if (source == null || target == null) return -1;

    const n = source.length;
    const m = target.length;
    if (m > n) return -1;

    for (let i = 0; i <= n - m; i++) {        // <= to include last window
      let j = 0;
      while (j < m && source[i + j] === target[j]) {
        j++;
      }
      if (j === m) return i;                   // full match
    }
    return -1;
  }
}
