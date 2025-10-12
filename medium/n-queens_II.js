/*
https://www.lintcode.com/problem/34/?fromId=213&_from=collection

N-Queens II

According to N-Queens problem.
Now, instead outputting board configurations, return the total number of distinct solutions.
n<=10

Example 1:
Input: n = 1
Output: 1
Explanation:
1:
1

Example 2:
Input: n = 4
Output: 2
Explanation:
1:
0 0 1 0
1 0 0 0
0 0 0 1
0 1 0 0
2:
0 1 0 0
0 0 0 1
1 0 0 0
0 0 1 0
*/

export class Solution {
  /**
   * @param {number} n - The number of queens.
   * @return {number} - Total number of distinct valid solutions.
   */
  totalNQueens(n) {
    let totalSolutions = 0;

    // Sets to mark attacked columns and diagonals
    const cols = new Set();   // columns already occupied
    const diag1 = new Set();  // "main" diagonals (row - col)
    const diag2 = new Set();  // "anti" diagonals (row + col)

    /**
     * DFS helper to explore all valid queen placements row by row.
     * @param {number} row - Current row index where we are trying to place a queen.
     */
    const backtrack = (row) => {
      // Base case: all queens successfully placed
      if (row === n) {
        totalSolutions++;
        return;
      }

      // Try placing a queen in every column of this row
      for (let col = 0; col < n; col++) {
        // Skip if current column or diagonal is already under attack
        if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
          continue;
        }

        // ✅ Choose: place queen here
        cols.add(col);
        diag1.add(row - col);
        diag2.add(row + col);

        // 🔁 Explore: go to next row
        backtrack(row + 1);

        // 🔙 Unchoose: backtrack (remove the queen)
        cols.delete(col);
        diag1.delete(row - col);
        diag2.delete(row + col);
      }
    };

    // Start DFS from the first row
    backtrack(0);

    return totalSolutions;
  }
}

/*
| Category  | Explanation                                                                                                                                                                   | Complexity |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **Time**  | In each row we may try up to `n` columns, but most branches get pruned due to conflicts. The worst-case exploration resembles the permutations of n queens → roughly `O(N!)`. | **O(N!)**  |
| **Space** | Recursion stack `O(N)` for n rows + three Set structures (≤ 3N).                                                                                                              | **O(N)**   |
*/

