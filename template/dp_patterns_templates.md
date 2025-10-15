# Dynamic Programming Patterns and Templates

## Table of Contents

1.  [Basic 1D DP Template](#1-basic-1d-dp-template)
2.  [Knapsack Problems](#2-knapsack-problems)
    -   [0/1 Knapsack](#21-01-knapsack)
    -   [Unbounded Knapsack (Backpack
        III)](#22-unbounded-knapsack-backpack-iii)
    -   [Multiple Knapsack](#23-multiple-knapsack)
3.  [Sequence Problems](#3-sequence-problems)
    -   [Longest Increasing Subsequence
        (LIS)](#31-longest-increasing-subsequence-lis)
    -   [Longest Common Subsequence
        (LCS)](#32-longest-common-subsequence-lcs)
    -   [Longest Common Substring](#33-longest-common-substring)
4.  [Interval DP](#4-interval-dp)
5.  [Stock Trading DP](#5-stock-trading-dp)
6.  [Grid / Path DP](#6-grid--path-dp)
7.  [Game Theory DP](#7-game-theory-dp)
8.  [Summary Table](#8-summary-table)

------------------------------------------------------------------------

## 1. Basic 1D DP Template

``` js
// Step 1. Define dp[i]: what does dp[i] represent?
// Example: dp[i] = maximum value up to index i, or minimum cost, etc.

// Step 2. Initialize base cases clearly
const dp = new Array(n + 1).fill(0);  // default initial value
dp[0] = 0;                            // base condition (e.g., empty state)

// Step 3. Define the state transition relation
// Example: dp[i] = Math.max(dp[i - 1], dp[i - 2] + something);
// Meaning: current state depends on previous states

// Step 4. Loop order depends on the problem type (forward or backward)

// Step 5. Return the result
return dp[n];
```

------------------------------------------------------------------------

## 2. Knapsack Problems

### 2.1 0/1 Knapsack

Each item can be used **once**.

``` js
for (let i = 0; i < n; i++) {
  for (let j = m; j >= A[i]; j--) { // iterate backward to avoid reusing the same item
    dp[j] = Math.max(dp[j], dp[j - A[i]] + V[i]);
  }
}
// dp[j] means: max value achievable with capacity j
// State transition: take item i (dp[j - A[i]] + V[i]) or skip it (dp[j])
return dp[m];
```

**Time Complexity:** O(n \* m)\
**Space Complexity:** O(m)

------------------------------------------------------------------------

### 2.2 Unbounded Knapsack (Backpack III)

Each item can be used **infinite times**.

``` js
for (let i = 0; i < n; i++) {
  for (let j = A[i]; j <= m; j++) { // iterate forward to allow reuse
    dp[j] = Math.max(dp[j], dp[j - A[i]] + V[i]);
  }
}
// Initialization: dp[0] = 0, others = 0 (no items, no value)
// Transition: can use item i repeatedly since we go forward
return dp[m];
```

**Time Complexity:** O(n \* m)\
**Space Complexity:** O(m)

------------------------------------------------------------------------

### 2.3 Multiple Knapsack

Each item can be used a **limited number of times**.

``` js
for (let i = 0; i < n; i++) {
  for (let k = 1; k <= count[i]; k++) { // iterate through available copies
    for (let j = m; j >= A[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - A[i]] + V[i]);
    }
  }
}
return dp[m];
```

------------------------------------------------------------------------

## 3. Sequence Problems

### 3.1 Longest Increasing Subsequence (LIS)

``` js
const dp = new Array(n).fill(1); // dp[i] = length of LIS ending at index i

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (nums[i] > nums[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1); // extend LIS ending at j
    }
  }
}
return Math.max(...dp);
```

------------------------------------------------------------------------

### 3.2 Longest Common Subsequence (LCS)

``` js
const dp = Array.from({ length: n1 + 1 }, () => Array(n2 + 1).fill(0));

for (let i = 1; i <= n1; i++) {
  for (let j = 1; j <= n2; j++) {
    if (s1[i - 1] === s2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1; // match current chars
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // skip one char
    }
  }
}
return dp[n1][n2];
```

------------------------------------------------------------------------

### 3.3 Longest Common Substring

``` js
let res = 0;
const dp = Array.from({ length: n1 + 1 }, () => Array(n2 + 1).fill(0));

for (let i = 1; i <= n1; i++) {
  for (let j = 1; j <= n2; j++) {
    if (s1[i - 1] === s2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1; // extend current substring
      res = Math.max(res, dp[i][j]);
    }
  }
}
return res;
```

------------------------------------------------------------------------

## 4. Interval DP

Used for problems involving intervals (e.g., merging stones, burst
balloons).

``` js
// dp[i][j] = optimal result for subinterval [i, j]

for (let len = 2; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    dp[i][j] = Infinity;
    for (let k = i; k < j; k++) {
      dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + cost);
    }
  }
}
```

------------------------------------------------------------------------

## 5. Stock Trading DP

### Single Transaction

``` js
let minPrice = Infinity;
let maxProfit = 0;

for (let price of prices) {
  minPrice = Math.min(minPrice, price);
  maxProfit = Math.max(maxProfit, price - minPrice); // state transition
}
return maxProfit;
```

------------------------------------------------------------------------

### Infinite Transactions

``` js
let profit = 0;
for (let i = 1; i < n; i++) {
  if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1]; // add every profit
}
return profit;
```

------------------------------------------------------------------------

### K Transactions

``` js
const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0));
for (let t = 1; t <= k; t++) {
  let maxDiff = -prices[0];
  for (let i = 1; i < n; i++) {
    dp[t][i] = Math.max(dp[t][i - 1], prices[i] + maxDiff); // either sell or skip
    maxDiff = Math.max(maxDiff, dp[t - 1][i] - prices[i]);  // prepare for next buy
  }
}
return dp[k][n - 1];
```

------------------------------------------------------------------------

## 6. Grid / Path DP

### Minimum Path Sum

``` js
const dp = Array.from({ length: m }, () => Array(n).fill(0));
dp[0][0] = grid[0][0];

// initialize first row & column
for (let i = 1; i < m; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
for (let j = 1; j < n; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];

// state transition: from top or left
for (let i = 1; i < m; i++) {
  for (let j = 1; j < n; j++) {
    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
  }
}
return dp[m - 1][n - 1];
```

------------------------------------------------------------------------

## 7. Game Theory DP

### Coins in a Line

``` js
const dp = new Array(n + 1).fill(false);
dp[1] = true;
dp[2] = true;

for (let i = 3; i <= n; i++) {
  dp[i] = !(dp[i - 1] && dp[i - 2]); // lose only if both next states are losing
}
return dp[n];
```

------------------------------------------------------------------------

## 8. Summary Table

  Type                 Characteristic            State Definition    Loop Direction
  -------------------- ------------------------- ------------------- -------------------
  0/1 Knapsack         Use once                  dp\[j\]             Backward
  Unbounded Knapsack   Unlimited                 dp\[j\]             Forward
  Sequence DP          Subsequence / Substring   dp\[i\]\[j\]        Double Loop
  Interval DP          Subintervals              dp\[i\]\[j\]        Increasing length
  Stock DP             Trading states            dp\[i\]\[k\]\[h\]   Forward
  Grid DP              2D paths                  dp\[i\]\[j\]        Forward
  Game DP              Win/Lose states           dp\[i\]             Forward
