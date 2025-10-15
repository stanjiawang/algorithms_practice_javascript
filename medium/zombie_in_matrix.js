/*
https://www.lintcode.com/problem/598

Zombie in Matrix

You are given a 2D grid representing a city where:

0 → represents a person
1 → represents a zombie
2 → represents a wall

Each day, every zombie can turn adjacent people (up, down, left, or right) into zombies.
Walls block the infection and cannot be passed through.

Return the minimum number of days required for all people to become zombies.
If it’s impossible to infect everyone, return -1.

Iutput:
[
  [0, 1, 2, 0, 0],
  [1, 0, 0, 2, 1],
  [0, 1, 0, 0, 0]
]
Output: 2
*/

export class Solution {
  /**
   * @param {number[][]} grid - 2D grid representing the city
   * @return {number} - Minimum number of days to infect all people, or -1 if impossible
   */
  zombie(grid) {
    if (!grid || grid.length === 0) return 0;

    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
      [1, 0],   // down
      [-1, 0],  // up
      [0, 1],   // right
      [0, -1],  // left
    ];

    const queue = [];
    let peopleCount = 0;

    // Step 1: Initialize queue with all zombies and count people
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          queue.push([r, c]); // initial zombie
        } else if (grid[r][c] === 0) {
          peopleCount++;
        }
      }
    }

    // No people to infect → 0 days needed
    if (peopleCount === 0) return 0;

    let days = 0;

    // Step 2: BFS (spread day by day)
    while (queue.length > 0) {
      const currentLevelSize = queue.length;
      days++;

      for (let i = 0; i < currentLevelSize; i++) {
        const [row, col] = queue.shift();

        // Infect adjacent people
        for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;

          // Check boundaries and valid infection target
          if (
            newRow >= 0 && newRow < rows &&
            newCol >= 0 && newCol < cols &&
            grid[newRow][newCol] === 0 // a person
          ) {
            grid[newRow][newCol] = 1; // convert to zombie
            peopleCount--;
            queue.push([newRow, newCol]);

            // Early stop: all people infected
            if (peopleCount === 0) return days;
          }
        }
      }
    }

    // Step 3: If there are still people left → impossible
    return -1;
  }
}

/*
| Type      | Complexity   | Explanation                                     |
| --------- | ------------ | ----------------------------------------------- |
| **Time**  | **O(m × n)** | Each cell is visited at most once.              |
| **Space** | **O(m × n)** | BFS queue in the worst case can hold all cells. |
*/
