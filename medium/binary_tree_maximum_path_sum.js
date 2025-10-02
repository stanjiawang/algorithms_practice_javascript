/*
https://www.lintcode.com/course/90/learn/94?chapterId=469&sectionId=3285&ac=true

Binary Tree Maximum Path Sum

Given a binary tree, find the maximum path sum.
The path may start and end at any node in the tree.
(Path sum is the sum of the weights of nodes on the path between two nodes.)

Example 1:
Input:
tree = {2}
Output: 2
Explanation:
There is only one node 2

Example 2:
Input:
tree = {1,2,3}
Output: 6
Explanation:
As shown in the figure below, the longest path is 2-1-3
      1
     / \
    2   3
    
Example 3:
Input:
tree = {1, 2, 3, 4, 9, 6, #, 1, 3, 4, #, 8, 12, #, 14, #, 3, 6}
Output: 43
Explanation:
As shown in the figure below, the longest path is 14-1-4-2-1-3-6-12
*/

// Definition for a binary tree node
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export class Solution {
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  maxPathSum(root) {
    // Global variable to keep track of the best path sum seen so far
    let best = -Infinity;

    /**
     * DFS helper function
     * @param {TreeNode} node
     * @return {number} max single-branch sum from this node (contribution to parent)
     */
    function dfs(node) {
      if (node === null) return 0;

      // Step 1: Recursively get max contribution from left and right child
      // If the contribution is negative, discard it (choose 0 instead)
      const leftGain = Math.max(0, dfs(node.left));
      const rightGain = Math.max(0, dfs(node.right));

      // Step 2: Update global best
      // The path that passes through this node (may use both children)
      // node.val must be included, plus leftGain and rightGain if they help
      const pathThroughNode = node.val + leftGain + rightGain;
      best = Math.max(best, pathThroughNode);

      // Step 3: Return the max single-branch path (node + one side) to parent
      // Parent can only take one side (avoid "Y" shape paths)
      return node.val + Math.max(leftGain, rightGain);
    }

    dfs(root);
    return best;
  }
}


// Interview Template
function maxPathSum(root) {
  let best = -Infinity;

  function dfs(node) {
    if (!node) return 0;

    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));

    best = Math.max(best, node.val + left + right);

    return node.val + Math.max(left, right);
  }

  dfs(root);
  return best;
}

