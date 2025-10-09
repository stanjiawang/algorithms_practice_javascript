/*
https://www.lintcode.com/problem/69/?fromId=213&_from=collection

Binary Tree Level Order Traversal

Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).)

The first data is the root node, followed by the value of the left and right son nodes, and "#" indicates that there is no child node.
The number of nodes does not exceed 20.
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
   * @param root: A Tree
   * @return: Level order a list of lists of integer
   */
  levelOrder(root) {
    // write your code here
    if (!root) {
      return [];
    }

    const result = [];
    const queue = [];

    queue.push(root);

    while (queue.length !== 0) {
      const level = [];
      let size = queue.length;

      for (let i = 0; i < size; i++) {
        let node = queue.shift();

        level.push(node.val);

        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
      result.push(level);
    }

    return result;
  }
}
