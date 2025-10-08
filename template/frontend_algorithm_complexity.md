# Frontend Algorithm Complexity Cheat Sheet (JavaScript)

> A comprehensive, interview-ready reference for algorithmic complexity, data structure operations, and design trade-offs in frontend engineering (JS/TS).

---

## Table of Contents
1. [Core Big-O Refresher](#core-big-o-refresher)
2. [Rules of Thumb](#rules-of-thumb)
3. [Data Structure Complexity](#data-structure-complexity)
   - [Arrays](#arrays)
   - [Strings](#strings)
   - [Objects / Maps / Sets](#objects--maps--sets)
   - [Linked Lists](#linked-lists)
   - [Stacks / Queues / Deques](#stacks--queues--deques)
   - [Priority Queue / Heap](#priority-queue--heap)
   - [Union–Find (Disjoint Set)](#unionfind-disjoint-set)
   - [Fenwick Tree / Segment Tree](#fenwick-tree--segment-tree)
   - [Trie / BST / AVL / Red–Black Trees](#trie--bst--avl--redblack-trees)
   - [Skip List / Bloom Filter](#skip-list--bloom-filter)
   - [Graphs](#graphs)
4. [Sorting Algorithms](#sorting-algorithms)
5. [Searching Algorithms](#searching-algorithms)
6. [Decision Guide: When to Use Each Structure](#decision-guide-when-to-use-each-structure)
7. [Frontend Interview Use-Cases Mapping](#frontend-interview-usecases-mapping)
8. [Space Complexity Quick Notes](#space-complexity-quick-notes)
9. [Amortized Analysis Cheats](#amortized-analysis-cheats)
10. [Gotchas & Caveats](#gotchas--caveats)

---

## Core Big-O Refresher
| Category | Notation | Example |
|-----------|----------|----------|
| Constant | O(1) | Hash lookup, append end of array |
| Logarithmic | O(log n) | Binary search, heap ops |
| Linear | O(n) | Scan array, map/filter |
| Linearithmic | O(n log n) | Sorting |
| Quadratic | O(n²) | Nested loops |
| Exponential | O(2ⁿ) | Subset recursion |
| Factorial | O(n!) | Permutation generation |

---

## Rules of Thumb
- Always **append**, not prepend arrays.
- Use **Map/Set** for frequent insert/lookups.
- Use **heap** when dynamically tracking min/max.
- Avoid accidental O(n) operations (e.g., `shift`, `splice` mid array).
- Use **immutable strings carefully** — concatenation copies.

---

## Data Structure Complexity

### Arrays
| Operation | Complexity | Notes |
|------------|-------------|--------|
| push/pop end | O(1) amortized | — |
| shift/unshift | O(n) | Shifts elements |
| splice | O(n + k) | k = inserted elements |
| indexOf/includes | O(n) | Linear scan |
| sort | O(n log n) | Stable (ES2019+) |

### Strings
| Operation | Complexity | Notes |
|------------|-------------|--------|
| concat | O(n+m) | Copies new string |
| slice | O(k) | Copies substring |
| replace | O(n) avg | Regex may vary |

### Objects / Maps / Sets
| Operation | Avg Time | Space | Notes |
|------------|----------|-------|--------|
| Insert | O(1) | O(n) | Hash insert |
| Lookup | O(1) | O(n) | Hash lookup |
| Delete | O(1) | O(n) | — |
| Iterate | O(n) | O(n) | — |

### Linked Lists
| Operation | Singly | Doubly | Notes |
|------------|---------|---------|--------|
| Insert head/tail | O(1) | O(1) | O(n) if no tail ref |
| Delete head | O(1) | O(1) | — |
| Search | O(n) | O(n) | — |
| Random access | O(n) | O(n) | — |
| Space | O(n) | O(n) | extra pointers |

### Stacks / Queues / Deques
| Structure | Push | Pop | Peek | Notes |
|------------|------|-----|------|--------|
| Stack | O(1) | O(1) | O(1) | Array end ops |
| Queue | O(1)/O(n) | O(1)/O(n) | O(1) | Use circular buffer for O(1) |
| Deque | O(1) | O(1) | O(1) | Double-ended buffer |

### Priority Queue / Heap
| Operation | Time |
|------------|------|
| Insert | O(log n) |
| Extract-min/max | O(log n) |
| Peek | O(1) |
| Build heap | O(n) |

### Union–Find (Disjoint Set)
| Operation | Time (Optimized) |
|------------|----------------|
| Find | α(n) ~ O(1) |
| Union | α(n) ~ O(1) |
| Space | O(n) |

### Fenwick Tree / Segment Tree
| Operation | Complexity | Notes |
|------------|-------------|--------|
| Update | O(log n) | modify node |
| Range Query | O(log n) | prefix/sum |
| Build | O(n) | — |
| Space | O(n) | 4n for seg tree |

### Trie / BST / AVL / Red-Black Trees
| Structure | Search | Insert/Delete | Notes |
|------------|---------|----------------|--------|
| Trie | O(L) | O(L) | L = word length |
| BST | O(log n) avg | O(log n) avg | Worst O(n) |
| AVL / RB | O(log n) | O(log n) | Balanced |

### Skip List / Bloom Filter
| Structure | Insert | Search | Delete | Notes |
|------------|---------|---------|---------|--------|
| Skip List | O(log n) | O(log n) | O(log n) | Randomized levels |
| Bloom Filter | O(k) | O(k) | — | Probabilistic, no false negatives |

### Graphs
| Operation | Complexity |
|------------|-------------|
| Add vertex | O(1) |
| Add edge | O(1) |
| BFS / DFS | O(V + E) |
| Dijkstra | O((V+E) log V) |
| Topo sort | O(V + E) |

---

## Sorting Algorithms
| Algorithm | Avg | Worst | Stable | Notes |
|------------|-----|--------|---------|--------|
| QuickSort | O(n log n) | O(n²) | ✗ | Best avg |
| MergeSort | O(n log n) | O(n log n) | ✓ | Stable |
| HeapSort | O(n log n) | O(n log n) | ✗ | In-place |
| Counting/Radix | O(n+k) | O(n+k) | ✓ | For int keys |

---

## Searching Algorithms
| Method | Complexity |
|---------|-------------|
| Linear search | O(n) |
| Binary search | O(log n) |
| Hash lookup | O(1) expected |
| Tree lookup | O(log n) balanced |

---

## Decision Guide: When to Use Each Structure
| Problem Pattern | Recommended Structure | Reason |
|------------------|------------------------|--------|
| Random access, fast append | Array | O(1) access |
| Frequent insertion/removal in middle | Linked List | Avoid shifts |
| Unique keys, dynamic lookup | Map / Set | O(1) expected |
| Dynamic min/max tracking | Heap | O(log n) ops |
| Connectivity or grouping | Union–Find | α(n) merges |
| Prefix matching (autocomplete) | Trie | O(L) per word |
| Range sum / freq counting | Fenwick/Segment Tree | O(log n) queries |
| Probabilistic membership | Bloom Filter | Space-efficient |
| Graph traversal | BFS / DFS | O(V+E) |

---

## Frontend Interview Use-Cases Mapping
| Common Interview Topic | Recommended DS | Complexity |
|-------------------------|----------------|-------------|
| Autocomplete / Search Suggest | Trie | O(L) per lookup |
| Infinite scroll dedup | Set | O(1) |
| Browser history (undo/redo) | Stack | O(1) |
| LRU cache (React/Vue memo) | Map + Doubly List | O(1) avg |
| Scheduler / task queue | Min-heap | O(log n) per insert |
| DOM tree traversal | BFS/DFS | O(n) |
| Dependency resolution | Topological Sort | O(V+E) |
| Connected UI graph | Union–Find | α(n) |
| Event frequency stats | Fenwick Tree | O(log n) update/query |

---

## Space Complexity Quick Notes
- Arrays / strings → O(n)
- Hashes / maps → O(n)
- Trees / graphs → O(V + E)
- Recursion depth → O(h)

---

## Amortized Analysis Cheats
- Dynamic array `push` → O(1) amortized
- Hash rehash → occasional O(n)
- Union–Find (path compression) → α(n)

---

## Gotchas & Caveats
- JS `sort` mutates array, stable after ES2019.
- Strings are immutable, prefer `array.join('')` when concatenating large text.
- `shift/unshift` O(n) — avoid in loops.
- Maps maintain insertion order; `Object` key order partially defined.
- Regex backtracking can cause exponential runtime.

---

**License:** CC-BY-4.0 — freely share or adapt with attribution.
