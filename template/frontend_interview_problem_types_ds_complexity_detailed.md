# Frontend Interview Problem Types → Algorithms, Data Structures, and Complexity (Detailed Guide)

> This guide catalogs common frontend interview problem types. For each type, you get: **when it appears**, **what algorithm and data structure to use**, a **step‑by‑step outline**, **time and space complexity**, **variants**, and **pitfalls**. All names are written in full (no unexplained abbreviations).

---

## Table of Contents
1. [Frequency Counting and Deduplication](#1-frequency-counting-and-deduplication)
2. [Two‑Sum / Three‑Sum / Four‑Sum Families](#2-two-sum--three-sum--four-sum-families)
3. [Sliding Window: Longest or Shortest Substring and Subarray](#3-sliding-window-longest-or-shortest-substring-and-subarray)
4. [Fixed‑Window Extreme Values with Monotonic Deque](#4-fixed-window-extreme-values-with-monotonic-deque)
5. [Prefix Sum and Difference Array](#5-prefix-sum-and-difference-array)
6. [Sorting and Selection (including Quickselect)](#6-sorting-and-selection-including-quickselect)
7. [Monotonic Stack Patterns](#7-monotonic-stack-patterns)
8. [Parentheses and Expression Evaluation with Stack](#8-parentheses-and-expression-evaluation-with-stack)
9. [Binary Search on Arrays and on the Answer Space](#9-binary-search-on-arrays-and-on-the-answer-space)
10. [Greedy Interval Scheduling and Meeting Rooms](#10-greedy-interval-scheduling-and-meeting-rooms)
11. [Priority Queue / Heap for Top‑K and Multi‑Way Merge](#11-priority-queue--heap-for-top-k-and-multi-way-merge)
12. [Graph Traversal: Breadth‑First Search and Depth‑First Search](#12-graph-traversal-breadth-first-search-and-depth-first-search)
13. [Connectivity with Disjoint Set (Union–Find)](#13-connectivity-with-disjoint-set-unionfind)
14. [Shortest Path in Weighted Graphs: Dijkstra Algorithm](#14-shortest-path-in-weighted-graphs-dijkstra-algorithm)
15. [Topological Ordering and Cycle Detection in Directed Graphs](#15-topological-ordering-and-cycle-detection-in-directed-graphs)
16. [Binary Trees: Traversals, Properties, and Lowest Common Ancestor](#16-binary-trees-traversals-properties-and-lowest-common-ancestor)
17. [Binary Search Tree Operations and Properties](#17-binary-search-tree-operations-and-properties)
18. [Prefix Tree (Trie) for Prefix Queries and Word Search](#18-prefix-tree-trie-for-prefix-queries-and-word-search)
19. [Dynamic Programming: Classic Families](#19-dynamic-programming-classic-families)
20. [Range Query Data Structures: Fenwick Tree and Segment Tree](#20-range-query-data-structures-fenwick-tree-and-segment-tree)
21. [Exact String Matching: Knuth–Morris–Pratt, Z‑Algorithm, and Rolling Hash](#21-exact-string-matching-knuthmorriskn-pratt-z-algorithm-and-rolling-hash)
22. [Palindromic Strings: Expand‑Around‑Center and Manacher Algorithm](#22-palindromic-strings-expand-around-center-and-manacher-algorithm)
23. [Caching Strategies: Least Recently Used and Least Frequently Used](#23-caching-strategies-least-recently-used-and-least-frequently-used)
24. [Probabilistic Membership: Bloom Filter](#24-probabilistic-membership-bloom-filter)
25. [Backtracking for Combinations, Subsets, and Permutations](#25-backtracking-for-combinations-subsets-and-permutations)

---

### 1. Frequency Counting and Deduplication
**When it appears:** Remove duplicates, count occurrences, find first unique character, majority element, anagram checks, word frequency.

**Data structures:** Hash map (`Map` or plain object) for counts; hash set (`Set`) for membership; optionally an array of size 26 for lowercase letters.

**Algorithm outline:**
1. Traverse the input once, update counts or membership.
2. For queries like “first unique,” iterate again and choose the first with count equal to one.

**Complexity:** Time O(n), Space O(k) where k is the number of distinct keys.

**Variants:** Case‑insensitive counting (normalize), streaming data with rolling counts, sliding‑window frequency (combine with Section 3).

**Pitfalls:** Forgetting to normalize keys (trim, lowercase); using object without safe key handling (consider `Object.create(null)` or `Map`).

---

### 2. Two‑Sum / Three‑Sum / Four‑Sum Families
**When it appears:** Find pairs or tuples that sum to a target value.

**Data structures and algorithms:**
- Two‑Sum with hash set: One pass, store complement or seen values.
- Three‑Sum and Four‑Sum: Sort the array; fix one or two indices; use the two‑pointer technique inside.

**Complexity:**
- Two‑Sum with hash set: Time O(n), Space O(n).
- Three‑Sum: Sorting O(n log n) + two‑pointer O(n²) total O(n²).
- Four‑Sum: O(n³) after sorting with pruning.

**Variants:** Count of tuples, unique tuple list (skip duplicates after sorting), closest sum, product instead of sum.

**Pitfalls:** Duplicate handling; integer overflow if using languages with fixed integers (JS uses Number but be cautious with precision for very large numbers).

---

### 3. Sliding Window: Longest or Shortest Substring and Subarray
**When it appears:** Longest substring without repeating characters, minimum window substring, longest substring with at most K distinct characters, subarray sum constraints.

**Data structures:** Two pointers for left and right borders; hash map or array to maintain counts; hash set for uniqueness.

**Algorithm outline:**
1. Expand the right pointer to include new elements, update counts/state.
2. While the window violates the constraint, move the left pointer and update counts/state.
3. Track best length or best window when constraints are satisfied.

**Complexity:** Typically Time O(n) because each element enters and leaves the window at most once; Space O(k) for maintained keys.

**Variants:** Variable window constraints (at most/exactly K distinct), character class constraints, numeric subarray sum at most K (use prefix sums or deques).

**Pitfalls:** Off‑by‑one when recording results; not shrinking while over‑constrained; mixing character and byte length for Unicode. 

---

### 4. Fixed‑Window Extreme Values with Monotonic Deque
**When it appears:** Sliding window maximum or minimum.

**Data structures:** Double‑ended queue storing indices in monotonic order (decreasing for maximum, increasing for minimum).

**Algorithm outline:**
1. For each new index, pop from the back while the new value violates monotonicity.
2. Push the new index; remove from the front if it falls out of the window.
3. The front always holds the index of the current extreme value.

**Complexity:** Time O(n) overall because each index is added and removed at most once; Space O(w) where w is the window size.

**Variants:** Apply to absolute difference constraints with two deques (one for max, one for min).

**Pitfalls:** Storing values instead of indices causes trouble when exiting the window.

---

### 5. Prefix Sum and Difference Array
**When it appears:** Range sum queries, number of subarrays with sum equal to k, balancing parentheses, difference updates on ranges.

**Data structures:** Prefix sum array; hash map from prefix value to earliest index or frequency.

**Algorithm outline:**  
- Range sum in O(1) after O(n) preprocessing.  
- Count subarrays with a target sum: for each prefix sum P[i], count how many times P[i] − target has appeared.

**Complexity:** Time O(n) for a single scan; Space O(n) for the prefix map.

**Variants:** Two‑dimensional prefix sums for matrices; difference array for range increment updates in O(1) per update with final O(n) sweep.

**Pitfalls:** Integer overflow in other languages; forgetting to seed prefix 0 with frequency 1.

---

### 6. Sorting and Selection (including Quickselect)
**When it appears:** Sort then sweep, find the k‑th smallest or largest value.

**Data structures:** In‑place array; partition routine.

**Algorithm outline:**
- Quickselect partitions the array around a pivot and recurses into the side containing the k‑th element.
- Sorting followed by scanning solves many interval and grouping problems.

**Complexity:** Quickselect average Time O(n) (worst O(n²)), Space O(1). Sorting Time O(n log n).

**Variants:** Stable sorting (merge sort) for stability guarantees; counting sort/radix sort for integers with bounded ranges.

**Pitfalls:** Poor pivot selection degrades Quickselect; forgetting that `Array.prototype.sort` mutates in JavaScript.

---

### 7. Monotonic Stack Patterns
**When it appears:** Next greater element, daily temperatures, largest rectangle in histogram, trapping rain water.

**Data structures:** Stack of indices maintaining monotonic order.

**Algorithm outline:**  
- While current breaks monotonicity, pop and compute contribution using the distance to the new top.  
- Push current index; repeat.

**Complexity:** Time O(n), Space O(n) in worst case.

**Variants:** Next smaller element, circular arrays (handle wrap by iterating twice).

**Pitfalls:** Mixing indices and values; not handling equal elements consistently (strict vs non‑strict monotonicity).

---

### 8. Parentheses and Expression Evaluation with Stack
**When it appears:** Valid parentheses, minimum additions to make valid, infix expression evaluation, reverse Polish notation evaluation.

**Data structures:** Stack of characters or frames; for evaluation, a value stack and optionally an operator stack with precedence handling.

**Algorithm outline:**  
- Matching parentheses: push on open, pop on close and check pair.  
- Infix evaluation: use shunting‑yard style to handle precedence and parentheses; or convert to reverse Polish notation first.

**Complexity:** Time O(n); Space O(n) for the stack(s).

**Variants:** Multiple bracket types, with or without operators, removing minimum invalid parentheses to make a string valid.

**Pitfalls:** Operator precedence and associativity; unary operators; whitespace and invalid tokens.

---

### 9. Binary Search on Arrays and on the Answer Space
**When it appears:** Search in sorted arrays, find boundaries (first ≥ target), find minimum feasible value that passes a monotone predicate.

**Data structures:** None beyond indices; a predicate function for answer‑space search.

**Algorithm outline:**  
- Standard binary search invariant: shrink the half that cannot contain the answer.  
- Answer‑space binary search: define a monotone predicate (true/false); search the minimal value making predicate true.

**Complexity:** Time O(log n) · cost(predicate), Space O(1).

**Variants:** Search in rotated sorted arrays (modify comparisons), search for peak element (binary on slopes).

**Pitfalls:** Infinite loops with mid computation, integer overflow in other languages, off‑by‑one at boundaries.

---

### 10. Greedy Interval Scheduling and Meeting Rooms
**When it appears:** Select maximum number of non‑overlapping intervals; count minimum rooms for meetings; merge overlapping intervals.

**Data structures:** Sorted arrays; a min‑heap ordered by end time for room counting.

**Algorithm outline:**  
- For maximum non‑overlap: sort by end time and take intervals greedily.  
- For meeting rooms: sort by start time; push end times to a min‑heap; pop when the earliest ending meeting finishes before the next starts.

**Complexity:** Sorting O(n log n); heap operations O(log n) per interval ⇒ overall O(n log n).

**Variants:** Weighted interval scheduling requires dynamic programming.

**Pitfalls:** Sorting by start time instead of end time for the selection problem; not handling equal endpoints properly.

---

### 11. Priority Queue / Heap for Top‑K and Multi‑Way Merge
**When it appears:** Top K frequent elements, K closest points, merge K sorted lists or streams, running median.

**Data structures:** Binary heap (min‑heap or max‑heap) backed by an array.

**Algorithm outline:**  
- Maintain a heap of size K; push new elements and evict when size exceeds K.  
- For multi‑way merge, push the first element of each list with a pointer; pop the smallest and push the next from the same list.

**Complexity:** Time O(n log K) for Top K; O(N log K) for merging K lists with total N elements; Space O(K).

**Variants:** Double heap for running median (one max‑heap for lower half, one min‑heap for upper half).

**Pitfalls:** Using the wrong heap direction; forgetting to include tie‑breaking keys.

---

### 12. Graph Traversal: Breadth‑First Search and Depth‑First Search
**When it appears:** Shortest path in unweighted graphs (breadth‑first), counting connected components, cycle detection, grid problems like number of islands.

**Data structures:** Adjacency list for graphs; queue for breadth‑first; recursion or explicit stack for depth‑first; visited set.

**Algorithm outline:**  
- Breadth‑first explores by layers from the source; depth‑first explores along one branch before backtracking.

**Complexity:** Time O(V + E); Space O(V) for visited and the queue/stack.

**Variants:** Multi‑source breadth‑first; bidirectional breadth‑first for faster search between two nodes.

**Pitfalls:** Stack overflow for deep recursion in JavaScript; forgetting to mark visited upon enqueue instead of upon dequeue.

---

### 13. Connectivity with Disjoint Set (Union–Find)
**When it appears:** Dynamic connectivity queries, detecting cycles in undirected graphs, grouping equivalent items, merging accounts.

**Data structures:** Parent array or map; rank or size array for union by rank/size; path compression during find.

**Algorithm outline:**  
- Initialize each element as its own parent.  
- For each union operation, find roots and merge by rank or size.  
- For connectivity queries, two elements are connected if their roots are equal.

**Complexity:** With both optimizations, nearly constant time per operation (inverse Ackermann function), Space O(n).

**Variants:** Track component sizes or counts; offline query processing.

**Pitfalls:** Union without rank/size can cause tall trees; forgetting path compression degrades performance.

---

### 14. Shortest Path in Weighted Graphs: Dijkstra Algorithm
**When it appears:** Non‑negative edge weights shortest path in road networks, dependency graphs with weights.

**Data structures:** Adjacency list; min‑heap keyed by distance.

**Algorithm outline:**  
- Initialize distances to infinity except source.  
- Repeatedly extract the node with the smallest tentative distance; relax its edges; update neighbors in the heap.

**Complexity:** Time O((V + E) log V) with a binary heap; Space O(V).

**Variants:** Early exit when the destination is popped; multiple sources by seeding multiple nodes with distance zero.

**Pitfalls:** Negative edges invalidate Dijkstra; use Bellman–Ford or a queue‑based algorithm in such cases.

---

### 15. Topological Ordering and Cycle Detection in Directed Graphs
**When it appears:** Resolving task dependencies, course schedule feasibility, build order.

**Data structures:** Adjacency list; indegree array; queue for nodes whose indegree becomes zero.

**Algorithm outline (Kahn’s algorithm):**  
- Compute indegrees; enqueue nodes with indegree zero.  
- Pop, append to order, decrement neighbors’ indegrees; enqueue new zeros.  
- If all nodes are processed, the graph is acyclic; otherwise a cycle exists.

**Complexity:** Time O(V + E); Space O(V).

**Variants:** Depth‑first search based ordering with recursion stack for cycle detection.

**Pitfalls:** Miscounting indegrees; not handling multiple components.

---

### 16. Binary Trees: Traversals, Properties, and Lowest Common Ancestor
**When it appears:** Tree traversal orders, compute height, validate tree properties, lowest common ancestor of two nodes.

**Data structures:** Explicit stack for iterative traversal; parent pointers and depth for lowest common ancestor.

**Algorithm outline:**  
- Traversals: inorder, preorder, postorder (recursive or iterative).  
- Lowest common ancestor in general tree: move the deeper node up until depths match, then climb both until equal.

**Complexity:** Traversals Time O(n), Space O(h) where h is height. Lowest common ancestor Time O(h).

**Variants:** Lowest common ancestor with preprocessing to answer queries in O(1) using binary lifting (requires extra memory and setup).

**Pitfalls:** Forgetting null checks; modifying the tree inadvertently in iterative traversals.

---

### 17. Binary Search Tree Operations and Properties
**When it appears:** Ordered set/map operations, range queries.

**Data structures:** Binary search tree nodes storing keys and values, possibly balanced with rotations (AVL or Red‑Black).

**Operation complexity:** Search/insert/delete are O(h) where h is height; O(log n) if balanced, up to O(n) if unbalanced.

**Variants:** Augmented trees tracking subtree sizes or sums for order statistics and range sums.

**Pitfalls:** Degeneration to a list on sorted input without balancing; forgetting to update augmented data on rotations.

---

### 18. Prefix Tree (Trie) for Prefix Queries and Word Search
**When it appears:** Autocomplete, prefix existence, dictionary search, multi‑pattern matching on boards.

**Data structures:** Tree nodes with child pointers keyed by character; a flag for end‑of‑word and optionally frequency or weight.

**Algorithm outline:**  
- Insert words by walking characters, creating nodes as needed.  
- Search and prefix queries walk the same path; stop early if a required child is missing.

**Complexity:** Insert and search time O(L) where L is word length; Space O(Σ·N) where Σ is alphabet size and N total words.

**Variants:** Compressed trie to save space; combined with backtracking for board word search with pruning.

**Pitfalls:** High memory overhead; forgetting to mark end‑of‑word correctly.

---

### 19. Dynamic Programming: Classic Families
**When it appears:** Problems with optimal substructure and overlapping subproblems.

**Common families and outlines:**  
- **Coin Change (minimum coins):** one‑dimensional array `dp[amount]` = minimum coins to make `amount`. Time O(amount × number_of_coin_types).  
- **Coin Change (number of ways):** count combinations. Time O(amount × number_of_coin_types).  
- **Longest Increasing Subsequence:** two solutions:  
  - Quadratic: `dp[i]` = longest length ending at `i`. Time O(n²).  
  - Patience sorting method: maintain a list of minimum tails; binary search to place each number. Time O(n log n).  
- **Longest Common Subsequence:** two‑dimensional array `dp[i][j]`. Time O(n × m).  
- **Edit Distance (Levenshtein):** two‑dimensional array with insertion, deletion, substitution. Time O(n × m).  
- **Climbing Stairs / Fibonacci:** iterative bottom‑up. Time O(n), Space O(1).  
- **Interval dynamic programming (merge stones / burst balloons):** choose partition points, try all splits. Time often O(n³) with O(n²) space.

**Pitfalls:** Incorrect base cases; wrong iteration order; not compressing dimensions when possible to reduce space.

---

### 20. Range Query Data Structures: Fenwick Tree and Segment Tree
**When it appears:** Many point updates with range sum queries, or range updates with point queries, or range minimum/maximum queries.

**Fenwick Tree (Binary Indexed Tree):**  
- Supports prefix sums and point updates in O(log n).  
- Space O(n); easy to implement.

**Segment Tree:**  
- Supports flexible range queries (sum, min, max) and updates in O(log n).  
- With lazy propagation, supports range updates in O(log n).  
- Space O(n) (typically up to 4n nodes).

**Pitfalls:** Off‑by‑one indexing; forgetting to push lazy tags in segment tree; mixing inclusive and exclusive ranges.

---

### 21. Exact String Matching: Knuth–Morris–Pratt, Z‑Algorithm, and Rolling Hash
**When it appears:** Find pattern occurrences in text, repeated substring detection.

**Knuth–Morris–Pratt:** Precompute the longest proper prefix which is also a suffix; scan text in linear time. Time O(n + m), Space O(m).

**Z‑Algorithm:** Compute Z‑array that stores longest substring starting at index i matching the prefix; useful for pattern search in O(n + m).

**Rolling Hash (Rabin–Karp):** Hash the pattern and each window; compare hashes and verify matches. Time O(n + m) average; beware collisions.

**Pitfalls:** Poor hash choice causing many collisions; off‑by‑one errors in prefix function or Z‑box maintenance.

---

### 22. Palindromic Strings: Expand‑Around‑Center and Manacher Algorithm
**When it appears:** Longest palindromic substring, count palindromic substrings.

**Expand‑Around‑Center:** For each index (and gap between indices), expand while left and right characters match. Time O(n²) worst, Space O(1).

**Manacher Algorithm:** Linear‑time longest palindromic substring by reusing symmetries. Time O(n), Space O(n).

**Pitfalls:** Handling even‑length palindromes; index bounds when expanding.

---

### 23. Caching Strategies: Least Recently Used and Least Frequently Used
**When it appears:** Implement browser‑like cache eviction, memoization with capacity, API response cache.

**Least Recently Used:** Hash map from key to node and a doubly linked list ordered by recency. Get and put are expected O(1).

**Least Frequently Used:** Hash map from key to node and a map from frequency to a doubly linked list. Both operations are expected O(1) with careful bookkeeping.

**Pitfalls:** Not updating recency or frequency on get; edge cases when capacity is zero.

---

### 24. Probabilistic Membership: Bloom Filter
**When it appears:** Fast pre‑check whether an element may be in a very large set, with small memory footprint.

**Data structures:** Bit array and multiple hash functions.

**Operations:** Insert and membership query both take O(k) where k is the number of hash functions; space is O(m) bits for bit array.

**Trade‑offs:** No false negatives; controllable false positives. Choose k and m for target false positive rate given expected number of items.

**Pitfalls:** No support for deletion unless using a counting Bloom filter; not suitable when exactness is required.

---

### 25. Backtracking for Combinations, Subsets, and Permutations
**When it appears:** Generate all combinations, subsets, permutations; partition strings; N‑Queens; restore IP addresses.

**Data structures:** Recursion call stack to hold the current path; boolean used array for permutations; pruning checks.

**Algorithm outline:**  
- Choose an element, explore including it, then backtrack and explore excluding it.  
- Prune when constraints are already violated or cannot possibly be satisfied.

**Complexity:** Proportional to the size of the solution space: for permutations O(n!), for combinations O(2^n), each with additional linear cost to construct solutions.

**Pitfalls:** Missing backtrack step (not reverting state); duplicate handling (sort then skip equal elements).

---

## Quick Reference: Which Tool for Which Pattern?
- Continuous subarray or substring with constraints → Sliding window (Section 3).  
- Window extreme values → Monotonic deque (Section 4).  
- Next greater/smaller or histogram area → Monotonic stack (Section 7).  
- Many lookups or counts → Hash map / Hash set (Section 1).  
- Top K or streaming extremes → Heap (Section 11).  
- Connectivity and grouping → Disjoint set (Section 13).  
- Unweighted shortest path → Breadth‑first search (Section 12).  
- Non‑negative weighted shortest path → Dijkstra (Section 14).  
- Dependencies ordering → Topological ordering (Section 15).  
- Prefix queries → Trie (Section 18).  
- Range sums with frequent updates → Fenwick tree or Segment tree (Section 20).  
- Pattern search in strings → Knuth–Morris–Pratt or Z‑Algorithm (Section 21).  
- Largest palindromic substring → Expand‑around‑center or Manacher (Section 22).  
- Enumerate solution sets → Backtracking (Section 25).

---

**License:** CC‑BY‑4.0 — You may share or adapt with attribution.
