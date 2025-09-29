/*
https://www.lintcode.com/course/98/learn/33?chapterId=518&sectionId=3928&ac=true

N-Queens

The N-queens puzzle is the problem of placing n queens on an n×n chessboard, and the queens can not attack each other(Any two queens can't be in the same row, column, diagonal line).
Given an integer n, return all distinct solutions to the N-queens puzzle.
Each solution contains a distinct board configuration of the N-queens' placement, where 'Q' and '.' each indicate a queen and an empty space respectively.

Example 1:
Input: n = 1
Output:
"Q"
Explanation:
There is only one solution.

Example 2:
Input: n = 4
Output:
[
  // Solution 1
  [".Q..",
   "...Q",
   "Q...",
   "..Q."
  ],
  // Solution 2
  ["..Q.",
   "Q...",
   "...Q",
   ".Q.."
  ]
]
Explanation:
There are two solutions.
*/

export class Solution {
  /**
   * @param n: The number of queens
   * @return: All distinct solutions
   *          we will sort your return value in output
   */
  solveNQueens(n) {
    // write your code here
    const results = [];
    const board = Array.from({length: n}, () => ".".repeat(n).split(""));

    // const board = [];
    // for (let i = 0; i < n; i++) {
    //     const row = [];
    //     for (let j = 0; j < n; j++) {
    //         row.push("."); // fill this row with dots
    //     }
    //     board.push(row);
    // }


    // Columns and diagonals that are already occupied
    const cols = new Set(); // column index j, is there already a queen in column c?
    const diag1 = new Set(); // r - c (top-left -> bottom-right), is there already a queen on the same ↘ diagonal (r - c)?
    const diag2 = new Set(); // r + c (top-right -> bottom-left), is there already a queen on the same ↙ diagonal (r + c)?

    const backtrack = (row) => {
        if (row === n) {
            // Reached row n -> place n queens validly
            results.push(board.map(rowArr => rowArr.join("")));
            return;
        }

        for (let col = 0; col < n; col++) {
            // Check if placing at (row, col) is safe
            const d1 = row - col;
            const d2 = row + col;
            // When we try to place a queen on row r, column c, we must check:
            // Is there already a queen in column c?
            // Is there already a queen on the same ↘ diagonal (r - c)?
            // Is there already a queen on the same ↙ diagonal (r + c)?
            // If any of these are true, that position is attacked — we cannot place a queen there.
            if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
                continue;
            }

            // Choose
            board[row][col] = "Q";
            cols.add(col);
            // d1 = row - col
            // This uniquely identifies a ↘ diagonal (top-left → bottom-right).
            // All squares on the same ↘ diagonal have the same row - col value.
            // If we place a queen at (0,0), we must block (1,1), (2,2), (3,3)
            // → so we remember d1 = 0 by calling diag1.add(0).
            diag1.add(d1);
            // This uniquely identifies a ↙ diagonal (top-right → bottom-left).
            // All squares on the same ↙ diagonal have the same row + col value.
            // If we place a queen at (0,3), we must block (1,2), (2,1), (3,0)
            // → so we remember d2 = 3 by calling diag2.add(3).
            diag2.add(d2);

            // Explore
            backtrack(row + 1);

            // Un-choose (backtrack)
            board[row][col] = ".";
            cols.delete(col);
            diag1.delete(d1);
            diag2.delete(d2);
        }
    };

    backtrack(0);

    return results;
  }
}

/*
    Think of it as a decision tree:

    Each level = one row
    Each branch = one column choice
    backtrack() sits in between “place” and “remove”:

    for each column:
    choose (place queen)
    backtrack(next row)
    un-choose (remove queen)

    backtrack(0)  ─── row 0
    └── try col 1 → backtrack(1)  ─── row 1
        └── try col 3 → backtrack(2)  ─── row 2
            └── try col 0 → backtrack(3)  ─── row 3
                    └── try col 2 → backtrack(4) ✅ solution found

*/

