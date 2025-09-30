/*
https://www.lintcode.com/course/98/learn/389?chapterId=519&sectionId=3932&ac=true

Valid Sudoku

Determine whether a Sudoku is valid.
The Sudoku board could be partially filled, where empty cells are filled with the character ..

Example 1:
Input:
["53..7....","6..195...",".98....6.","8...6...3","4..8.3..1","7...2...6",".6....28.","...419..5","....8..79"]
Output: true
Explanation: 
The sudoku is look like this. It's vaild.

Example 2:
Input:
["53..75...","6..195...",".98....6.","8...6...3","4..8.3..1","7...2...6",".6....28.","...419..5","....8..79"]
Output: false
Explanation: 
The sudoku is look like this. It's invaild because there are two '5' in the first row and the sixth line.
*/

export class Solution {
  /**
   * @param board: 9x9, either string[] (each length 9) or char[][]
   * @return {boolean}
   */
  isValidSudoku(board) {
    // ---- Input sanity check ----
    // Must be an array of length 9
    if (!Array.isArray(board) || board.length !== 9) return false;
    for (const row of board) {
      // Each row must be either a string of length 9 or an array of length 9
      if (!(Array.isArray(row) || typeof row === 'string')) return false;
      if (row.length !== 9) return false;
    }

    // ---- Data structures to track seen digits ----
    // rows[i]  = Set of digits already seen in row i
    // cols[j]  = Set of digits already seen in column j
    // boxes[k] = Set of digits already seen in 3×3 sub-box k
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());

    // Helper: check if a character is a valid Sudoku digit '1'..'9'
    const isDigit = ch => ch >= '1' && ch <= '9';

    // ---- Traverse every cell ----
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const ch = board[r][c];

        // Skip anything not a digit ('.', spaces, etc.)
        if (!isDigit(ch)) continue;

        // Compute which box this cell belongs to (0..8)
        // Boxes are numbered left-to-right, top-to-bottom
        const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);

        // If the digit already exists in the row, column, or box → invalid
        if (rows[r].has(ch) || cols[c].has(ch) || boxes[b].has(ch)) {
          return false;
        }

        // Otherwise, record this digit in row, col, and box
        rows[r].add(ch);
        cols[c].add(ch);
        boxes[b].add(ch);
      }
    }

    // No conflicts found → valid Sudoku
    return true;
  }
}
