/*
Today, there are N interviewees who need to be interviewed. The company has arranged two interview cities A and B. Each interviewee has a cost A to City A and a cost B to City B. The company needs to divide the interviewees into two groups with same size to minimize the total cost.

Input: cost = [[5,4],[3,6],[1,8],[3,9]]
Output: 14
Explanation: 
The first and the second goes to city B,the others go to city A.
*/

export class Solution {
  /**
   * @param cost: The cost of each interviewer
   * @return: The total cost of all the interviewers.
   */
  totalCost(cost) {
    // write your code here
    if (!Array.isArray(cost) || cost.length % 2 !== 0) {
      return 0;
    }

    cost.sort((p, q) => (p[0] - p[1]) - (q[0] - q[1]));

    const n = cost.length / 2;

    let total = 0;

    for (let i = 0; i < n; i++) {
      total += cost[i][0];
    }

    for (let i = n; i < 2 * n; i++) {
      total += cost[i][1];
    }

    return total;
  }
}
