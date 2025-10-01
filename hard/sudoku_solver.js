/*
https://www.lintcode.com/course/98/learn/802?chapterId=519&sectionId=3933&ac=true

Sudoku Solver
Write a program to solve a Sudoku puzzle by filling the empty cells.
Empty cells are indicated by the number 0.
You may assume that there will be only one unique solution.

Example:
Given a Sudoku puzzle:
[
[0,0,9,7,4,8,0,0,0],
[7,0,0,0,0,0,0,0,0],
[0,2,0,1,0,9,0,0,0],
[0,0,7,0,0,0,2,4,0],
[0,6,4,0,1,0,5,9,0],
[0,9,8,0,0,0,3,0,0],
[0,0,0,8,0,3,0,2,0],
[0,0,0,0,0,0,0,0,6],
[0,0,0,2,7,5,9,0,0]
]

Return its solution:
[
[5,1,9,7,4,8,6,3,2],
[7,8,3,6,5,2,4,1,9],
[4,2,6,1,3,9,8,7,5],
[3,5,7,9,8,6,2,4,1],
[2,6,4,3,1,7,5,9,8],
[1,9,8,5,2,4,3,6,7],
[9,7,5,8,6,3,1,2,4],
[8,3,2,4,9,1,7,5,6],
[6,4,1,2,7,5,9,8,3]
]
*/


export class Solution {
  /**
   * @param board: the sudoku puzzle (9x9 array with 0 as empty)
   * @return: nothing (board is solved in-place)
   */
  solveSudoku(board) {
    /**
     * Backtracking: try to fill the board step by step.
     * If we fill all cells correctly → return true.
     * If we hit a dead end → return false (and undo).
     */
    function backtrack() {
      // 1. Find the next empty cell (with value 0)
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] === 0) {
            // 2. Try all digits 1 to 9
            for (let d = 1; d <= 9; d++) {
              if (isValid(board, r, c, d)) {
                // Place digit d at (r, c)
                board[r][c] = d;

                /**
                 * Recursive step:
                 * - Call backtrack() to solve the rest of the board.
                 * - If it returns true, it means the board is fully solved
                 *   with this choice, so we can stop and return true.
                 */
                if (backtrack()) return true;

                /**
                 * If backtrack() returned false, it means putting d here
                 * eventually led to a contradiction later.
                 * → Undo our choice (set back to 0) and try the next digit.
                 */
                board[r][c] = 0;
              }
            }

            /**
             * If we tried all digits (1–9) and none worked,
             * then this cell (r, c) cannot be filled.
             * → Return false to backtrack to the previous cell.
             */
            return false;
          }
        }
      }

      // 3. If we scanned all cells and found no empty ones → puzzle solved
      return true;
    }

    /**
     * Check if placing digit d at (r, c) is valid:
     *  - not already in the same row
     *  - not already in the same column
     *  - not already in the same 3x3 box
     */
    function isValid(board, r, c, d) {
      // Row + Column checks
      for (let i = 0; i < 9; i++) {
        if (board[r][i] === d) return false; // duplicate in the row
        if (board[i][c] === d) return false; // duplicate in the column
      }

      // 3x3 box check
      const boxRowStart = Math.floor(r / 3) * 3;
      const boxColStart = Math.floor(c / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[boxRowStart + i][boxColStart + j] === d) {
            return false; // duplicate in the box
          }
        }
      }

      return true; // No conflicts → safe to place
    }

    // Start the solving process
    backtrack();
  }
}
