/*
https://www.lintcode.com/problem/11/?fromId=213&_from=collection

Search Range in Binary Search Tree

Given a binary search tree and a range [k1, k2], return node values within a given range in ascending order.

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
   * @param {TreeNode} root - Root of the Binary Search Tree
   * @param {number} k1 - Lower bound of range
   * @param {number} k2 - Upper bound of range
   * @return {number[]} All node values where k1 <= val <= k2 (in ascending order)
   */
  searchRange(root, k1, k2) {
    const result = [];

    /**
     * Helper function: inorder traversal (Left → Root → Right)
     * Visits nodes in sorted order for BST.
     */
    const inorder = (node) => {
      if (!node) return; // Base case: null node → stop

      // Step 1: Explore left subtree only if node.val > k1
      // (because smaller values could still fall in range)
      if (node.val > k1) {
        inorder(node.left);
      }

      // Step 2: Process current node
      // If node value is within [k1, k2], include it
      if (node.val >= k1 && node.val <= k2) {
        result.push(node.val);
      }

      // Step 3: Explore right subtree only if node.val < k2
      // (because larger values could still fall in range)
      if (node.val < k2) {
        inorder(node.right);
      }
    };

    // Start traversal from the root
    inorder(root);

    // Return collected values in ascending order
    return result;
  }
}


/*
Time	O(M + H) (avg) / O(N) (worst)	Only visits nodes within [k1, k2] plus path height H
Space	O(H)	
*/
