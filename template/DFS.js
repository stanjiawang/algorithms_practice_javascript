/*
DFS Template (Recursion / Stack)

Depth-First Search explores deeply along one path, then backtracks.

When to use DFS:
1. Explore entire connected components (e.g., number of islands).
2. Backtracking problems (e.g., N-Queens, Sudoku, permutations).
3. Not guaranteed to give shortest path.

If the problem asks for minimum steps / shortest path, use BFS.
If the problem asks for exploring all paths / connectivity, use DFS.
Multi-source BFS is just BFS where you enqueue all starting points at on
*/

function dfs(grid, r, c, visited) {
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

  // Out of bounds / already visited check
  if (r < 0 || r >= m || c < 0 || c >= n) return;
  if (visited[r][c]) return;

  visited[r][c] = true;

  // ---- Put your logic here ----
  // e.g., mark cell, count island size, color cell, etc.

  for (const [dr, dc] of dirs) {
    dfs(grid, r + dr, c + dc, visited);
  }
}

// DFS Unified Framework (JavaScript)
/**
 * General DFS (Depth First Search) / Backtracking Template
 * 
 * @param {number} start - where to start the loop (important for combination/subset problems)
 * @param {Array} path   - current partial solution (we build this step by step)
 */
function dfs(start, path) {
    // 1. Define the base case (exit condition)
    if (exitCondition(path)) {
        results.push([...path]); // record a copy of the path
        return;
    }

    // 2. Iterate through possible choices
    for (let i = start; i < nums.length; i++) {
        if (visited[i]) continue; // optional: used in permutation problems

        // Make a choice
        path.push(nums[i]);
        visited[i] = true; // optional: mark as used

        // Recurse
        dfs(nextStart(i), path);

        // Undo the choice (backtracking)
        path.pop();
        visited[i] = false; // optional: reset state
    }
}

/*
Key concepts:
exitCondition(path) → defines when we found a solution.
start vs i+1 vs 0 → controls whether we allow reusing elements or not.
visited[] → prevents reusing the same element in permutation problems.
*/

// 1. Combination (Order doesn’t matter)
function combine(nums, k) {
    const results = [];

    function dfs(start, path) {
        // Exit condition: path has k elements
        if (path.length === k) {
            results.push([...path]);
            return;
        }

        // Iterate choices starting from "start" to avoid duplicates
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);    // choose nums[i]
            dfs(i + 1, path);      // move to next index (i+1 ensures no reuse)
            path.pop();            // undo choice
        }
    }

    dfs(0, []);
    return results;
}

// Example: combine([1,2,3,4], 2)
// Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]

// 2. Permutation (Order matters)
function permute(nums) {
    const results = [];
    const visited = new Array(nums.length).fill(false);

    function dfs(path) {
        // Exit condition: use all numbers
        if (path.length === nums.length) {
            results.push([...path]);
            return;
        }

        // Iterate through all numbers
        for (let i = 0; i < nums.length; i++) {
            if (visited[i]) continue; // skip already used numbers

            path.push(nums[i]);       // choose nums[i]
            visited[i] = true;        // mark as used

            dfs(path);                // continue recursion

            path.pop();               // undo choice
            visited[i] = false;       // unmark
        }
    }

    dfs([]);
    return results;
}

// Example: permute([1,2,3])
// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 3. Subset (Every element has two choices: take or not take)
function subsets(nums) {
    const results = [];

    function dfs(start, path) {
        results.push([...path]); // record current subset

        // Explore further elements
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);   // choose nums[i]
            dfs(i + 1, path);     // only move forward (avoid duplicates)
            path.pop();           // undo choice
        }
    }

    dfs(0, []);
    return results;
}

// Example: subsets([1,2,3])
// Output: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]

/*
Combination → Use start index, recursion with dfs(i+1, path)
Because order doesn’t matter.
Example: lottery numbers.

Permutation → Use visited[] array
Because order matters.
Example: all ways to arrange students in a line.

Subset → Always record current path before deeper recursion
Because every node along the DFS path is a valid solution.
Example: power set (all possible subsets).
*/

/*
This way you only memorize one framework.
At interview time, just adjust:

Exit condition
Loop start (i vs i+1)
Whether you need visited[]
*/

