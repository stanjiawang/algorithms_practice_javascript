/*
Maximum Subtree Sum

Given the root of a binary tree, find the maximum sum of all values in any subtree of the tree.
A subtree of a node is defined as that node plus all of its descendants.

         1
       /   \
      -2    3
     / \   / \
    4  5 -6  2

Subtree at node -2: sum = (-2) + 4 + 5 = 7
Subtree at node 3: sum = 3 + (-6) + 2 = -1
Subtree at node 1 (entire tree): sum = 1 + (-2) + 3 + 4 + 5 + (-6) + 2 = 7
✅ Answer: Maximum subtree sum = 7
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *   constructor(val, left = null, right = null) {
 *     this.val = val;
 *     this.left = left;
 *     this.right = right;
 *   }
 * }
 */

export class Solution {
  /**
   * @param {TreeNode} root - Root node of the binary tree
   * @return {number} Maximum subtree sum
   */
  maxSubtreeSum(root) {
    // Initialize result variable to track the maximum sum
    let maxSum = -Infinity;

    /**
     * Depth-first search helper
     * @param {TreeNode} node
     * @return {number} Sum of this subtree
     */
    const dfs = (node) => {
      if (!node) return 0; // Base case: null node contributes 0

      // Recursively compute left and right subtree sums
      const leftSum = dfs(node.left);
      const rightSum = dfs(node.right);

      // Total sum of this subtree = left + right + node value
      const currentSum = node.val + leftSum + rightSum;

      // Update global maximum if current subtree is larger
      maxSum = Math.max(maxSum, currentSum);

      // Return current subtree sum to parent
      return currentSum;
    };

    dfs(root); // Start DFS from root
    return maxSum;
  }
}
