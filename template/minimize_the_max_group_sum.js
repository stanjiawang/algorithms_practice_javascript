/*
1) Universal Template: Binary Search on the Answer
When to use
* You can guess an answer X and there is a monotonic feasibility test:
* If X works, any larger X also works (or vice-versa).

Steps
1. Define search bounds [low, high].
2. Write isFeasible(mid) to check if mid satisfies the constraint.
3. Binary search the minimal feasible mid (or maximal infeasible, depending on problem).
*/

function binarySearchAnswer(low, high, isFeasible) {
  while (low < high) {
    var mid = low + Math.floor((high - low) / 2);
    if (isFeasible(mid)) {
      high = mid;          // mid works → try smaller
    } else {
      low = mid + 1;       // mid too small → go bigger
    }
  }
  return low; // == high
}

/*
2) Template: Split into ≤ k contiguous groups (minimize the max group sum)
Applies to
* Copy Books / Split Array Largest Sum (LC 410)
* Ship Packages Within D Days (same feasibility)

Idea
1. Candidate limit L = maximum pages/weight one person/day may handle.
2. Greedily scan and start a new group whenever adding the next item would exceed L.
3. Count groups; feasible if groups ≤ k.
*/
function minLargestGroupSum(nums, k) {
  // 1) bounds
  var n = nums.length;
  if (n === 0) return 0;

  var low = 0;      // at least the largest single element
  var high = 0;     // at most the total sum
  for (var i = 0; i < n; i++) {
    if (nums[i] > low) low = nums[i];
    high += nums[i];
  }

  // 2) feasibility: can we split into ≤ k groups with max sum ≤ limit?
  function canSplit(limit) {
    var groups = 1;
    var current = 0;
    for (var i = 0; i < n; i++) {
      if (current + nums[i] > limit) {
        groups += 1;
        current = 0;
        if (groups > k) return false; // early exit
      }
      current += nums[i];
    }
    return true;
  }

  // 3) binary search the minimal feasible limit
  while (low < high) {
    var mid = low + Math.floor((high - low) / 2);
    if (canSplit(mid)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}
