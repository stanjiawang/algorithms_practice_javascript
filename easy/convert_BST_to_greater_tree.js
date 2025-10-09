/*
https://www.lintcode.com/problem/661/?fromId=213&_from=collection

Given a Binary Search Tree (BST)
convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

Input : {5,2,13}
              5
            /   \
           2     13
Output : {18,20,13}
             18
            /   \
          20     13

Input : {5,3,15}
              5
            /   \
           3     15
Output : {20,23,15}
             20
            /   \
          23     15
*/

import { TreeNode } from '/opt/node/lib/lintcode/index.js';

export class Solution {
  /**
   * Convert a Binary Search Tree into a Greater Tree.
   * In a Greater Tree, each node's value becomes:
   *   original node.val + sum of all node values greater than it.
   *
   * Approach:
   *   Perform a reverse inorder traversal (Right → Node → Left),
   *   while keeping a running sum of values we have already seen.
   *   Because we visit greater values first, when we reach a node,
   *   the running sum already equals the total of all greater nodes.
   *
   * @param {TreeNode|null} root - root node of BST
   * @return {TreeNode|null}     - root node after in-place conversion
   */
  convertBST(root) {
    // runningSum accumulates the sum of all previously visited (greater) node values.
    // It is defined inside convertBST so it's shared across recursive calls (closure),
    // but NOT global — each convertBST call has its own runningSum.
    let runningSum = 0;

    /**
     * Reverse inorder traversal helper (Right → Node → Left).
     * @param {TreeNode|null} node
     */
    const traverse = (node) => {
      if (!node) return;

      // 1️⃣ Visit right subtree first — contains all greater values.
      traverse(node.right);

      // 2️⃣ runningSum currently equals sum of all nodes > current node.
      //     Add current node's value to runningSum, then update node.val.
      runningSum += node.val;
      node.val = runningSum;

      // 3️⃣ Visit left subtree — smaller values will include this updated sum.
      traverse(node.left);
    };

    traverse(root);
    return root; // tree modified in-place
  }
}


