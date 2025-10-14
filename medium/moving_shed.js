/*
https://www.lintcode.com/problem/275/?fromId=213&_from=collection

Moving shed

Given an integer array stops[] of length n, representing the positions of cars on a a line (sorted or unsorted).
You need to build a shed (a “moving shed”) of width x.
The shed can slide (move) along the line between the leftmost car and the rightmost car (i.e. its left end can vary),
but the constraint is that no matter how you slide the shed over that interval,
it must always cover at least k cars.

Return the smallest possible width x that satisfies this requirement.

Input:
stops = [1, 2, 8, 12, 14]
k = 3

Output:
10

Explanation:
Sort stops: [1, 2, 8, 12, 14]
We check all contiguous groups of size 3:
- [1, 2, 8] → span = 8 – 1 = 7
- [2, 8, 12] → span = 12 – 2 = 10
- [8, 12, 14] → span = 14 – 8 = 6
The maximum of these spans is 10, thus the shed width must be at least 10.
*/

export class Solution {
  /**
   * @param {number[]} stops - The positions of the parked cars
   * @param {number} k - The minimum number of cars that must be covered
   * @return {number} - The minimum shed length required
   */
  calculate(stops, k) {
    // ✅ Step 1: Edge cases
    if (!stops || stops.length === 0 || k <= 0) return 0;

    // ✅ Step 2: Sort car positions
    // Sorting ensures the cars are ordered along the line
    stops.sort((a, b) => a - b);

    const n = stops.length;

    // ✅ Step 3: If we must cover all cars,
    // the shed length is simply the distance between the farthest two cars
    if (k === n) {
      return stops[n - 1] - stops[0];
    }

    // ✅ Step 4: Initialize the maximum span (the widest k-car group)
    let maxSpan = 0;

    // ✅ Step 5: Use a sliding window of size k
    // For each group of k consecutive cars,
    // calculate how wide that group is (rightmost - leftmost)
    for (let i = 0; i + k - 1 < n; i++) {
      const span = stops[i + k - 1] - stops[i];
      maxSpan = Math.max(maxSpan, span);
    }

    // ✅ Step 6: The maximum span among all windows
    // is the minimum shed length required
    return maxSpan;
  }
}

/*
| Step      | Operation      | Time           | Space    | Note          |
| --------- | -------------- | -------------- | -------- | ------------- |
| 1         | Sorting        | O(n log n)     | O(1)     | Built-in sort |
| 2         | Sliding window | O(n)           | O(1)     | Single pass   |
| **Total** |                | **O(n log n)** | **O(1)** | Efficient     |
*/
