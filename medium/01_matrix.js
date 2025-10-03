/*
https://www.lintcode.com/course/90/learn/974?chapterId=471&sectionId=3291&ac=true

01 Matrix

Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

Example 1:
Input:
[[0,0,0],
 [0,0,0],
 [0,0,0],
 [0,0,0],
 [0,0,0]]
Output:
[[0,0,0],
 [0,0,0],
 [0,0,0],
 [0,0,0],
 [0,0,0]]

Example 2:
Input:
[[0,1,0,1,1],
 [1,1,0,0,1],
 [0,0,0,1,0],
 [1,0,1,1,1],
 [1,0,0,0,1]]
Output:
[[0,1,0,1,2],
 [1,1,0,0,1],
 [0,0,0,1,0],
 [1,0,1,1,1],
 [1,0,0,0,1]]
*/

export class Solution {
  /**
   * @param {number[][]} matrix - The input matrix containing only 0s and 1s
   * @return {number[][]} - A matrix where each cell is the distance to the nearest 0
   */
  updateMatrix(matrix) {
    // Step 1: Handle edge cases
    if (!Array.isArray(matrix) || matrix.length === 0 || matrix[0].length === 0) {
      return [];
    }

    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    // Step 2: Initialize distance matrix
    // Start with Infinity (meaning "unknown / very far")
    const distanceMatrix = Array.from({ length: rowCount }, () =>
      Array(colCount).fill(Infinity)
    );

    // Step 3: Initialize a queue with all 0-cells as sources
    // These act as "multiple fire sources" spreading outwards
    const queue = [];
    let queueHead = 0; // pointer to simulate O(1) dequeue

    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        if (matrix[row][col] === 0) {
          distanceMatrix[row][col] = 0;  // distance to itself is 0
          queue.push([row, col]);        // enqueue all 0s as starting points
        }
      }
    }

    // Step 4: Define 4 possible directions (up, down, left, right)
    const directions = [
      [-1, 0], // up
      [1, 0],  // down
      [0, -1], // left
      [0, 1],  // right
    ];

    // Step 5: BFS loop
    // Process the queue until it is empty
    while (queueHead < queue.length) {
      const [currentRow, currentCol] = queue[queueHead++];
      const currentDistance = distanceMatrix[currentRow][currentCol];

      // Explore all 4 neighbors
      for (const [rowOffset, colOffset] of directions) {
        const newRow = currentRow + rowOffset;
        const newCol = currentCol + colOffset;

        // Skip out-of-bound positions
        if (
          newRow < 0 ||
          newRow >= rowCount ||
          newCol < 0 ||
          newCol >= colCount
        ) {
          continue;
        }

        // If we found a shorter path for the neighbor
        if (distanceMatrix[newRow][newCol] > currentDistance + 1) {
          distanceMatrix[newRow][newCol] = currentDistance + 1;
          queue.push([newRow, newCol]); // Enqueue neighbor to continue spreading
        }
      }
    }

    // Step 6: Return the completed distance matrix
    return distanceMatrix;
  }
}

/*
How to Explain in Interview (easy to memorize)

What: I need the distance of each cell to the nearest 0.
Idea: Instead of starting BFS from each 1, I start from all 0s simultaneously. This is called multi-source BFS.
Why: BFS spreads layer by layer. The first time a cell is reached, that’s the shortest path.
How:
Put all 0s into the queue, set their distance = 0.

Initialize all 1s as Infinity.
BFS: Pop a cell, try its 4 neighbors. If neighbor’s distance can be improved (shorter path), update it and push it into queue.
Complexity: Each cell is enqueued at most once → O(m × n).
*/
