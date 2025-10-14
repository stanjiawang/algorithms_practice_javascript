/*
https://www.lintcode.com/problem/187/?fromId=213&_from=collection

Gas Station

There are N gas stations along a circular route, where the amount of gas at station i is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from station i to its next station (i+1).
You begin the journey with an empty tank at one of the gas stations.

Return the starting gas station's index if you can travel around the circuit once, otherwise return -1.

The solution is guaranteed to be unique.

Input:gas[i]=[1,1,3,1],cost[i]=[2,2,1,1]
Output:2

Input:gas[i]=[1,1,3,1],cost[i]=[2,2,10,1]
Output:-1
*/

export class Solution {
  /**
   * @param {number[]} gas  - gas[i]: fuel available at station i
   * @param {number[]} cost - cost[i]: fuel needed to go from i -> i+1
   * @return {number} index of starting station, or -1 if impossible
   */
  canCompleteCircuit(gas, cost) {
    const n = gas.length;
    if (n === 0 || n !== cost.length) return -1;

    let start = 0;  // candidate start index
    let tank = 0;   // current fuel from `start` to current i
    let total = 0;  // global feasibility: sum of (gas[i] - cost[i])

    for (let i = 0; i < n; i++) {
      const diff = gas[i] - cost[i];
      tank += diff;   // simulate driving from start -> i
      total += diff;  // track global net fuel

      // If we can't reach i+1 from current start, the whole [start..i] segment fails.
      // Next possible start is i + 1; reset local tank.
      if (tank < 0) {
        start = i + 1;
        tank = 0;
      }
    }

    // If total fuel is less than total cost, no start works.
    return total >= 0 ? start : -1;
  }
}

// Time: O(n) single pass. Space: O(1).

