# CoderPad Technical Interview Preparation Manual

## Chapter 1 — Array & String Problems

> This chapter includes line‑by‑line solutions, **answers** to discussion points, and **worked answers** to mock interview prompts.

---

## 🧩 Problem 1 — Remove Adjacent Duplicates in String

### Problem Summary
Given a string `s`, repeatedly remove pairs of adjacent identical letters until no such pairs remain. Return the final string.

**Example**
```
Input:  "abbaca"
Output: "ca"
```

### 中文题意
给定字符串 `s`，不断删除相邻的重复字符（成对），直到无法再删除；返回最终字符串。

### Intuition & Approach
Use a **stack**. Scan once:
- If top of stack equals current char → pop (remove the pair)
- Else → push

### JavaScript (Line‑by‑Line)
```js
function removeDuplicates(s) {
  const stack = [];
  for (const char of s) {
    if (stack.length > 0 && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  return stack.join('');
}
```

### Complexity
- Time: **O(n)** (each char processed once)
- Space: **O(n)**

### Discussion Answers
1) **Why O(n)?** Each char is pushed/popped at most once.
2) **In‑place method?** Two‑pointer write index solution.
3) **Triplet rule?** Track counts per char; pop when count==3.

---

## 🧩 Problem 2 — First Unique Character in a String

### Problem Summary
Return the index of the first non‑repeating character; if none, return `-1`.

### 中文题意
返回第一个不重复字符的索引；如不存在，返回 `-1`。

### Approach
Two passes with a frequency map.

### JavaScript (Line‑by‑Line)
```js
function firstUniqChar(s) {
  const freq = new Map();
  for (const ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }
  return -1;
}
```

### Complexity
- Time: **O(n)**
- Space: **O(1)** if alphabet fixed

### Discussion Answers
1) Two passes ensure known counts.
2) One pass variant uses queue + map.
3) Fixed alphabet → constant space.

---

## 🧩 Problem 3 — Merge Intervals

### Problem Summary
Merge all overlapping intervals.

### 中文题意
合并重叠区间，返回合并结果。

### Approach
Sort by start; merge sequentially.

### JavaScript (Line‑by‑Line)
```js
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const cur of intervals) {
    if (merged.length === 0 || merged[merged.length - 1][1] < cur[0]) {
      merged.push(cur);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], cur[1]);
    }
  }
  return merged;
}
```

### Complexity
- Time: **O(n log n)** for sort
- Space: **O(n)**

### Discussion Answers
1) Sorting groups overlaps contiguously.
2) O(n) only if pre‑sorted.
3) Works for floats; watch precision.

---

## 🧩 Problem 4 — Two Sum II (Array Sorted)

### Problem Summary
Given a sorted array `numbers` and a target, return indices (1‑based) of two numbers whose sum equals target.

### 中文题意
在有序数组中找到和为目标的两个数，返回 1‑based 索引。

### Approach — Two Pointers
Use `left`, `right` moving inward.

### JavaScript (Line‑by‑Line)
```js
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++; else right--;
  }
  return [];
}
```

### Complexity
- Time: **O(n)**
- Space: **O(1)**

### Discussion Answers
1) Sorted order enables monotonic pointer moves.
2) Unsorted version uses hash map.
3) For multiple pairs, skip duplicates after recording.

---

# ✅ Worked Answers — Chapter 1 Mock Interview Prompts

## Prompt A — Remove pairs and triplets
Use stack of `{char,count}`. Increment count; pop when count==2 or 3.

```js
function removePairsAndTriplets(s) {
  const stack = [];
  for (const ch of s) {
    if (stack.length && stack[stack.length - 1].ch === ch) {
      stack[stack.length - 1].count++;
      const cnt = stack[stack.length - 1].count;
      if (cnt === 2 || cnt === 3) stack.pop();
    } else {
      stack.push({ ch, count: 1 });
    }
  }
  return stack.map(x => x.ch.repeat(x.count)).join('');
}
```

---

## Prompt B — Max overlapping intervals
Sweep‑line counting.

```js
function maxOverlap(intervals) {
  const events = [];
  for (const [s, e] of intervals) {
    events.push([s, +1]);
    events.push([e, -1]);
  }
  events.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  let cur = 0, best = 0;
  for (const [, d] of events) {
    cur += d;
    best = Math.max(best, cur);
  }
  return best;
}
```

---

## Prompt C — Two numbers whose product equals target
Assume non‑negative sorted.

```js
function twoProductSortedNonNegative(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const prod = nums[l] * nums[r];
    if (prod === target) return [l, r];
    if (prod < target) l++; else r--;
  }
  return [-1, -1];
}
```

Handle zeros and negatives separately if present.

---

# Chapter 1 Summary
Stack / Hash / Sorting / Two‑Pointer patterns are fundamental.

---

## Chapter 2 — Hash / Map Problems

### Problem 5 — Group Anagrams
Group words that are anagrams.

```js
function groupAnagrams(words) {
  const map = new Map();
  for (const w of words) {
    const key = w.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return Array.from(map.values());
}
```
**Time:** O(n * k log k)  (k = average word length)
**Space:** O(nk)

**Discussion Answers:**
1) Sorting letters provides canonical key; O(k log k) per word.
2) Alternative key: frequency signature (26 counts) → O(k).
3) Case sensitivity handled by normalizing to lowercase.

**Mock Prompt:** Modify to support Unicode → use `Array.from(w).sort().join('')` or frequency by code points.

---

### Problem 6 — Word Frequency Sort
Sort words by descending frequency, then alphabetically.

```js
function topWords(words) {
  const freq = new Map();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(x => x[0]);
}
```
**Time:** O(n log n)
**Space:** O(n)

**Discussion Answers:**
1) Sorting criteria combine numeric and lexical ordering.
2) Stable sort matters if equal frequency.
3) LocaleCompare handles Unicode ordering correctly.

**Mock Prompt:** If data too large for memory, stream counts into external map or distributed reduce (e.g., MapReduce word count).

---

## Chapter 3 — Graph / BFS / DFS Problems

### Problem 7 — Accounts Merge
Use Union‑Find or DFS.

```js
function accountsMerge(accounts) {
  const emailToName = new Map();
  const graph = new Map();
  for (const acc of accounts) {
    const name = acc[0];
    for (let i = 1; i < acc.length; i++) {
      const email = acc[i];
      emailToName.set(email, name);
      if (i === 1) continue;
      const prev = acc[i - 1];
      if (!graph.has(prev)) graph.set(prev, new Set());
      if (!graph.has(email)) graph.set(email, new Set());
      graph.get(prev).add(email);
      graph.get(email).add(prev);
    }
  }

  const seen = new Set();
  const res = [];
  for (const email of graph.keys()) {
    if (seen.has(email)) continue;
    const stack = [email];
    const comp = [];
    while (stack.length) {
      const node = stack.pop();
      if (seen.has(node)) continue;
      seen.add(node);
      comp.push(node);
      for (const nei of graph.get(node)) stack.push(nei);
    }
    comp.sort();
    res.push([emailToName.get(email), ...comp]);
  }
  return res;
}
```

**Time:** O(N log N) (sorting per component)

**Mock Prompt:** Replace DFS with Union‑Find → explain pros/cons (UF faster for dense graphs; DFS simpler to reason).

---

### Problem 8 — Word Ladder (Shortest transformation)
Use BFS from begin → end by one‑letter changes.

```js
function ladderLength(begin, end, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(end)) return 0;
  const q = [[begin, 1]];
  while (q.length) {
    const [word, steps] = q.shift();
    if (word === end) return steps;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (wordSet.has(next)) {
          q.push([next, steps + 1]);
          wordSet.delete(next);
        }
      }
    }
  }
  return 0;
}
```
**Time:** O(N * L * 26)

**Discussion Answers:** BFS guarantees shortest path; generate neighbors by mutation.

**Mock Prompt:** Optimize with bi‑directional BFS to cut search space.

---

## Chapter 4 — Dynamic Programming

### Problem 9 — Word Break
Determine if string can be segmented into dictionary words.

```js
function wordBreak(s, dict) {
  const wordSet = new Set(dict);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}
```

**Time:** O(n²)
**Space:** O(n)

**Discussion:** Classic segmentation DP; nested loop checks substrings.

---

## Chapter 5 — Practical JavaScript / System Design Concepts

### Debounce & Throttle
```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

### Promise.all Implementation
```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(v => {
          results[i] = v;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}
```

---

# Final Takeaways
- Patterns: Stack, Map, Sorting, Two‑Pointers, BFS/DFS, DP.
- Always explain reasoning, edge cases, complexity.
- Communicate thought process clearly during CoderPad session.

