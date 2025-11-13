# 🧠 Advanced Data Processing Problems (Tree, Graph, Mapping, Matrix)

This document contains 10 categorized problems that reflect real-world data processing needs commonly seen in frontend and fullstack interviews. Each includes:
- English problem statement
- Step-by-step solution approach
- Full code with detailed comments
- Time and space complexity analysis

---

## 🌳 Problem 1: Build a Nested Tree from Flat List

**Problem:**  
Given an array of nodes with `id`, `parentId`, and `name`, build a nested tree using `children` arrays.

**Approach:**  
- Use a map to link each id to its node.
- Iterate through nodes and attach them to their parent's `children`.
- Identify nodes with `parentId === 0` as roots.

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
    if (node.parentId === 0) {
      roots.push(node);
    } else {
      const parent = idMap.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  return roots;
}
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)  

---

## 🌲 Problem 2: Find Path from Root to Node

**Problem:**  
Given a flat list of nodes, find the path from root to a node by its id.

**Approach:**  
- Build a `Map<id, node>`.
- Starting from the target, follow `parentId` back to root.

**Code:**

```js
function findPathToNode(nodes, targetId) {
  const idMap = new Map(nodes.map(n => [n.id, n]));
  const path = [];

  let current = idMap.get(targetId);
  while (current) {
    path.unshift(current.name);
    current = idMap.get(current.parentId);
  }

  return path;
}
```

**Complexity:**  
- Time: O(h), where h is height of the tree  
- Space: O(h)  

---

## 🌳 Problem 3: Delete Node and Descendants

**Problem:**  
Delete a node and all its descendants from a flat list.

**Approach:**  
- Build a tree as in Problem 1.
- Use DFS to collect all descendant ids.
- Filter out nodes with those ids.

**Code:**

```js
function deleteNodeAndDescendants(nodes, targetId) {
  const idMap = new Map();
  const childrenMap = new Map();

  for (const node of nodes) {
    idMap.set(node.id, node);
    if (!childrenMap.has(node.parentId)) {
      childrenMap.set(node.parentId, []);
    }
    childrenMap.get(node.parentId).push(node);
  }

  const toDelete = new Set();
  function collectIds(id) {
    toDelete.add(id);
    const children = childrenMap.get(id) || [];
    for (const child of children) {
      collectIds(child.id);
    }
  }

  collectIds(targetId);
  return nodes.filter(n => !toDelete.has(n.id));
}
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)

---

## 🔗 Problem 4: Topological Sort of Modules

**Problem:**  
Given module dependencies, return a valid load order.

**Approach:**  
- Build a graph using adjacency list.
- Use Kahn’s algorithm for topological sort.

**Code:**

```js
function topologicalSort(pairs) {
  const graph = new Map();
  const indegree = new Map();

  for (const [mod, dep] of pairs) {
    if (!graph.has(mod)) graph.set(mod, []);
    if (dep) {
      graph.get(dep)?.push(mod);
      indegree.set(mod, (indegree.get(mod) || 0) + 1);
    } else {
      indegree.set(mod, indegree.get(mod) || 0);
    }
  }

  const queue = [];
  for (const [node, deg] of indegree.entries()) {
    if (deg === 0) queue.push(node);
  }

  const result = [];
  while (queue.length) {
    const curr = queue.shift();
    result.push(curr);
    for (const neighbor of graph.get(curr) || []) {
      indegree.set(neighbor, indegree.get(neighbor) - 1);
      if (indegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  return result.length === indegree.size ? result : null; // detect cycle
}
```

**Complexity:**  
- Time: O(V + E)  
- Space: O(V + E)

---

## 🔁 Problem 5: Detect Cycles in Dependency Graph

**Problem:**  
Detect if a graph has cycles.

**Approach:**  
- Use DFS and track visited + recursion stack.

**Code:**

```js
function hasCycle(graph) {
  const visited = new Set();
  const recStack = new Set();

  function dfs(node) {
    if (recStack.has(node)) return true;
    if (visited.has(node)) return false;
    visited.add(node);
    recStack.add(node);

    for (const neighbor of graph[node] || []) {
      if (dfs(neighbor)) return true;
    }
    recStack.delete(node);
    return false;
  }

  for (const node in graph) {
    if (dfs(node)) return true;
  }
  return false;
}
```

**Complexity:**  
- Time: O(V + E)  
- Space: O(V)

---

## 🧭 Problem 6: Count Number of Islands

**Problem:**  
Given 2D grid of '1' (land) and '0' (water), count the number of islands.

**Approach:**  
- Use DFS/BFS from each unvisited '1'.

**Code:**

```js
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}
```

**Complexity:**  
- Time: O(m × n)  
- Space: O(m × n)

---

## 🚶 Problem 7: Shortest Path in Maze (BFS)

**Problem:**  
Find shortest path from (0,0) to (m,n) in 2D grid with 0=walkable, 1=wall.

**Approach:**  
- Classic BFS with visited tracking.

**Code:**

```js
function shortestPath(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [[0, 0, 0]];
  const visited = new Set(["0,0"]);

  const directions = [[1,0],[0,1],[-1,0],[0,-1]];

  while (queue.length) {
    const [r, c, steps] = queue.shift();
    if (r === rows - 1 && c === cols - 1) return steps;

    for (const [dr, dc] of directions) {
      const nr = r + dr, nc = c + dc;
      const key = `${nr},${nc}`;
      if (
        nr >= 0 && nc >= 0 && nr < rows && nc < cols &&
        grid[nr][nc] === 0 && !visited.has(key)
      ) {
        visited.add(key);
        queue.push([nr, nc, steps + 1]);
      }
    }
  }

  return -1;
}
```

**Complexity:**  
- Time: O(m × n)  
- Space: O(m × n)

---

## 🔄 Problem 8: Invert Mapping

**Problem:**  
Given: `{ user: [tags] }`, return `{ tag: [users] }`.

**Approach:**  
- Iterate all user→tags and reverse insert into new map.

**Code:**

```js
function invertMap(input) {
  const result = {};
  for (const [user, tags] of Object.entries(input)) {
    for (const tag of tags) {
      if (!result[tag]) result[tag] = [];
      result[tag].push(user);
    }
  }
  return result;
}
```

**Complexity:**  
- Time: O(n × m)  
- Space: O(n × m)

---

## 📁 Problem 9: Build Indented Path Tree

**Problem:**  
Given list of file paths like `["a/b/c", "a/d", "x/y"]`, print indented directory tree.

**Approach:**  
- Build trie-like object tree.
- Recursively print tree with indentation.

**Code:**

```js
function buildPathTree(paths) {
  const root = {};

  for (const path of paths) {
    const parts = path.split('/');
    let node = root;
    for (const part of parts) {
      if (!node[part]) node[part] = {};
      node = node[part];
    }
  }

  function print(node, depth = 0) {
    for (const key in node) {
      console.log(' '.repeat(depth * 2) + key);
      print(node[key], depth + 1);
    }
  }

  print(root);
}
```

**Complexity:**  
- Time: O(n × m), n = number of paths, m = path depth  
- Space: O(n × m)


---

# 🧩 Extended Data Processing Challenges

## 🧵 Problem 10: Flatten a Nested JSON Object

**Problem:**  
Given a deeply nested JSON object, flatten it to a single-level object where keys represent the path.

**Example:**  
```js
Input:
{ a: { b: { c: 1 } }, d: 2 }

Output:
{ "a.b.c": 1, "d": 2 }
```

**Approach:**  
- Use recursion with a prefix to track current key path.

**Code:**

```js
function flattenJSON(obj, prefix = "", result = {}) {
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenJSON(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
```

**Complexity:**  
- Time: O(n) where n is total number of keys  
- Space: O(n)

---

## 🧵 Problem 11: Unflatten a Flat JSON Object

**Problem:**  
Given a flattened object with dot-path keys, rebuild the nested JSON structure.

**Code:**

```js
function unflattenJSON(flat) {
  const result = {};
  for (const path in flat) {
    const keys = path.split(".");
    let curr = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!curr[k]) curr[k] = {};
      curr = curr[k];
    }
    curr[keys[keys.length - 1]] = flat[path];
  }
  return result;
}
```

**Complexity:**  
- Time: O(n * k) where k = avg path depth  
- Space: O(n)

---

## 🔁 Problem 12: Deep Clone Complex Object

**Problem:**  
Clone an object with nested objects and arrays without shared references.

**Approach:**  
- Use recursion and detect arrays vs objects

**Code:**

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);

  const copy = {};
  for (const key in obj) {
    copy[key] = deepClone(obj[key]);
  }
  return copy;
}
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)

---

## 📊 Problem 13: Group Data by Key

**Problem:**  
Given an array of objects, group them by a specified key.

**Example:**  
```js
Input: [ {type:'A'}, {type:'B'}, {type:'A'} ]
Output: { A: [{...}, {...}], B: [{...}] }
```

**Code:**

```js
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)

---

## 🪟 Problem 14: Sliding Window Max (Array)

**Problem:**  
Given an array and a window size `k`, return max in every sliding window.

**Approach:**  
- Use deque to store index of max candidates

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
- Time: O(n)  
- Space: O(k)


---

# 📚 More Practical Data Manipulation Problems

## 📖 Problem 15: Paginate a Dataset

**Problem:**  
Given an array of data and a page size + page number, return that page.

**Approach:**  
- Use slice based on offset = (page - 1) * size

**Code:**

```js
function paginate(data, pageSize, pageNumber) {
  const start = (pageNumber - 1) * pageSize;
  return data.slice(start, start + pageSize);
}
```

**Complexity:**  
- Time: O(k) where k = pageSize  
- Space: O(k)

---

## 📏 Problem 16: Merge Overlapping Intervals

**Problem:**  
Given an array of intervals `[start, end]`, merge all overlapping ones.

**Approach:**  
- Sort by start
- Iterate and merge if current overlaps with last

**Code:**

```js
function mergeIntervals(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }
  return result;
}
```

**Complexity:**  
- Time: O(n log n) (due to sort)  
- Space: O(n)

---

## 🧹 Problem 17: Remove Duplicates from Array

**Problem:**  
Given an array, return a new array with duplicates removed.

**Approach:**  
- Use a Set to track seen elements.

**Code:**

```js
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)

---

## 🔍 Problem 18: Compute Array Differences

**Problem:**  
Given two arrays A and B, return elements in A not in B.

**Approach:**  
- Convert B to Set, filter A.

**Code:**

```js
function difference(A, B) {
  const setB = new Set(B);
  return A.filter(x => !setB.has(x));
}
```

**Complexity:**  
- Time: O(n + m)  
- Space: O(m)


---

# 🧮 Final Expansion: Sorting, Aggregation, and Nested Data Transformations

## 🔢 Problem 19: Sort Array of Objects by Key

**Problem:**  
Sort an array of objects by a given key (string, number, or date).

**Approach:**  
- Use array `.sort()` with comparator function.

**Code:**

```js
function sortByKey(arr, key) {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}
```

**Complexity:**  
- Time: O(n log n)  
- Space: O(n) (if copying array)

---

## 📊 Problem 20: Aggregate by Group Key (Sum, Count)

**Problem:**  
Given array of objects, group by key and sum/count a value field.

**Approach:**  
- Iterate and build aggregation hash map.

**Code:**

```js
function aggregateByKey(data, groupKey, valueKey) {
  const result = {};
  for (const item of data) {
    const key = item[groupKey];
    if (!result[key]) result[key] = { sum: 0, count: 0 };
    result[key].sum += item[valueKey];
    result[key].count += 1;
  }
  return result;
}
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)

---

## 🔄 Problem 21: Convert Array of Key-Value Pairs to Object

**Problem:**  
Given `[[key1, val1], [key2, val2]]` format, return standard object.

**Approach:**  
- Use `Object.fromEntries()` or reduce.

**Code:**

```js
function pairsToObject(pairs) {
  return Object.fromEntries(pairs);
}
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)

---

## 🧱 Problem 22: Transform Nested JSON (Field Rename + Flatten)

**Problem:**  
Transform a deeply nested JSON structure by:
- Renaming fields (`firstName` → `name.first`)
- Flattening nested data selectively

**Approach:**  
- Recursive walker function with mapping rules.

**Code:**

```js
function transformObject(obj, mapping, prefix = "", result = {}) {
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const mappedKey = mapping[fullKey] || fullKey;
    const val = obj[key];

    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      transformObject(val, mapping, fullKey, result);
    } else {
      result[mappedKey] = val;
    }
  }
  return result;
}
```

**Example Mapping:**  
```js
const map = {
  "user.firstName": "name.first",
  "user.lastName": "name.last",
  "meta.age": "age"
};
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)


---

# 🧠 Advanced Scenarios: Time Bucketing, Hierarchical Access, and Validation

## 🕒 Problem 23: Group Records by Date Buckets (Daily)

**Problem:**  
Given a list of records with timestamps, group them by day.

**Approach:**  
- Parse date from timestamp and group by date string (e.g., 'YYYY-MM-DD').

**Code:**

```js
function groupByDay(data, dateKey) {
  const result = {};
  for (const item of data) {
    const day = new Date(item[dateKey]).toISOString().slice(0, 10);
    if (!result[day]) result[day] = [];
    result[day].push(item);
  }
  return result;
}
```

**Complexity:**  
- Time: O(n)  
- Space: O(n)

---

## 🔐 Problem 24: Flatten Permission Tree with Inheritance

**Problem:**  
Given a tree of roles with inherited permissions, output each role's full permission list.

**Approach:**  
- Use DFS with inherited propagation.

**Code:**

```js
function flattenPermissions(roles) {
  const result = {};

  function dfs(node, inherited = []) {
    const full = [...new Set([...inherited, ...(node.permissions || [])])];
    result[node.name] = full;
    for (const child of node.children || []) {
      dfs(child, full);
    }
  }

  for (const root of roles) dfs(root);
  return result;
}
```

**Example Input:**

```js
[{
  name: "admin",
  permissions: ["read", "write"],
  children: [
    { name: "editor", permissions: ["edit"], children: [] },
    { name: "viewer", permissions: ["view"], children: [] }
  ]
}]
```

**Complexity:**  
- Time: O(n × p), p = avg permission count  
- Space: O(n × p)

---

## ✅ Problem 25: Schema-Based Object Validation

**Problem:**  
Validate a JS object based on a schema definition (required keys, types).

**Approach:**  
- Iterate schema rules and match against input object.

**Code:**

```js
function validate(obj, schema) {
  const errors = [];
  for (const key in schema) {
    const rule = schema[key];
    const value = obj[key];

    if (rule.required && value == null) {
      errors.push(`${key} is required`);
    } else if (value != null && typeof value !== rule.type) {
      errors.push(`${key} must be a ${rule.type}`);
    }
  }
  return errors;
}
```

**Example Schema:**

```js
const schema = {
  name: { required: true, type: "string" },
  age: { required: false, type: "number" }
};
```

**Complexity:**  
- Time: O(k) for k fields  
- Space: O(k)
