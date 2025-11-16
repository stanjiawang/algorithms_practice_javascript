# Graph / Tree / DFS / BFS / Heap --- Full Cheat Sheet (Detailed)

## 1. Build Tree from Flat List

A flat list with id/parentId → convert to hierarchical tree.

``` js
const nodeMap = new Map();
flatList.forEach(n => nodeMap.set(n.id, {...n, children: []}));

let root = null;
flatList.forEach(n => {
  if (n.parentId === 0) root = nodeMap.get(n.id);
  else nodeMap.get(n.parentId)?.children.push(nodeMap.get(n.id));
});
```

## 2. Build Graph (Adjacency List)

### Continuous numeric IDs → array

``` js
const graph = Array.from({length: n}, () => []);
for (const [u, v] of edges) graph[u].push(v);
```

### Non-continuous IDs → Map

``` js
const graph = new Map();
for (const [u, v] of edges) {
  if (!graph.has(u)) graph.set(u, []);
  graph.get(u).push(v);
}
```

## 3. indegree

Used for topological sort. \### Array

``` js
const indegree = Array(n).fill(0);
for (const [u, v] of edges) indegree[v]++;
```

### Map

``` js
indegree.set(v, (indegree.get(v) || 0) + 1);
```

## 4. DFS Templates

### Tree DFS (no visited needed)

``` js
function dfsTree(node) {
  if (!node) return;
  console.log(node.val);
  node.children.forEach(dfsTree);
}
```

### Graph DFS (requires visited)

``` js
function dfs(node) {
  if (visited.has(node)) return;
  visited.add(node);
  for (const nei of graph[node]) dfs(nei);
}
```

## 5. BFS Templates

### Graph BFS

``` js
function bfs(start) {
  const queue = [start];
  visited.add(start);
  while (queue.length) {
    const node = queue.shift();
    for (const nei of graph[node]) {
      if (!visited.has(nei)) {
        visited.add(nei);
        queue.push(nei);
      }
    }
  }
}
```

## 6. Topological Sort (Kahn)

``` js
const queue = [];
for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);

const result = [];
while (queue.length) {
  const cur = queue.shift();
  result.push(cur);
  for (const nei of graph[cur]) {
    if (--indegree[nei] === 0) queue.push(nei);
  }
}
```

## 7. Cycle Detection (Directed)

``` js
const visited = new Set();
const onPath = new Set();

function hasCycle(node) {
  if (onPath.has(node)) return true;
  if (visited.has(node)) return false;

  visited.add(node);
  onPath.add(node);

  for (const nei of graph[node]) {
    if (hasCycle(nei)) return true;
  }

  onPath.delete(node);
  return false;
}
```

## 8. Connected Components

``` js
let count = 0;
for (let i = 0; i < n; i++) {
  if (!visited.has(i)) {
    dfs(i);
    count++;
  }
}
```

## 9. Clone Graph

Deep copy graph with Map (oldNode -\> newNode)

``` js
const map = new Map();
function clone(node) {
  if (map.has(node)) return map.get(node);
  const copy = { val: node.val, neighbors: [] };
  map.set(node, copy);
  node.neighbors.forEach(nei => copy.neighbors.push(clone(nei)));
  return copy;
}
```

## 10. Min-Heap (Minimal 20-line Implementation)

``` js
class MinHeap {
  constructor() { this.h = []; }
  size() { return this.h.length; }
  peek() { return this.h[0]; }
  push(x) {
    this.h.push(x);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }
  pop() {
    if (this.h.length === 1) return this.h.pop();
    const t = this.h[0];
    this.h[0] = this.h.pop();
    let i = 0, n = this.h.length;
    while (true) {
      let l = i*2+1, r = i*2+2, m = i;
      if (l < n && this.h[l] < this.h[m]) m = l;
      if (r < n && this.h[r] < this.h[m]) m = r;
      if (m === i) break;
      [this.h[i], this.h[m]] = [this.h[m], this.h[i]];
      i = m;
    }
    return t;
  }
}
```

---

## 🌳 Problem 1: Build a Tree from Flat List

**Description:**  
Given a list of nodes with `id` and `parentId`, build a tree structure with nested `children` arrays.

**Example:**
```js
Input:
[
  { id: 1, parentId: 0, name: "Root" },
  { id: 2, parentId: 1, name: "Child1" },
  { id: 3, parentId: 1, name: "Child2" }
]
Output:
[{
  id: 1, parentId: 0, name: "Root", children: [
    { id: 2, parentId: 1, name: "Child1", children: [] },
    { id: 3, parentId: 1, name: "Child2", children: [] }
  ]
}]
```

**Approach:** Use a map from `id → node`, initialize `children` arrays, then nest under parent.

**Code:**
```js
function buildTree(nodes) {
  const idMap = new Map();
  const roots = [];

  for (const node of nodes) {
    node.children = [];
    idMap.set(node.id, node);
  }

  for (const node of nodes) {
    if (node.parentId === 0) roots.push(node);
    else idMap.get(node.parentId)?.children.push(node);
  }

  return roots;
}
```

**Complexity:** O(n) time, O(n) space

---

## ✅ Problem 2: Find Path to Node

**Description:** Trace path from root to a target node.

**Example:**
```js
Input: targetId = 3
[ {id:1, parentId:0}, {id:2, parentId:1}, {id:3, parentId:2} ]
Output: [1, 2, 3]
```

**Approach:** Use a map and trace upward via `parentId`, reverse the result.

**Code:**
```js
function findPath(nodes, targetId) {
  const map = new Map(nodes.map(n => [n.id, n]));
  const path = [];
  while (targetId) {
    const node = map.get(targetId);
    if (!node) break;
    path.unshift(node.id);
    targetId = node.parentId;
  }
  return path;
}
```

**Complexity:** O(h) time, O(h) space

---

## 🧹 Problem 3: Delete Node and Descendants

**Description:** Remove a node and all its descendants.

**Example:**
```js
Input id: 2
[ {id:1, parentId:0}, {id:2, parentId:1}, {id:3, parentId:2} ]
Output: [ {id:1, parentId:0} ]
```

**Approach:** DFS to collect all IDs to delete, then filter them out.

**Code:**
```js
function deleteSubtree(nodes, id) {
  const childrenMap = new Map();
  for (const node of nodes) {
    if (!childrenMap.has(node.parentId)) childrenMap.set(node.parentId, []);
    childrenMap.get(node.parentId).push(node);
  }

  const toDelete = new Set();
  function dfs(id) {
    toDelete.add(id);
    for (const child of childrenMap.get(id) || []) dfs(child.id);
  }

  dfs(id);
  return nodes.filter(n => !toDelete.has(n.id));
}
```

**Complexity:** O(n) time and space

---

## 🔗 Problem 4: Topological Sort of Modules

**Description:** Return order to load modules with dependencies.

**Example:**
```js
Input: [["A", "B"], ["B", "C"]]
Output: ["C", "B", "A"]
```

**Approach:** Kahn’s algorithm with in-degree tracking.

**Code:**
```js
function topoSort(edges) {
  const graph = new Map(), indeg = new Map();
  for (let [a, b] of edges) {
    if (!graph.has(b)) graph.set(b, []);
    if (!graph.has(a)) graph.set(a, []);
    if (b) {
      graph.get(b).push(a);
      indeg.set(a, (indeg.get(a) || 0) + 1);
    }
  }
  const q = [...[...graph.keys()].filter(k => !indeg.get(k))];
  const res = [];
  while (q.length) {
    const node = q.shift();
    res.push(node);
    for (const nei of graph.get(node)) {
      indeg.set(nei, indeg.get(nei) - 1);
      if (indeg.get(nei) === 0) q.push(nei);
    }
  }
  return res.length === graph.size ? res : null;
}
```

**Complexity:** O(V + E)

---

## 🔁 Problem 5: Detect Cycle in Directed Graph

**Description:**  
Determine whether a directed graph has a cycle.

**Example:**
```js
Input: { A: ["B"], B: ["C"], C: ["A"] }
Output: true
```

**Approach:**  
Use DFS with recursion stack to detect cycles.

**Code:**
```js
function hasCycle(graph) {
  const visited = new Set(), recStack = new Set();

  function dfs(node) {
    if (recStack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    recStack.add(node);
    for (let neighbor of graph[node] || []) {
      if (dfs(neighbor)) return true;
    }
    recStack.delete(node);
    return false;
  }

  return Object.keys(graph).some(dfs);
}
```

**Complexity:** O(V + E)

---

// Problems 6–9 (islands, path finding, invert map, file tree) continue below.
# 📘 25 Essential Data Processing Problems (Fully Structured)

Each problem includes:
- ✅ **Description**
- 🧪 **Example**
- 💡 **Approach**
- 💻 **Code with Comments**
- ⏱ **Time and Space Complexity**

---

---

## 📦 Problem 10: Flatten a Nested JSON Object

**Description:**  
Convert a deeply nested JavaScript object into a flat object where the keys represent the path to each value, separated by dots.

**Example:**  
```js
Input:
{
  a: {
    b: {
      c: 1
    }
  },
  d: 2
}

Output:
{
  "a.b.c": 1,
  "d": 2
}
```

**Approach:**  
Use recursion to traverse each nested key. Maintain a running key path. When a non-object value is found, store it with the full dot-separated path.

**Code:**
```js
function flattenJSON(obj, prefix = "", result = {}) {
  for (const key in obj) {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenJSON(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}
```

**Complexity:**  
Time: O(n), where n is the total number of nested keys.  
Space: O(n), for the result object.

---

// Problems 11 to 25 will follow the same format — each with Description, Example, Approach, Code (with comments), and Complexity.

---

## 🔄 Problem 11: Unflatten a Flat JSON Object

**Description:**  
Convert a flat object with dot-separated keys into a nested JavaScript object.

**Example:**
```js
Input:
{
  "a.b.c": 1,
  "d": 2
}

Output:
{
  a: {
    b: {
      c: 1
    }
  },
  d: 2
}
```

**Approach:**  
Split each flat key on dots and progressively build the nested structure.

**Code:**
```js
function unflattenJSON(flatObj) {
  const result = {};
  for (const key in flatObj) {
    const parts = key.split(".");
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) current[part] = {};
      current = current[part];
    }
    current[parts.at(-1)] = flatObj[key];
  }
  return result;
}
```

**Complexity:**  
Time: O(k * d), where k = number of keys, d = depth  
Space: O(k)

---

## 🧬 Problem 12: Deep Clone an Object

**Description:**  
Create a deep copy of a JavaScript object that may contain nested structures.

**Example:**
```js
Input:
{ a: 1, b: { c: 2 } }
Output:
{ a: 1, b: { c: 2 } } // different reference
```

**Approach:**  
Use recursion to copy primitives and objects.

**Code:**
```js
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);

  const cloned = {};
  for (const key in obj) {
    cloned[key] = deepClone(obj[key]);
  }
  return cloned;
}
```

**Complexity:**  
Time: O(n)  
Space: O(n)

---

## 📊 Problem 13: Group by a Key

**Description:**  
Group an array of objects by a specified key into an object.

**Example:**
```js
Input:
[{ type: "fruit", item: "apple" }, { type: "fruit", item: "banana" }, { type: "drink", item: "soda" }]

Output:
{
  fruit: [{...}, {...}],
  drink: [{...}]
}
```

**Approach:**  
Use `.reduce()` to group items under their key.

**Code:**
```js
function groupBy(arr, key) {
  const result = {};

  for (const obj of arr) {
    const group = obj[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(obj);
  }

  return result;
}
```

**Complexity:**  
Time: O(n)  
Space: O(n)

---

## 🪟 Problem 14: Sliding Window Maximum

**Description:**  
Return the maximum of each sliding window of size `k` in an array.

**Example:**
```js
Input: [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
```

**Approach:**  
Use a double-ended queue to track max candidates in O(1).

**Code:**
```js
function maxSlidingWindow(nums, k) {
  const deque = [], result = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}
```

**Complexity:**  
Time: O(n)  
Space: O(k)

---

## 📄 Problem 15: Paginate an Array

**Description:**  
Split an array into pages of given size, and return the items on a specific page.

**Example:**
```js
Input: [1,2,3,4,5], size = 2, page = 2
Output: [3, 4]
```

**Approach:**  
Use `.slice()` based on calculated start and end indexes.

**Code:**
```js
function paginate(data, size, page) {
  const start = (page - 1) * size;
  return data.slice(start, start + size);
}
```

**Complexity:**  
Time: O(k)  
Space: O(k)

---

---

## 🔁 Problem 16: Merge Overlapping Intervals

**Description:**  
Given an array of intervals, merge overlapping ones into non-overlapping intervals.

**Example:**
```js
Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
```

**Approach:**  
Sort intervals by start time. Iterate and merge if overlap is found.

**Code:**
```js
function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}
```

**Complexity:**  
Time: O(n log n) (for sorting)  
Space: O(n)

---

## 🧹 Problem 17: Remove Duplicates from Array

**Description:**  
Remove duplicate values from an array.

**Example:**
```js
Input: [1, 2, 2, 3]
Output: [1, 2, 3]
```

**Approach:**  
Use a Set to ensure uniqueness.

**Code:**
```js
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
```

**Complexity:**  
Time: O(n)  
Space: O(n)

---

## 📌 Problem 18: Find Difference Between Arrays

**Description:**  
Return elements in array A not present in array B.

**Example:**
```js
A = [1, 2, 3, 4], B = [2, 4]
Output: [1, 3]
```

**Approach:**  
Convert B to a Set for O(1) lookups and filter A.

**Code:**
```js
function arrayDifference(a, b) {
  const setB = new Set(b);
  return a.filter(x => !setB.has(x));
}
```

**Complexity:**  
Time: O(n + m)  
Space: O(m)

---

## 🔢 Problem 19: Sort Array of Objects by Key

**Description:**  
Sort an array of objects based on a specific key.

**Example:**
```js
Input: [{age: 30}, {age: 20}]
Output: [{age: 20}, {age: 30}]
```

**Approach:**  
Use `Array.prototype.sort()` with a custom comparator.

**Code:**
```js
function sortByKey(arr, key) {
  return [...arr].sort((a, b) => a[key] - b[key]);
}
```

**Complexity:**  
Time: O(n log n)  
Space: O(n) (for shallow copy)

---

## 🧮 Problem 20: Aggregate by Group

**Description:**  
Group objects by a field and sum another field.

**Example:**
```js
Input: [{type: "a", val: 2}, {type: "a", val: 3}, {type: "b", val: 1}]
Output: { a: 5, b: 1 }
```

**Approach:**  
Reduce array into a map where values are summed.

**Code:**
```js
function sumByType(data) {
  const result = {};

  for (const item of data) {
    const type = item.type; // 分组字段固定
    const val = item.val;   // 累加字段固定

    if (!result[type]) {
      result[type] = 0;
    }

    result[type] += val;
  }

  return result;
}


```

**Complexity:**  
Time: O(n)  
Space: O(n)

---

## 🔧 Problem 21: Convert Pairs to Object

**Description:**  
Turn array of [key, value] pairs into an object.

**Example:**
```js
Input: [["a", 1], ["b", 2]]
Output: { a: 1, b: 2 }
```

**Approach:**  
Use `Object.fromEntries()`.

**Code:**
```js
const obj = Object.fromEntries([["a", 1], ["b", 2]]);
```

**Complexity:**  
Time: O(n)  
Space: O(n)

---

## 🧭 Problem 22: Remap Object Fields

**Description:**  
Transform nested object fields into new names via a mapping.

**Example:**
```js
Input: obj = { a: { b: 1 } }, map = { "a.b": "x" }
Output: { x: 1 }
```

**Approach:**  
Flatten, remap, and unflatten.

**Code:**
```js
function remapFields(obj, map) {
  const flat = flattenJSON(obj);
  const result = {};
  for (let key in flat) {
    const newKey = map[key] || key;
    result[newKey] = flat[key];
  }
  return unflattenJSON(result);
}
```

**Complexity:**  
Time: O(n)  
Space: O(n)

---

## 📅 Problem 23: Group by Date

**Description:**  
Group events by date (ignoring time).

**Example:**
```js
Input:
const events = [
  { id: 1, date: "2023-08-01T10:00", name: "Morning Meeting" },
  { id: 2, date: "2023-08-01T12:30", name: "Lunch with Bob" },
  { id: 3, date: "2023-08-02T09:00", name: "Daily Standup" },
  { id: 4, date: "2023-08-02T18:00", name: "Dinner" },
  { id: 5, date: "2023-08-03T07:30", name: "Gym" }
];
Output:
{
  "2023-08-01": [
    { id: 1, date: "2023-08-01T10:00", name: "Morning Meeting" },
    { id: 2, date: "2023-08-01T12:30", name: "Lunch with Bob" }
  ],
  "2023-08-02": [
    { id: 3, date: "2023-08-02T09:00", name: "Daily Standup" },
    { id: 4, date: "2023-08-02T18:00", name: "Dinner" }
  ],
  "2023-08-03": [
    { id: 5, date: "2023-08-03T07:30", name: "Gym" }
  ]
}
```

**Approach:**  
Use ISO string split and group with reduce.

**Code:**
```js
function groupByDate(items) {
  const result = {};

  for (const item of items) {
    // 1. "2023-08-01T10:00" → "2023-08-01"
    const dateOnly = item.date.split("T")[0];

    // 2. 如果这一天还没有数组，就先创建它
    if (!result[dateOnly]) {
      result[dateOnly] = [];
    }

    // 3. 把起当前 event 放进去
    result[dateOnly].push(item);
  }

  return result;
}
```

**Complexity:**  
Time: O(n)  
Space: O(n)

---

## 🔐 Problem 24: Flatten Role-Permission Tree

**Description:**  
Return a flat map of roles to all inherited permissions.

**Example:**  
```js
Input: Tree of roles, each with children and permissions.
Output: { admin: ["read", "write"], user: ["read"] }
```

**Approach:**  
DFS with inherited permission accumulation.

**Code:**
```js
function flattenPermissions(tree) {
  const res = {};
  function dfs(node, inherited = []) {
    const perms = [...new Set([...inherited, ...(node.permissions || [])])];
    res[node.name] = perms;
    for (const child of node.children || []) dfs(child, perms);
  }
  tree.forEach(r => dfs(r));
  return res;
}
```

**Complexity:**  
Time: O(n × p)  
Space: O(n × p)

---

## ✅ Problem 25: Validate Against Schema

**Description:**  
Validate object keys and types against a schema.

**Example:**  
```js
Input: { name: "John", age: "30" }, schema: { name: { type: "string" }, age: { type: "number" } }
Output: ["age must be number"]
```

**Approach:**  
Loop over schema and check required fields and types.

**Code:**
```js
function validate(obj, schema) {
  const errors = [];
  for (let key in schema) {
    const rule = schema[key];
    const val = obj[key];
    if (rule.required && val == null) {
      errors.push(\`\${key} is required\`);
    } else if (val != null && typeof val !== rule.type) {
      errors.push(\`\${key} must be \${rule.type}\`);
    }
  }
  return errors;
}
```

**Complexity:**  
Time: O(n)  
Space: O(n)

---


**Topo Sort Code:**
```js
/**
 * @param {string[]} tasks       // 所有任务
 * @param {Array<[string, string]>} dependencies // [a, b] 表示 a → b （b depends on a）
 * @return {string[]}            // 返回一个合法的拓扑序；如有环返回 []
 */
function topoSort(tasks, dependencies) {
  // -----------------------------
  // 1. 初始化 adjacency list & indegree
  // -----------------------------
  const graph = new Map();     // a → [b1, b2 ...]
  const indegree = new Map();  // 每个节点的入度数量

  for (const t of tasks) {
    graph.set(t, []);
    indegree.set(t, 0);
  }

  // -----------------------------
  // 2. 构建图 & 入度表
  // -----------------------------
  for (const [a, b] of dependencies) {
    graph.get(a).push(b);                     // a → b
    indegree.set(b, indegree.get(b) + 1);     // b 的前置任务 +1
  }

  // -----------------------------
  // 3. 将所有 indegree === 0 的任务入队（多个 root 支持）
  // -----------------------------
  const queue = [];
  for (const [task, deg] of indegree) {
    if (deg === 0) queue.push(task);
  }

  // -----------------------------
  // 4. BFS 拓扑排序
  // -----------------------------
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    // 将 node 指向的所有节点入度减 1
    for (const next of graph.get(node)) {
      indegree.set(next, indegree.get(next) - 1);

      // 若入度变成 0，则可以执行，入队
      if (indegree.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  // -----------------------------
  // 5. 如果结果数量不等于任务数量 → 有环
  // -----------------------------
  if (result.length !== tasks.length) {
    return [];  // cycle detected
  }

  return result;
}
```

**Topo Sort From Dependencies Code:**
```js
function topoSortFromDependencies(dependencies) {
  // -----------------------------
  // 1. 自动生成 tasks（所有出现过的节点）
  // -----------------------------
  const tasks = new Set();
  for (const [a, b] of dependencies) {
    tasks.add(a);
    tasks.add(b);
  }

  // -----------------------------
  // 2. 初始化 adjacency list & indegree
  // -----------------------------
  const graph = new Map();
  const indegree = new Map();

  for (const t of tasks) {
    graph.set(t, []);
    indegree.set(t, 0);
  }

  // -----------------------------
  // 3. 构建图 & 入度表
  // -----------------------------
  for (const [a, b] of dependencies) {
    graph.get(a).push(b);
    indegree.set(b, indegree.get(b) + 1);
  }

  // -----------------------------
  // 4. queue 初始化为所有入度为 0 的节点（多 root）
  // -----------------------------
  const queue = [];
  for (const [task, deg] of indegree) {
    if (deg === 0) queue.push(task);
  }

  // -----------------------------
  // 5. 拓扑排序 BFS
  // -----------------------------
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const next of graph.get(node)) {
      indegree.set(next, indegree.get(next) - 1);

      if (indegree.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  // -----------------------------
  // 6. 环检测（没有排完所有任务）
  // -----------------------------
  if (result.length !== tasks.size) {
    return []; // cycle detected
  }

  return result;
}

```

**Topo Sort From List Code:**
```js

function topoSortFromList(dependencies) {
  // -----------------------------
  // 1. 自动提取所有任务
  // -----------------------------
  const tasks = new Set();

  for (const arr of dependencies) {
    const [key, ...rest] = arr;
    tasks.add(key);
    for (const r of rest) tasks.add(r);
  }

  // -----------------------------
  // 2. 建 adjacency list & indegree
  // -----------------------------
  const graph = new Map();
  const indegree = new Map();

  for (const t of tasks) {
    graph.set(t, []);
    indegree.set(t, 0);
  }

  // -----------------------------
  // 3. 填充 graph & indegree
  // -----------------------------
  for (const arr of dependencies) {
    const [key, ...rest] = arr;

    for (const child of rest) {
      graph.get(key).push(child);
      indegree.set(child, indegree.get(child) + 1);
    }
  }

  // -----------------------------
  // 4. 初始 queue（所有入度为 0 的 root）
  // -----------------------------
  const queue = [];
  for (const [task, deg] of indegree) {
    if (deg === 0) queue.push(task);
  }

  // -----------------------------
  // 5. BFS 拓扑排序
  // -----------------------------
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const child of graph.get(node)) {
      indegree.set(child, indegree.get(child) - 1);

      if (indegree.get(child) === 0) {
        queue.push(child);
      }
    }
  }

  // -----------------------------
  // 6. Cycle detection
  // -----------------------------
  if (result.length !== tasks.size) {
    return []; // cycle exists
  }

  return result;
}


```

**DFS Search Code:**
```js
function dfsSearch(graph, source) {
  const result = [];
  const visited = new Set();

  if (!graph || !graph[source]) return [];

  function dfs(node) {
    if (visited.has(node)) return;

    visited.add(node);
    result.push(node);

    for (const child of graph[node] || []) {
      dfs(child);
    }
  }

  dfs(source);

  return result;
}

```

**Flat List BFS Code:**
```js
function flatListBFS(flatList) {
    const nodeMap = new Map();

    // Create nodes
    for (const item of flatList) {
        nodeMap.set(item.id, { ...item, children: [] });
    }

    let root = null;

    // Build tree
    for (const item of flatList) {
        const node = nodeMap.get(item.id);

        if (item.parentId === 0) {
            root = node;
        } else {
            const parent = nodeMap.get(item.parentId);
            if (parent) {
                parent.children.push(node);
            }
        }
    }

    // BFS
    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const len = queue.length;
        const level = [];

        for (let i = 0; i < len; i++) {
            const node = queue.shift();
            level.push(node.id);

            for (const child of node.children) {
                queue.push(child);
            }
        }

        result.push(level);
    }

    return result;
}


```

**Flat List DFS Code:**
```js
function flatListDFS(flatList) {
    const nodeMap = new Map();

    // Step 1: 初始化节点
    for (const item of flatList) {
        nodeMap.set(item.id, { ...item, children: [] });
    }

    let root = null;

    // Step 2: 建立 parent-child 关系
    for (const item of flatList) {
        const node = nodeMap.get(item.id);

        if (item.parentId === 0) {
            root = node;
        } else {
            const parent = nodeMap.get(item.parentId);
            if (parent) parent.children.push(node);
        }
    }

    // Step 3: DFS 前序遍历
    const result = [];

    function dfs(node) {
        if (!node) return;

        // 访问自己
        result.push(node.id);

        // 遍历 children
        for (const child of node.children) {
            dfs(child);
        }
    }

    dfs(root);
    return result;
}

```

**Tree Max Depth:**
```js
function maxDepth(root) {
    if (!root) return 0;

    if (root.children.length === 0) {
        return 1;
    }

    let max = 0;

    for (const child of root.children) {
        max = Math.max(max, maxDepth(child));
    }

    return max + 1;
}
```

**Graph BFS:**
```js
graphBFS(num, edges, start) {
    // Step 1: adjacency list
    const graph = Array.from({ length: num }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u); // 无向图双向加边
    }

    // Step 2: BFS
    const result = [];
    const queue = [start];
    const visited = new Set([start]);

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
}

```

**Has Cycle Directed:**
```js
function hasCycleDirected(num, edges) {
    // 构建 adjacency list
    const graph = Array.from({ length: num }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v); // 有向图
    }

    const visited = new Array(num).fill(false);
    const onPath = new Array(num).fill(false); // recursion stack

    function dfs(node) {
        if (onPath[node]) return true;  // ❗ found a cycle
        if (visited[node]) return false;

        visited[node] = true;
        onPath[node] = true;

        for (const nei of graph[node]) {
            if (dfs(nei)) return true;
        }

        onPath[node] = false; // 退出 recursion stack
        return false;
    }

    // 图可能不连通，因此对每个节点尝试 DFS
    for (let i = 0; i < num; i++) {
        if (!visited[i] && dfs(i)) return true;
    }

    return false;
}

```

**Has Cycle Directed BFS:**
```js
function hasCycleDirectedKahn(num, edges) {
    const graph = Array.from({ length: num }, () => []);
    const inDegree = Array(num).fill(0);

    for (const [u, v] of edges) {
        graph[u].push(v);
        inDegree[v]++;
    }

    const queue = [];
    for (let i = 0; i < num; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let count = 0;

    while (queue.length > 0) {
        const node = queue.shift();
        count++;

        for (const nei of graph[node]) {
            inDegree[nei]--;
            if (inDegree[nei] === 0) queue.push(nei);
        }
    }

    return count !== num; // count < num 表示有环
}
```

**Connected Components:**
```js
function countComponents(n, edges) {
  const graph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Set();
  let count = 0;

  function dfs(node) {
    visited.add(node);
    for (const nei of graph[node]) {
      if (!visited.has(nei)) {
        dfs(nei);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i);
      count++;  // new connected component
    }
  }

  return count;
}

```

**MinHeap:**
```js
class MinHeap {
  constructor() { this.h = []; }

  size() { return this.h.length; }
  peek() { return this.h[0]; }

  push(x) {
    this.h.push(x);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }

  pop() {
    if (this.h.length === 1) return this.h.pop();
    const top = this.h[0];
    this.h[0] = this.h.pop();
    let i = 0, n = this.h.length;
    while (true) {
      let l = i * 2 + 1, r = i * 2 + 2, m = i;
      if (l < n && this.h[l] < this.h[m]) m = l;
      if (r < n && this.h[r] < this.h[m]) m = r;
      if (m === i) break;
      [this.h[i], this.h[m]] = [this.h[m], this.h[i]];
      i = m;
    }
    return top;
  }
}

```

**MaxHeap:**
```js
class MaxHeap {
  constructor() { this.h = []; }

  size() { return this.h.length; }
  peek() { return this.h[0]; }

  push(x) {
    this.h.push(x);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] >= this.h[i]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }

  pop() {
    if (this.h.length === 1) return this.h.pop();
    const top = this.h[0];
    this.h[0] = this.h.pop();
    let i = 0, n = this.h.length;
    while (true) {
      let l = i * 2 + 1, r = i * 2 + 2, m = i;
      if (l < n && this.h[l] > this.h[m]) m = l;
      if (r < n && this.h[r] > this.h[m]) m = r;
      if (m === i) break;
      [this.h[i], this.h[m]] = [this.h[m], this.h[i]];
      i = m;
    }
    return top;
  }
}
```

**DFS:**
```js
function dfs(node) {
  if (!node) return;

  // 前序
  console.log(node.val);

  for (const child of node.children) {
    dfs(child);
  }

  // 后序
}
```

**BFS:**
```js
function bfs(root) {
  if (!root) return;

  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node.val);

    for (const child of node.children) {
      queue.push(child);
    }
  }
}
