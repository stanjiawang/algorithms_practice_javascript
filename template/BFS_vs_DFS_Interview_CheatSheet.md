# BFS vs DFS — Interview Decision Cheat Sheet

> Quick, practical guide to decide between BFS (Breadth‑First Search) and DFS (Depth‑First Search) during coding interviews. Includes decision flow, complexities, templates, edge cases, and talk tracks.

---

## 1) One‑Screen Decision Flow (Text Diagram)

```
Start
 ├─ Is the problem asking for "shortest steps / minimum edges / fewest moves" in an unweighted graph or grid?
 │     └─ Yes → Use BFS (level-by-level guarantees shortest path length).
 │
 ├─ Do you need "level order" or "per level aggregation" (e.g., binary tree level sum, zigzag order)?
 │     └─ Yes → Use BFS (natural layering).
 │
 ├─ Is the search space huge/deep and you only need to check existence or compute a global property (e.g., max depth, path sum)?
 │     └─ Yes → Prefer DFS (recursive is simplest for trees).
 │
 ├─ Do you need to enumerate or backtrack over all possibilities (e.g., permutations, subset sums, path enumeration)?
 │     └─ Yes → DFS/Backtracking (stack/recursion with state push/pop).
 │
 ├─ Is there a memory constraint and the frontier might explode (wide tree/graph)?
 │     └─ Yes → DFS (stack depth ≤ height) often uses less memory than BFS (frontier could be O(width)).
 │
 ├─ Are edges weighted uniformly = 1?
 │     └─ Yes → BFS for shortest path length.
 │        No → Dijkstra (non-negative), 0-1 BFS, or other shortest-path algos.
 │
 └─ Otherwise
       → Both work; choose the one that yields the simplest invariant and code.
```

> **Rule of thumb**: “层次/最短路 → BFS；深度/回溯/全部路径/结构性质 → DFS”。

---

## 2) Time & Space Complexity (Trees vs Graphs)

| Traversal | Time (Graph) | Time (Tree) | Space (Typical) | Notes |
|---|---|---|---|---|
| **BFS** | O(V + E) | O(N) | O(W) where W = max frontier width | Great for shortest path in unweighted graphs; natural level info |
| **DFS (recursive)** | O(V + E) | O(N) | O(H) where H = height | Cleanest for tree structure tasks (depth, path sums, properties) |
| **DFS (stack)** | O(V + E) | O(N) | O(H) | Use when recursion depth might overflow or on graphs where you manage your own stack |

> For trees: \(E = N-1\) so both are **O(N)** time.  
> Space: BFS worst-case is breadth-heavy (can be ~N/2 on complete binary trees). DFS worst-case height is N (degenerate chain).

---

## 3) Canonical Templates (JavaScript)

### 3.1 BFS (Queue)

```js
function bfs(start, getNeighbors) {
  const queue = [start];
  const visited = new Set([start]); // optional for trees; required for graphs

  while (queue.length > 0) {
    const size = queue.length; // use this if you need level boundaries
    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      // —— Process node here ——
      // e.g., if (isTarget(node)) return distance/steps;

      for (const nei of getNeighbors(node)) {
        if (!visited.has(nei)) {
          visited.add(nei);
          queue.push(nei);
        }
      }
    }
  }
  // return something aggregative if needed
}
```

**Binary Tree Level Order (depth counting)**
```js
function maxDepthBFS(root) {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return depth;
}
```

### 3.2 DFS (Recursive)

```js
function dfsRecursive(node, visit) {
  if (!node) return;
  visit(node);
  dfsRecursive(node.left, visit);
  dfsRecursive(node.right, visit);
}
```

**Binary Tree Max Depth (最推荐的面试写法)**

```js
function maxDepthDFS(root) {
  if (!root) return 0;
  return Math.max(maxDepthDFS(root.left), maxDepthDFS(root.right)) + 1;
}
```

### 3.3 DFS (Explicit Stack)

```js
function dfsWithStack(root) {
  if (!root) return;
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();

    // —— Process node here ——
    // console.log(node.val);

    // push right first so left is processed first (LIFO)
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
}
```

---

## 4) Side‑by‑Side: Looks Similar, Works Differently

```js
// BFS: FIFO queue → level by level
const queue = [root];
while (queue.length) {
  const node = queue.shift();    // oldest first
  // process...
  if (node.left) queue.push(node.left);
  if (node.right) queue.push(node.right);
}

// DFS: LIFO stack → go deep
const stack = [root];
while (stack.length) {
  const node = stack.pop();      // newest first
  // process...
  if (node.right) stack.push(node.right); // push right first
  if (node.left) stack.push(node.left);
}
```

**Key Difference**:  
- Queue (`shift`) → **FIFO** → breadth first  
- Stack (`pop`) → **LIFO** → depth first

---

## 5) When Each Shines (with Examples)

| Pattern / Problem Type | Pick | Why |
|---|---|---|
| Shortest path in unweighted grid/graph (e.g., 01 matrix steps, knight moves) | **BFS** | First time you reach a node is the shortest number of moves |
| Level order stats (per layer sums, averages, zigzag) | **BFS** | Naturally grouped by levels |
| Max depth / min depth of tree | **DFS** for max, **BFS** for min | Max depth：递归 DFS 极简； Min depth：BFS遇到第一个叶子即可返回 |
| Path enumeration / backtracking (Subsets, Permutations, N‑Queens) | **DFS** | Need to go deep, push/pop state |
| Detect cycle / connected components in graph | **Both** | Often DFS (clean) or BFS (queue) with visited |
| Memory‑tight when tree is very wide | **DFS** | BFS frontier can explode |
| Very deep paths with stack overflow risk | **DFS with explicit stack** | Avoid recursion depth limit |

---

## 6) “Interview Talk Track” — 15‑second Answers

- **Why BFS here?**  
  “The problem asks for the minimum steps in an unweighted grid; BFS explores by distance (levels), so the first time I pop the target I have the shortest path length.”

- **Why DFS here?**  
  “We need a structural property (max depth / all root‑to‑leaf paths). DFS recursion mirrors the tree definition and keeps code minimal and clear.”

- **Can DFS be iterative?**  
  “Yes, DFS can use an explicit stack to simulate recursion. I’ll do that if recursion depth might overflow or if we’re on a graph with custom state.”

- **Can BFS be recursive?**  
  “It can be emulated by recursing per level with a next‑queue, but it’s not natural or efficient. Queue‑based iterative BFS is the idiomatic approach.”

---

## 7) Common Pitfalls & Fixes

1. **Forgetting `visited` on graphs** → infinite loops.  
   *Fix*: `visited.add()` when enqueueing (BFS) or pushing (DFS).

2. **Wrong neighbor order in DFS stack** → unexpected traversal order.  
   *Fix*: Push **right first** so left is processed first (preorder feel).

3. **Mixing level count with per-node distance** in BFS.  
   *Fix*: Either carry `(node, dist)` tuples _or_ use level‑size outer loop; don’t mix both.

4. **Recursion without base case** → stack overflow / wrong return.  
   *Fix*: Always guard `if (!node) return ...` in trees.

5. **BFS on weighted graphs** (uniformly 1? If not…)  
   *Fix*: Use Dijkstra / 0‑1 BFS / SPFA as appropriate.

---

## 8) Quick Reference: Grid BFS Template (4‑dir)

```js
function shortestPathGrid(matrix, sr, sc, tr, tc) {
  const m = matrix.length, n = matrix[0].length;
  const inb = (r, c) => r >= 0 && r < m && c >= 0 && c < n;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

  const q = [[sr, sc, 0]]; // row, col, dist
  const seen = new Set([`${sr},${sc}`]);

  while (q.length) {
    const [r, c, d] = q.shift();
    if (r === tr && c === tc) return d;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      const key = `${nr},${nc}`;
      if (inb(nr, nc) && matrix[nr][nc] !== 1 && !seen.has(key)) {
        seen.add(key);
        q.push([nr, nc, d + 1]);
      }
    }
  }
  return -1; // unreachable
}
```

---

## 9) Quick Reference: Backtracking/DFS Pattern

```js
function backtrack(nums) {
  const path = [];
  const ans = [];

  function dfs(start) {
    // —— process current path ——
    ans.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);   // choose
      dfs(i + 1);           // explore
      path.pop();           // un-choose
    }
  }

  dfs(0);
  return ans;
}
```

---

## 10) TL;DR

- **层次/最短路 → BFS**；**结构/回溯/全部路径 → DFS**  
- Both are **O(V + E)**; space differs: **BFS = frontier width**, **DFS = height/depth**  
- Pick the one that makes invariants and correctness proof **trivial** in an interview.
