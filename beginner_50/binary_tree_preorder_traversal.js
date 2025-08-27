/*
https://www.lintcode.com/problem/66

Given a binary tree, return the preorder traversal of its nodes' values.

Example 1:
Input: binary tree = {1,2,3}
Output: [1,2,3]
Explanation:
      1
    /   \
  2       3
It will be serialized as {1,2,3} preorder traversal

Example 2:
Input: binary tree = {1,#,2,3}
Output:
[1,2,3]
Explanation:

     1
       \
        2
       /
      3
It will be serialized as {1,#,2,3} preorder traversal
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
   * @return: Preorder in ArrayList which contains node values.
   */
  constructor () {
    this.res = [];
  }

  preorderTraversal(root) {
    // write your code here
    this.traverse(root);

    return this.res;
  }

  traverse(currentRoot) {
    if (!currentRoot) {
        return;
    }
    
    this.res.push(currentRoot.val);
    this.traverse(currentRoot.left);
    this.traverse(currentRoot.right);
  }
}

