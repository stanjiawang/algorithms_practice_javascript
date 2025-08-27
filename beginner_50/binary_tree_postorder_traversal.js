/*
https://www.lintcode.com/problem/68

Binary Tree Postorder Traversal

Given a binary tree, return the postorder traversal of its nodes’ values.

Example 1:
Input: binary tree = {1,2,3}
Output: [2,3,1]
Explanation:
      1
    /   \
  2       3
It will be serialized to {1,2,3} followed by post-order traversal

Example 2:
Input: binary tree = {1,#,2,3}
Output: [3,2,1]
Explanation:
     1
       \
        2
       /
      3
It will be serialized to {1,#,2,3} followed by post-order traversal
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
   * @return: Postorder in ArrayList which contains node values.
   */
  constructor () {
      this.res = [];
  }

  postorderTraversal(root) {
    // write your code here
    this.traverse(root);

    return this.res;
  }

  traverse (currentRoot) {
      if (!currentRoot) {
          return;
      }

      this.traverse(currentRoot.left);
      this.traverse(currentRoot.right);
      this.res.push(currentRoot.val)
  } 
}
