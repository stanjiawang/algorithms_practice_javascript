# Front-End Interview: High-Frequency Algorithm Templates

## Table of Contents
1. [Binary Search](#binary-search)
   - [Standard Binary Search](#standard-binary-search)
   - [K Closest Elements](#k-closest-elements)
2. [Two Pointers](#two-pointers)
   - [Two Sum (HashMap & Two Pointers)](#two-sum)
   - [Longest Palindrome Length](#longest-palindrome-length)
   - [Merge Sorted Array](#merge-sorted-array)
3. [Tree / DFS / BFS](#tree--dfs--bfs)
   - [Validate BST](#validate-bst)
   - [Kth Smallest in BST](#kth-smallest-in-bst)
   - [Binary Tree Maximum Path Sum](#binary-tree-maximum-path-sum)
   - [Topological Sort](#topological-sort)
   - [01 Matrix (Multi-source BFS)](#01-matrix)
4. [Dynamic Programming](#dynamic-programming)
   - [Longest Increasing Subsequence (LIS)](#longest-increasing-subsequence)
   - [Word Break](#word-break)
5. [Interval / Heap / Design](#interval--heap--design)
   - [Meeting Rooms II](#meeting-rooms-ii)
   - [MinHeap Template](#minheap-template)
   - [LRU Cache](#lru-cache)
   - [K Smallest Pairs (Optional)](#k-smallest-pairs-optional)

---

## Binary Search

### Standard Binary Search
```javascript
function binarySearch(numbers, target) {
  if (!numbers || numbers.length === 0) return -1;
  let left = 0;
  let right = numbers.length - 1;

  while (left + 1 < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (numbers[mid] === target) {
      return mid;
    } else if (numbers[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }

  if (numbers[left] === target) return left;
  if (numbers[right] === target) return right;
  return -1;
}
```

### K Closest Elements
```javascript
function kClosestElements(numbers, k, target) {
  const n = numbers.length;
  if (k >= n) return [...numbers];

  let left = 0, right = n - 1;
  while (left + 1 < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (numbers[mid] >= target) right = mid;
    else left = mid + 1;
  }
  let index = (numbers[left] >= target) ? left : (numbers[right] >= target ? right : n);

  let i = index - 1;
  let j = index;
  const result = [];

  while (result.length < k) {
    if (i < 0) {
      result.push(numbers[j++]);
    } else if (j >= n) {
      result.push(numbers[i--]);
    } else {
      const distLeft = Math.abs(numbers[i] - target);
      const distRight = Math.abs(numbers[j] - target);
      if (distLeft <= distRight) result.push(numbers[i--]);
      else result.push(numbers[j++]);
    }
  }
  result.sort((a, b) => a - b);
  return result;
}
```

---

## Two Pointers

### Two Sum
```javascript
function twoSumHash(numbers, target) {
  const map = new Map();
  for (let index = 0; index < numbers.length; index++) {
    const needed = target - numbers[index];
    if (map.has(needed)) return [map.get(needed), index];
    map.set(numbers[index], index);
  }
  return [-1, -1];
}

function twoSumTwoPointers(sortedNumbers, target) {
  let left = 0, right = sortedNumbers.length - 1;
  while (left < right) {
    const sum = sortedNumbers[left] + sortedNumbers[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}
```

### Longest Palindrome Length
```javascript
function longestPalindromeLength(s) {
  const frequency = new Map();
  for (const ch of s) frequency.set(ch, (frequency.get(ch) || 0) + 1);

  let length = 0;
  let hasOdd = false;

  for (const count of frequency.values()) {
    if (count % 2 === 0) {
      length += count;
    } else {
      length += count - 1;
      hasOdd = true;
    }
  }
  return hasOdd ? length + 1 : length;
}
```

### Merge Sorted Array
```javascript
function mergeIntoA(A, m, B, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (j >= 0) {
    if (i >= 0 && A[i] > B[j]) {
      A[k--] = A[i--];
    } else {
      A[k--] = B[j--];
    }
  }
  return A;
}
```

---

## Tree / DFS / BFS

### Validate BST
```javascript
function isValidBST(root) {
  function dfs(node, low, high) {
    if (!node) return true;
    if ((low !== null && node.val <= low) || (high !== null && node.val >= high)) return false;
    return dfs(node.left, low, node.val) && dfs(node.right, node.val, high);
  }
  return dfs(root, null, null);
}
```

### Kth Smallest in BST
```javascript
function kthSmallest(root, k) {
  const stack = [];
  let curr = root;

  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    k--;
    if (k === 0) return curr.val;
    curr = curr.right;
  }
  return null;
}
```

### Binary Tree Maximum Path Sum
```javascript
function maxPathSum(root) {
  let best = -Infinity;

  function dfs(node) {
    if (!node) return 0;
    const leftGain = Math.max(0, dfs(node.left));
    const rightGain = Math.max(0, dfs(node.right));
    best = Math.max(best, node.val + leftGain + rightGain);
    return node.val + Math.max(leftGain, rightGain);
  }

  dfs(root);
  return best;
}
```

### Topological Sort
```javascript
function topoSort(n, edges) {
  const indeg = Array(n).fill(0);
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    indeg[v]++;
  }

  const queue = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i);

  const order = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of graph[u]) {
      if (--indeg[v] === 0) queue.push(v);
    }
  }

  return order.length === n ? order : [];
}
```

### 01 Matrix
```javascript
function updateMatrix01(mat) {
  const m = mat.length, n = mat[0].length;
  const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
  const q = [];
  let head = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (mat[r][c] === 0) {
        dist[r][c] = 0;
        q.push([r, c]);
      }
    }
  }

  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (head < q.length) {
    const [r, c] = q[head++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
      if (dist[nr][nc] > dist[r][c] + 1) {
        dist[nr][nc] = dist[r][c] + 1;
        q.push([nr, nc]);
      }
    }
  }
  return dist;
}
```

---

## Dynamic Programming

### Longest Increasing Subsequence
```javascript
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

### Word Break
```javascript
function wordBreak(s, wordDict) {
  const dict = new Set(wordDict);
  const n = s.length;
  const dp = Array(n + 1).fill(false);
  dp[0] = true;

  let maxLen = 0;
  for (const w of dict) maxLen = Math.max(maxLen, w.length);

  for (let i = 1; i <= n; i++) {
    for (let j = Math.max(0, i - maxLen); j < i; j++) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}
```

---

## Interval / Heap / Design

### Meeting Rooms II
```javascript
function minMeetingRooms(intervals) {
  const starts = intervals.map(x => x[0]).sort((a, b) => a - b);
  const ends = intervals.map(x => x[1]).sort((a, b) => a - b);

  let s = 0, e = 0;
  let rooms = 0, maxRooms = 0;

  while (s < starts.length) {
    if (starts[s] < ends[e]) {
      rooms++;
      maxRooms = Math.max(maxRooms, rooms);
      s++;
    } else {
      rooms--;
      e++;
    }
  }
  return maxRooms;
}
```

### MinHeap Template
```javascript
class MinHeap {
  constructor(cmp = (a, b) => a - b) {
    this.arr = [];
    this.cmp = cmp;
  }
  size() { return this.arr.length; }
  peek() { return this.arr[0]; }

  push(x) {
    this.arr.push(x);
    this._siftUp(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return undefined;
    const top = this.arr[0];
    const last = this.arr.pop();
    if (this.arr.length) {
      this.arr[0] = last;
      this._siftDown(0);
    }
    return top;
  }
  _parent(i) { return ((i - 1) >> 1); }
  _left(i) { return (i << 1) + 1; }
  _right(i) { return (i << 1) + 2; }

  _siftUp(i) {
    while (i > 0) {
      const p = this._parent(i);
      if (this.cmp(this.arr[i], this.arr[p]) < 0) {
        [this.arr[i], this.arr[p]] = [this.arr[p], this.arr[i]];
        i = p;
      } else break;
    }
  }
  _siftDown(i) {
    const n = this.arr.length;
    while (true) {
      let smallest = i;
      const l = this._left(i), r = this._right(i);
      if (l < n && this.cmp(this.arr[l], this.arr[smallest]) < 0) smallest = l;
      if (r < n && this.cmp(this.arr[r], this.arr[smallest]) < 0) smallest = r;
      if (smallest !== i) {
        [this.arr[i], this.arr[smallest]] = [this.arr[smallest], this.arr[i]];
        i = smallest;
      } else break;
    }
  }
}
```

### LRU Cache
```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = { prev: null, next: null };
    this.tail = { prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }
  _removeTail() {
    const node = this.tail.prev;
    this._removeNode(node);
    return node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._moveToHead(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._moveToHead(node);
    } else {
      const node = { key, value, prev: null, next: null };
      this.map.set(key, node);
      this._addToHead(node);
      if (this.map.size > this.capacity) {
        const tail = this._removeTail();
        this.map.delete(tail.key);
      }
    }
  }
}
```

### K Smallest Pairs (Optional)
```javascript
function kSmallestPairs(A, B, K) {
  const res = [];
  if (!A.length || !B.length || K <= 0) return res;

  const heap = new MinHeap((x, y) => (x.sum - y.sum));
  const n1 = A.length, n2 = B.length;
  const limit = Math.min(K, n1);

  for (let i = 0; i < limit; i++) {
    heap.push({ sum: A[i] + B[0], i, j: 0 });
  }

  while (K-- > 0 && heap.size()) {
    const { i, j } = heap.pop();
    res.push([A[i], B[j]]);
    if (j + 1 < n2) {
      heap.push({ sum: A[i] + B[j + 1], i, j: j + 1 });
    }
  }
  return res;
}
```
