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

/*
3) Plug-in Feasibility Snippets for Common Variants
Use the Universal Template and replace isFeasible(mid) with the right check.

A) Koko Eating Bananas / Minimum Speed to Finish in H Hours
Decision: is speed v enough to finish within H hours?
*/
function canFinishAtSpeed(piles, H, v) {
  var hours = 0;
  for (var i = 0; i < piles.length; i++) {
    hours += Math.floor((piles[i] + v - 1) / v); // ceil(pile / v)
    if (hours > H) return false;
  }
  return true;
}
// bounds: low=1, high=max(piles)

/*
B) Ship Packages Within D Days (same as contiguous groups)
*/
function canShipWithinDays(weights, D, capacity) {
  var days = 1, load = 0;
  for (var i = 0; i < weights.length; i++) {
    if (load + weights[i] > capacity) {
      days += 1;
      load = 0;
      if (days > D) return false;
    }
    load += weights[i];
  }
  return true;
}
// bounds: low=max(weights), high=sum(weights)

/*
C) Minimum Time to Make m Bouquets (given bloomDay, need m bouquets of size k)
*/
function canMakeByDay(bloomDay, m, k, day) {
  var bouquets = 0, run = 0;
  for (var i = 0; i < bloomDay.length; i++) {
    if (bloomDay[i] <= day) {
      run += 1;
      if (run === k) { bouquets += 1; run = 0; }
    } else {
      run = 0;
    }
    if (bouquets >= m) return true;
  }
  return false;
}
// bounds: low=min(bloomDay), high=max(bloomDay)

/*
D) Minimize Max Distance to Gas Station (can insert up to K stations)
Decision: is max gap d achievable with ≤ K new stations?
*/
function canLimitMaxGap(positions, K, d) {
  var need = 0;
  for (var i = 1; i < positions.length; i++) {
    var gap = positions[i] - positions[i - 1];
    // stations needed to break gap into segments each ≤ d
    need += Math.floor((gap - 1) / d); // equivalent to ceil(gap/d) - 1
    if (need > K) return false;
  }
  return true;
}
// bounds: low=1 (or a small epsilon if using floats), high=max gap
// If problem uses real numbers, run binary search for a fixed iterations or until precision reached.

/*
E) Cut Ropes to Get at Least K Pieces of Length L (floating or integer)
*/
function canCutAtLeastK(lengths, K, L) {
  var count = 0;
  for (var i = 0; i < lengths.length; i++) {
    count += Math.floor(lengths[i] / L);
    if (count >= K) return true;
  }
  return false;
}
// bounds: low=0+epsilon, high=max(lengths); use float binary search with precision.




