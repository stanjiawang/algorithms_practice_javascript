# String & Sequence Problem Templates

Comprehensive guide for **Subsequence**, **Substring**, and **Word
Dictionary** problems.\
Includes: algorithm templates, code patterns, and interview reasoning.

------------------------------------------------------------------------

## 🧩 1️⃣ Subsequence Problems

### 🎯 Definition

A **subsequence** keeps character order but not necessarily continuity.

------------------------------------------------------------------------

### ✅ Template 1: Check if a word is a subsequence

``` js
function isSubsequence(word, str) {
  let i = 0, j = 0;
  while (i < str.length && j < word.length) {
    if (str[i] === word[j]) j++;
    i++;
  }
  return j === word.length;
}
```

**Interview explanation:** \> Maintain two pointers scanning both
strings.\
\> If characters match, advance both. Otherwise, advance the main string
pointer.\
\> If all characters of `word` are matched, it's a valid subsequence.

**Time:** O(n + m)\
**Space:** O(1)

------------------------------------------------------------------------

### ✅ Template 2: Longest Common Subsequence (LCS)

``` js
function longestCommonSubsequence(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1])
        dp[i][j] = dp[i - 1][j - 1] + 1;
      else
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
```

**Interview keywords:**\
\> "Dynamic Programming --- each dp\[i\]\[j\] stores the LCS length up
to i, j."\
\> "Transition: if chars match → +1, else max of left/top."

**Time:** O(m·n)

------------------------------------------------------------------------

### ✅ Template 3: Longest Increasing Subsequence (LIS)

``` js
function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const mid = l + Math.floor((r - l) / 2);
      if (tails[mid] >= x) r = mid;
      else l = mid + 1;
    }
    tails[l] = x;
  }
  return tails.length;
}
```

**Key idea:** patience sorting + binary search\
**Time:** O(n log n)

------------------------------------------------------------------------

## 🧩 2️⃣ Substring Problems

### 🎯 Definition

A **substring** is a **continuous** sequence of characters.

------------------------------------------------------------------------

### ✅ Template 1: Longest Substring Without Repeating Characters

``` js
function lengthOfLongestSubstring(s) {
  let left = 0, maxLen = 0;
  const map = new Map();

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (map.has(ch) && map.get(ch) >= left) {
      left = map.get(ch) + 1; // move start
    }
    map.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
```

**Interview explanation:** \> "Sliding window + hash map to track last
seen index."\
\> "Expand right, shrink left when duplicates appear."

**Time:** O(n)

------------------------------------------------------------------------

### ✅ Template 2: Minimum Window Substring

``` js
function minWindow(s, t) {
  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let missing = t.length, left = 0, start = 0, minLen = Infinity;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (need.has(ch)) {
      if (need.get(ch) > 0) missing--;
      need.set(ch, need.get(ch) - 1);
    }

    while (missing === 0) {
      if (right - left + 1 < minLen) {
        start = left;
        minLen = right - left + 1;
      }
      const leftChar = s[left++];
      if (need.has(leftChar)) {
        need.set(leftChar, need.get(leftChar) + 1);
        if (need.get(leftChar) > 0) missing++;
      }
    }
  }
  return minLen === Infinity ? "" : s.slice(start, start + minLen);
}
```

**Interview explanation:** \> "Expand right to include all required
chars, then shrink left to minimize window."

**Time:** O(n)

------------------------------------------------------------------------

### ✅ Template 3: Longest Palindromic Substring

``` js
function longestPalindrome(s) {
  let res = "";
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--; r++;
    }
    return s.slice(l + 1, r);
  };
  for (let i = 0; i < s.length; i++) {
    const odd = expand(i, i);
    const even = expand(i, i + 1);
    const longer = odd.length > even.length ? odd : even;
    if (longer.length > res.length) res = longer;
  }
  return res;
}
```

**Interview explanation:** \> "Expand around each center --- odd and
even cases."\
\> "O(n²) time, O(1) space, but intuitive."

------------------------------------------------------------------------

## 🧩 3️⃣ Word Dictionary Problems

### 🎯 Definition

A **dictionary** is a list of words --- used to build, search, or
validate strings.

------------------------------------------------------------------------

### ✅ Template 1: Word Break (DP)

``` js
function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
```

**Interview explanation:** \> "DP\[i\] means s\[0..i) can be segmented
into dict words."\
\> "Try all possible cut points j \< i."

**Time:** O(n²)

------------------------------------------------------------------------

### ✅ Template 2: Word Search (Backtracking)

``` js
function exist(board, word) {
  const m = board.length, n = board[0].length;
  const dfs = (i, j, k) => {
    if (k === word.length) return true;
    if (i < 0 || j < 0 || i >= m || j >= n || board[i][j] !== word[k]) return false;
    const temp = board[i][j];
    board[i][j] = '#';
    const found =
      dfs(i + 1, j, k + 1) ||
      dfs(i - 1, j, k + 1) ||
      dfs(i, j + 1, k + 1) ||
      dfs(i, j - 1, k + 1);
    board[i][j] = temp;
    return found;
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}
```

**Interview explanation:** \> "DFS backtracking --- each path explores
one potential match."\
\> "Mark visited cells to avoid reuse."

------------------------------------------------------------------------

### ✅ Template 3: Trie Structure

``` js
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}
class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }
  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }
}
```

**Interview explanation:** \> "Trie = prefix tree; each node represents
a char. Useful for prefix search or autocomplete."

------------------------------------------------------------------------

## 🧠 Summary Table

  -----------------------------------------------------------------------------
  Category      Continuity      Typical Solution      Template        Time
  ------------- --------------- --------------------- --------------- ---------
  Subsequence   ❌              Two-pointer / DP      isSubsequence / O(n+m) /
                                                      LCS             O(n²)

  Substring     ✅              Sliding Window / DP   Longest         O(n) /
                                                      Substring /     O(n²)
                                                      Palindrome      

  Word Dict     ---             DP / Trie / DFS       Word Break /    O(n²) /
                                                      Trie / Word     O(k) /
                                                      Search          O(mn·k)
  -----------------------------------------------------------------------------

------------------------------------------------------------------------

### 🧩 Interview Checklist

✅ Identify type (continuous / order-based / dict).\
✅ Pick right technique:\
- Subsequence → Two-pointer / DP\
- Substring → Sliding Window\
- Word Dict → DP / Trie / DFS\
✅ Explain: state / transition / pointer logic.\
✅ Write clean code + variable names.\
✅ Analyze complexity.

------------------------------------------------------------------------

📚 Author: Jia (Stan) Wang\
📅 Last updated: Oct 2025
