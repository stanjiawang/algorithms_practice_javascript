/*
https://www.lintcode.com/problem/97/?fromId=213&_from=collection

Maximum Depth of Binary Tree

Given a binary tree, find its maximum depth.
The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
*/

import {
  TreeNode,
} from '/opt/node/lib/lintcode/index.js';

/**
 * Definition of TreeNode:
 * class TreeNode {
 *   constructor(val, left=null, right=null) {
 *     this.val = val;
 *     this.left = left;
 *     this.right = right;
 *   }
 * }
 */

export class Solution {
  /**
   * @param root: The root of binary tree.
   * @return: An integer
   */
  maxDepth(root) {
    // write your code here
    if (!root) {
      return 0;
    }

    return Math.max(this.maxDepth(root.left), this.maxDepth(root.right)) + 1;
  }
}
