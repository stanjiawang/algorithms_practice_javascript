/*
https://www.lintcode.com/course/98/learn/663?chapterId=518&sectionId=3929&ac=true

Walls and Gates

You are given a m x n 2D grid initialized with these three possible values.
-1 - A wall or an obstacle.
0 - A gate.
INF - Infinity means an empty room. We use the value 2^31 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a Gate, that room should remain filled with INF

Example 1:
Input:
[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output:
[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]
Explanation:
the 2D grid is:
INF  -1  0  INF
INF INF INF  -1
INF  -1 INF  -1
  0  -1 INF INF
the answer is:
  3  -1   0   1
  2   2   1  -1
  1  -1   2  -1
  0  -1   3   4

Example 2:
Input:
[[0,-1],[2147483647,2147483647]]
Output:
[[0,-1],[1,2]]
*/

export class Solution {
  /**
   * @param rooms: m x n 2D grid
   * @return: nothing
   */
  wallsAndGates(rooms) {
    if (!rooms || rooms.length === 0 || rooms[0].length === 0) return;

    const INF = 2147483647;
    const m = rooms.length;
    const n = rooms[0].length;
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

    const queue = [];
    // Seed all gates
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (rooms[r][c] === 0) queue.push([r, c]);
      }
    }

    // BFS
    let head = 0;
    while (head < queue.length) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;

        // Only fill previously-unreached empty rooms
        if (rooms[nr][nc] !== INF) continue;

        rooms[nr][nc] = rooms[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
}
