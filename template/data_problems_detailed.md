# 📘 25 Essential Data Processing Problems

Each problem includes:
- ✅ **Description**
- 💡 **Approach**
- 🧪 **Example**
- 💻 **Code with Comments**
- ⏱ **Time and Space Complexity**

---

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

// (remaining problems 5–25 will be appended below)
