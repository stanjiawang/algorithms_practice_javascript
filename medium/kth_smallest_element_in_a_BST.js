/*
https://www.lintcode.com/course/98/learn/902?chapterId=518&sectionId=3925&ac=true

Kth Smallest Element in a BST

Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

You may assume k is always valid, 1 ≤ k ≤ BST's total elements.
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
   * @param root: the given BST
   * @param k: the given k
   * @return: the kth smallest element in BST
   */
  kthSmallest = function(root, k) {               // Define the function: takes the root of the BST and an integer k, returns the k-th smallest value
      let count = 0;                              // A counter: keeps track of how many nodes we’ve visited during in-order traversal
      let result = null;                          // Stores the final answer; initialized to null (not found yet)
  
      function inorder(node) {                    // Define a recursive helper function for in-order traversal (left → node → right)
          if (!node || result !== null) return;   // Base cases: stop if node is null OR if we’ve already found the result
  
          inorder(node.left);                     // First, recursively traverse the left subtree (smallest values come first in BST)
  
          count++;                                // Visit the current node: increment the counter
          if (count === k) {                      // If this is the k-th node we’ve visited
              result = node.val;                  // Save the current node’s value as the answer
              return;                             // Stop recursion (further calls will be skipped by the base case above)
          }
  
          inorder(node.right);                    // Finally, traverse the right subtree
      }
  
      inorder(root);                              // Start the in-order traversal from the root
      return result;                              // Return the result (guaranteed to be non-null since k is valid)
  };
}

/*
Why in-order traversal?
Because in a Binary Search Tree, in-order traversal always visits nodes in ascending order.

Why check result !== null?
Once we find the k-th smallest value, we don’t need to continue exploring, so we cut off extra recursion.

Complexity
Time: O(H + k), where H = tree height. Worst case O(N).
Space: O(H) for recursion stack.
*/
