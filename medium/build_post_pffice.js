/*
https://www.lintcode.com/problem/574

Build Post Office

Given a 2D grid, each cell is either a wall 2, a house 1, or empty 0.
You want to build a post office on one empty cell so that the sum of distances from that post office to all houses is minimized. 
You cannot pass through walls or houses (only through empty cells). Return the minimal sum distance, or −1 if it’s impossible to reach all houses from any empty spot.
*/

export class Solution {
  /**
   * @param {number[][]} grid - 2D grid (0 = empty, 1 = house, 2 = wall)
   * @return {number} - minimal total distance or -1 if unreachable
   */
  shortestDistance(grid) {
    const rows = grid.length;
    const cols = grid[0].length;

    // distanceSum[r][c] accumulates total distance from all houses
    const distanceSum = Array.from({ length: rows }, () => Array(cols).fill(0));

    // reachCount[r][c] counts how many houses can reach this empty cell
    const reachCount = Array.from({ length: rows }, () => Array(cols).fill(0));

    let totalHouses = 0;

    // 4 possible movement directions (up, down, left, right)
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    // Step 1️⃣ – BFS from every house
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col] === 1) {
          totalHouses++;
          this.bfsFromHouse(grid, row, col, distanceSum, reachCount, directions);
        }
      }
    }

    // Step 2️⃣ – Find the empty cell that can reach all houses
    let minTotalDistance = Infinity;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isEmptyCell = grid[row][col] === 0;
        const canReachAll = reachCount[row][col] === totalHouses;

        if (isEmptyCell && canReachAll) {
          minTotalDistance = Math.min(minTotalDistance, distanceSum[row][col]);
        }
      }
    }

    return minTotalDistance === Infinity ? -1 : minTotalDistance;
  }

  /**
   * BFS from one house to all reachable empty cells
   * @param {number[][]} grid
   * @param {number} startRow
   * @param {number} startCol
   * @param {number[][]} distanceSum
   * @param {number[][]} reachCount
   * @param {number[][]} directions
   */
  bfsFromHouse(grid, startRow, startCol, distanceSum, reachCount, directions) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Track visited cells for this BFS run
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    // Initialize BFS queue with [row, col, currentDistance]
    const queue = [[startRow, startCol, 0]];
    visited[startRow][startCol] = true;

    while (queue.length > 0) {
      const [row, col, currentDistance] = queue.shift();

      // Explore 4 neighbors
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        // Check bounds + must be unvisited + must be empty
        const isInside = newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols;

        if (
          isInside &&
          !visited[newRow][newCol] &&
          grid[newRow][newCol] === 0
        ) {
          // Mark visited
          visited[newRow][newCol] = true;

          // Update cumulative distance and reach count
          distanceSum[newRow][newCol] += currentDistance + 1;
          reachCount[newRow][newCol]++;

          // Add to BFS queue
          queue.push([newRow, newCol, currentDistance + 1]);
        }
      }
    }
  }
}

/*
| Complexity | Formula          | Explanation                                                  |
| ---------- | ---------------- | ------------------------------------------------------------ |
| **Time**   | **O(H × M × N)** | For each house `H`, we run BFS across the grid (`M×N`).      |
| **Space**  | **O(M × N)**     | Used by `distanceSum`, `reachCount`, and `visited` matrices. |
*/
