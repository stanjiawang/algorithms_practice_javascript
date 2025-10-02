// 1) One-Dimensional Prefix Sum (fast range sum queries)
/**
 * Build a 1D prefix sum array.
 *
 * Convention:
 * - prefix has length n + 1
 * - prefix[0] = 0 (sum of "zero elements")
 * - prefix[i] = a[0] + a[1] + ... + a[i - 1]  (note the i - 1)
 *
 * Why length n + 1?
 * - It eliminates edge cases for l = 0 when querying range sums.
 * - With this, sum(l..r) = prefix[r + 1] - prefix[l] always works.
 *
 * Example:
 *   a      = [2,  -3,  5]
 *   prefix = [0,   2, -1, 4]
 *   sum(0..2) = prefix[3] - prefix[0] = 4 - 0 = 4
 *   sum(1..2) = prefix[3] - prefix[1] = 4 - 2 = 2
 */
function buildPrefix(a) {
  const n = a.length;
  const prefix = Array(n + 1).fill(0);

  // prefix[i] accumulates sum of first i elements (a[0..i-1])
  for (let i = 1; i <= n; i++) {
    // Add the i-1'th element to previous prefix
    prefix[i] = prefix[i - 1] + a[i - 1];
  }
  return prefix;
}

/**
 * Compute range sum a[l] + ... + a[r], 0-based, inclusive.
 *
 * Using the "shifted" prefix definition:
 *   sum(l..r) = prefix[r + 1] - prefix[l]
 *
 * Why r + 1?
 * - prefix[i] stores sum of first i elements (exclusive on the right).
 * - So "up to r" means "first r+1 elements".
 */
function rangeSum(prefix, l, r) {
  // Caller should ensure 0 <= l <= r < n
  return prefix[r + 1] - prefix[l];
}

// 2) Count Subarrays with Sum = Target (works with negatives)
// Technique: Prefix sum + frequency map
// Key idea: For each position r, subarrays ending at r with sum target correspond to earlier prefixes prefix[l] = prefix[r+1] - target.
/**
 * Count the number of subarrays whose sum equals 'target'.
 *
 * Works for any integers (including negatives), because we do NOT rely on a sliding window.
 * We use a hashmap to remember how many times each prefix sum has occurred so far.
 *
 * Definitions:
 *   prefix = running sum of a[0..i]
 *   For subarray a[l..r], sum = prefix[r] - prefix[l - 1]
 *   Rearranged: prefix[l - 1] = prefix[r] - target
 *
 * Algorithm:
 * - Maintain 'prefix' while scanning left to right.
 * - Maintain 'freq[prefixValue]' = how many times we've seen this prefix value.
 * - For current 'prefix', the number of valid subarrays ending here is
 *     freq.get(prefix - target)
 *   because each occurrence of 'prefix - target' as a previous prefix gives one subarray that sums to target.
 *
 * Initialization:
 * - freq.set(0, 1) meaning "empty prefix" exists once.
 *   This handles subarrays that begin at index 0 (l = 0).
 *
 * Complexity:
 * - Time: O(n)
 * - Space: O(n) in worst case for the map
 */
function countSubarraysEqualToTarget(a, target) {
  let ans = 0;
  let prefix = 0;
  const freq = new Map();

  // Base case: one way to have sum = 0 before we start (empty prefix)
  freq.set(0, 1);

  for (const x of a) {
    // Extend the running prefix sum with the current element
    prefix += x;

    // We need earlier prefix values equal to (prefix - target).
    // Each occurrence of (prefix - target) defines a valid subarray ending here.
    const need = prefix - target;
    if (freq.has(need)) {
      ans += freq.get(need);
    }

    // Record that we've now seen 'prefix' one more time
    freq.set(prefix, (freq.get(prefix) || 0) + 1);
  }

  return ans;
}

/* Quick sanity check in comments:
   a = [1, 0, 1, 0, 1], target = 2
   Valid subarrays: [1,0,1] at (0..2), [1,0,1] at (2..4), [0,1,0,1] at (1..4), [1,0,1] at (0..3?) etc.
   The map-based approach enumerates them all in O(n) time. */

// 3) Two-Dimensional Prefix Sum (matrix rectangle queries)

// Technique: 2D prefix array with an extra top row and left column for clean boundaries.
// Key formula: sum(r1..r2, c1..c2) = A - B - C + D
// A = prefix[r2+1][c2+1] (full area up to bottom-right corner)
// B = prefix[r1][c2+1] (remove rows above the rectangle)
// C = prefix[r2+1][c1] (remove columns to the left)
// D = prefix[r1][c1] (add back overlap removed twice)
/**
 * Build 2D prefix sums.
 *
 * Layout:
 * - prefix has size (m + 1) x (n + 1) so we can index cleanly.
 * - prefix[i][j] stores sum of submatrix from (0,0) to (i-1, j-1), inclusive.
 *
 * Recurrence:
 * prefix[i][j] =
 *    prefix[i-1][j]   (everything above)
 *  + prefix[i][j-1]   (everything left)
 *  - prefix[i-1][j-1] (overlap added twice, subtract once)
 *  + mat[i-1][j-1]    (current cell)
 */
function buildPrefix2D(mat) {
  const m = mat.length;
  const n = mat[0].length;
  const prefix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      prefix[i][j] =
        prefix[i - 1][j] +
        prefix[i][j - 1] -
        prefix[i - 1][j - 1] +
        mat[i - 1][j - 1];
    }
  }
  return prefix;
}

/**
 * Query the sum of a sub-rectangle in O(1):
 *   top-left  = (r1, c1)
 *   bottom-right = (r2, c2)
 * All indices are 0-based and inclusive.
 *
 * Convert to 1-based for the prefix table by adding +1 to both coordinates.
 * Then apply the inclusion-exclusion formula:
 *   S = A - B - C + D
 *   A = prefix[R2][C2]
 *   B = prefix[R1-1][C2]
 *   C = prefix[R2][C1-1]
 *   D = prefix[R1-1][C1-1]
 */
function rectSum(prefix, r1, c1, r2, c2) {
  const R1 = r1 + 1, C1 = c1 + 1;
  const R2 = r2 + 1, C2 = c2 + 1;

  const A = prefix[R2][C2];
  const B = prefix[R1 - 1][C2];
  const C = prefix[R2][C1 - 1];
  const D = prefix[R1 - 1][C1 - 1];

  return A - B - C + D;
}

/* Quick sanity check in comments:
   mat = [
     [1, 2, 3],
     [4, 5, 6],
     [7, 8, 9]
   ]
   Sum of rectangle (r1=1,c1=1) to (r2=2,c2=2) = 5 + 6 + 8 + 9 = 28.
   buildPrefix2D(mat) -> use rectSum to verify you get 28. */

// 4) Difference Array (efficient range updates; rebuild via prefix)
// When to use: Many “add val to range [l..r]” operations, followed by one final array.
// Idea: Mark starts and ends in a diff array; reconstruct with one prefix pass.
/**
 * Apply multiple range-add operations and return the final array.
 *
 * Input:
 *   n: length of the array to build (initially zeros)
 *   updates: array of operations, each is { l, r, val } meaning:
 *            "add 'val' to every index i in [l..r]"
 *
 * Method (difference array):
 * - Use 'diff' of length n+1 to mark changes:
 *     diff[l]     += val
 *     diff[r + 1] -= val   (if r + 1 is within array bounds)
 * - After processing all updates, compute the prefix sum of 'diff' to
 *   recover the final array values.
 *
 * Complexity:
 * - Building diff: O(#updates)
 * - Reconstructing array: O(n)
 * - Much faster than applying each update naively in O(n) per update.
 */
function applyRangeAdds(n, updates) {
  const diff = Array(n + 1).fill(0);

  for (const { l, r, val } of updates) {
    diff[l] += val;
    if (r + 1 < n) diff[r + 1] -= val; // guard to avoid out-of-bounds
  }

  // Reconstruct the final array by taking running prefix sum over 'diff'
  const a = Array(n).fill(0);
  let run = 0;
  for (let i = 0; i < n; i++) {
    run += diff[i]; // accumulate all increments that affect index i
    a[i] = run;
  }
  return a;
}

/* Quick sanity check in comments:
   n = 5, updates = [{l:1,r:3,val:2}, {l:0,r:0,val:5}]
   Start: [0,0,0,0,0]
   After ops: [5,2,2,2,0]
   Explanation:
     - Add 2 to indices 1..3 -> [0,2,2,2,0]
     - Add 5 to index 0      -> [5,2,2,2,0]
   The diff trick computes this in O(n + #updates). */

/*
Mini Cheat-Sheet (to memorize fast)
1D prefix: prefix[0]=0, prefix[i+1]=prefix[i]+a[i], sum(l..r)=prefix[r+1]-prefix[l]
Subarray = target: maintain prefix; add freq[prefix - target] to answer; seed freq[0]=1
2D prefix: use extra row/col; sum = A - B - C + D
Difference array: mark diff[l]+=val, diff[r+1]-=val; rebuild via prefix once
*/
