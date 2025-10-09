/*
https://www.lintcode.com/problem/433/?fromId=213&_from=collection

Number of Islands

Given a boolean 2D matrix, 0 is represented as the sea, 1 is represented as the island.
If two 1 is adjacent, we consider them in the same island.
We only consider up/down/left/right adjacent.

Find the number of islands.
*/

export class Solution {
  /**
   * Number of Islands
   * -----------------
   * Given a 2D grid of 0s and 1s:
   * - 1 represents land
   * - 0 represents water
   * Two lands are connected if they are adjacent vertically or horizontally.
   *
   * We need to count the number of disconnected islands in the grid.
   *
   * Time Complexity: O(R * C)
   *   - Every cell is visited at most once.
   * Space Complexity: O(R * C)
   *   - Due to the visited matrix and BFS queue in the worst case.
   *
   * @param {number[][]} grid - 2D matrix of 0/1 values
   * @return {number} count of islands
   */
  numIslands(grid) {
    // Guard check: handle invalid or empty input
    if (!grid || grid.length === 0 || grid[0].length === 0) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;

    // Create a 2D visited matrix initialized to false
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    // Define movement directions: down, up, right, left
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    let islandCount = 0;

    /**
     * Breadth-First Search (BFS)
     * --------------------------
     * Starts from one land cell and explores all connected land cells.
     * Marks every visited cell in the visited matrix to avoid repetition.
     */
    const bfs = (startRow, startCol) => {
      const queue = [];
      queue.push([startRow, startCol]);
      visited[startRow][startCol] = true;

      while (queue.length > 0) {
        const [r, c] = queue.shift();

        // Explore all 4 possible directions
        for (const [dr, dc] of directions) {
          const nr = r + dr;
          const nc = c + dc;

          // Skip if out of bounds
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

          // Skip if water or already visited
          if (grid[nr][nc] === 0 || visited[nr][nc]) continue;

          // Mark as visited and add to queue for further expansion
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    };

    /**
     * Main traversal:
     * For each cell, if it’s unvisited land,
     * trigger a BFS to mark the entire island.
     */
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Found a new island
        if (grid[r][c] === 1 && !visited[r][c]) {
          islandCount++;
          bfs(r, c); // Flood-fill this island
        }
      }
    }

    return islandCount;
  }
}
