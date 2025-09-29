/*
DFS Template (Recursion / Stack)

Depth-First Search explores deeply along one path, then backtracks.

When to use DFS:
1. Explore entire connected components (e.g., number of islands).
2. Backtracking problems (e.g., N-Queens, Sudoku, permutations).
3. Not guaranteed to give shortest path.

If the problem asks for minimum steps / shortest path, use BFS.
If the problem asks for exploring all paths / connectivity, use DFS.
Multi-source BFS is just BFS where you enqueue all starting points at on
*/

function dfs(grid, r, c, visited) {
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

  // Out of bounds / already visited check
  if (r < 0 || r >= m || c < 0 || c >= n) return;
  if (visited[r][c]) return;

  visited[r][c] = true;

  // ---- Put your logic here ----
  // e.g., mark cell, count island size, color cell, etc.

  for (const [dr, dc] of dirs) {
    dfs(grid, r + dr, c + dc, visited);
  }
}
