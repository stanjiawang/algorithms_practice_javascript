/*
https://www.lintcode.com/problem/71/?fromId=213&_from=collection

Binary Tree Zigzag Level Order Traversal

Given a binary tree, return the zigzag level order traversal of its nodes' values.
(ie, from left to right, then right to left for the next level and alternate between).

Input:
tree = {1,2,3}
Output:
[[1],[3,2]]
Explanation:
    1
   / \
  2   3
it will be serialized {1,2,3}

Example 2:
Input:
tree = {3,9,20,#,#,15,7}
Output:
[[3],[20,9],[15,7]]
Explanation:
    3
   / \
  9  20
    /  \
   15   7
it will be serialized {3,9,20,#,#,15,7}
*/

import {
  TreeNode,
} from '/opt/node/lib/lintcode/index.js';

/**
 * Definition of TreeNode:
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
   * @return {number[][]} - Zigzag level order traversal of node values
   */
  zigzagLevelOrder(root) {
    // ✅ Edge case: empty tree
    if (!root) return [];

    const result = [];              // Final output [[level1], [level2], ...]
    const queue = [root];           // Queue for BFS (FIFO)
    let leftToRight = true;         // Direction flag for each level

    // 🔁 Standard BFS loop — process level by level
    while (queue.length > 0) {
      const levelSize = queue.length;  // Number of nodes in current level
      const levelNodes = [];           // Store values for this level

      // Traverse one level
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();    // Dequeue one node

        // Insert node value based on direction
        if (leftToRight) {
          levelNodes.push(node.val);   // Left → Right
        } else {
          levelNodes.unshift(node.val); // Right → Left
        }

        // Enqueue children for next level
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      // Add the current level to result
      result.push(levelNodes);

      // 🔄 Flip direction for the next level
      leftToRight = !leftToRight;
    }

    return result;
  }
}


/*
| Complexity     | Explanation                                                                |
| -------------- | -------------------------------------------------------------------------- |
| **Time O(N)**  | Each node is visited exactly once.                                         |
| **Space O(N)** | Queue stores up to one level of nodes at a time (worst case N / 2 ≈ O(N)). |
*/
