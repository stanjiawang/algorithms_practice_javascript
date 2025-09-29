/*
BFS Template (Queue + Level Expansion)

Breadth-First Search expands level by level.
The first time you reach a node/cell, you’ve already found the shortest path.

When to use BFS:
1. Finding shortest paths in an unweighted grid/graph.
2. Problems where distance expands outward step by step (like “Walls and Gates”).
3. Multi-source shortest path (queue initialized with multiple sources).
*/

function bfs(grid, starts) {
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  const queue = [];

  // Multi-source BFS: initialize with all starting points
  for (const [r, c] of starts) {
    queue.push([r, c, 0]); // [row, col, distance]
    visited[r][c] = true;
  }

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();

    // ---- Put your logic here ----
    // e.g., update distance: grid[r][c] = dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
      if (visited[nr][nc]) continue;

      visited[nr][nc] = true;
      queue.push([nr, nc, dist + 1]);
    }
  }
}
