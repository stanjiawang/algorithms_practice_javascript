/*
https://www.lintcode.com/problem/434/?fromId=213&_from=collection

Number of Islands II

Given a n,m which means the row and column of the 2D matrix and an array of pair A( size k).
Originally, the 2D matrix is all 0 which means there is only sea in the matrix.
The list pair has k operator and each operator has two integer A[i].x, A[i].y 
means that you can change the grid matrix[A[i].x][A[i].y] from sea to island. 
Return how many island are there in the matrix after each operator.
You need to return an array of size K.

0 is represented as the sea, 1 is represented as the island.
If two 1 is adjacent, we consider them in the same island.
We only consider up/down/left/right adjacent.

Input: n = 4, m = 5, A = [[1,1],[0,1],[3,3],[3,4]]
Output: [1,1,2,2]
Explanation:
0.  00000
    00000
    00000
    00000
1.  00000
    01000
    00000
    00000
2.  01000
    01000
    00000
    00000
3.  01000
    01000
    00000
    00010
4.  01000
    01000
    00000
    00011
*/

/**
 * Definition of Point (for LintCode compatibility):
 * class Point {
 *   constructor(x = 0, y = 0) {
 *     this.x = x;
 *     this.y = y;
 *   }
 * }
 */

export class Solution {
  /**
   * @param {number} n - number of rows in the grid
   * @param {number} m - number of columns in the grid
   * @param {Point[]} operators - list of operations turning sea cells into land
   * @return {number[]} number of islands after each operation
   */
  numIslands2(n, m, operators) {
    const result = [];
    if (!operators || operators.length === 0) return result;

    // Directions: up, down, left, right
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    // Union-Find data structure
    const parent = new Array(n * m).fill(-1); // parent[i] = root of node i
    const rank = new Array(n * m).fill(0);    // rank for union by rank optimization
    const visited = new Set();                // set of land cells (id = x*m + y)
    let islandCount = 0;

    // ---------- Helper functions ----------
    // Path-compressed find
    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]);
      }
      return parent[x];
    };

    // Union two components, return true if merged (i.e. were separate)
    const union = (a, b) => {
      const rootA = find(a);
      const rootB = find(b);
      if (rootA === rootB) return false; // already in same island

      // Union by rank
      if (rank[rootA] > rank[rootB]) {
        parent[rootB] = rootA;
      } else if (rank[rootA] < rank[rootB]) {
        parent[rootA] = rootB;
      } else {
        parent[rootB] = rootA;
        rank[rootA]++;
      }
      return true;
    };

    // ---------- Process each operation ----------
    for (const { x, y } of operators) {
      const id = x * m + y;

      // Skip if already land
      if (visited.has(id)) {
        result.push(islandCount);
        continue;
      }

      // Step 1: mark new land
      visited.add(id);
      parent[id] = id;
      islandCount++;

      // Step 2: try to connect to neighboring lands
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        const neighborId = nx * m + ny;

        // Out-of-bounds check
        if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;
        // Skip if neighbor is still sea
        if (!visited.has(neighborId)) continue;

        // If neighbor is land and belongs to another island → merge
        if (union(id, neighborId)) islandCount--;
      }

      // Step 3: record current number of islands
      result.push(islandCount);
    }

    return result;
  }
}

/*
Each new land starts as a new island → islandCount++.
Check 4 neighbors (up, down, left, right):
If neighbor is land and belongs to another island → merge them (union) → islandCount--.
Maintain a Union-Find to keep track of which cells belong to which island.
Use a Set (visited) to know which cells are currently land (no need for a full grid).

| Category  | Complexity      | Reason                                                                                           |
| --------- | --------------- | ------------------------------------------------------------------------------------------------ |
| **Time**  | `O(k · α(n·m))` | `k` = number of operations; each `find/union` is amortized inverse-Ackermann `α(n·m)` ≈ constant |
| **Space** | `O(n · m)`      | Union-Find arrays + visited set                                                                  |
*/

