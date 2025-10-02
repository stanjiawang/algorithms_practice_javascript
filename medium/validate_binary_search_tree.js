/*
https://www.lintcode.com/course/90/learn/95?chapterId=469&sectionId=3286&ac=true

Validate Binary Search Tree

Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
A single node tree is a BST

Example 1:
Input:
tree = {-1}
Output: true
Explanation:
For the following binary tree（only one node）:
              -1
This is a binary search tree.

Example 2:
Input:
tree = {2,1,4,#,#,3,5}
Output: true
Explanation:
For the following binary tree:
          2
         / \
        1   4
           / \
          3   5
This is a binary search tree.
*/

export class Solution {
  /**
   * @param {TreeNode|null} root - The root of the binary tree
   * @return {boolean} - True if the tree is a valid BST, else false
   */
  isValidBST(root) {
    // Helper function: check if current node is valid in (low, high)
    function dfs(node, low, high) {
      // Base case: empty tree is valid
      if (node === null) return true;

      // Node value must be strictly inside (low, high)
      if (low !== null && node.val <= low) return false;
      if (high !== null && node.val >= high) return false;

      // Recursively check:
      // Left subtree: must be < node.val
      // Right subtree: must be > node.val
      return dfs(node.left, low, node.val) &&
             dfs(node.right, node.val, high);
    }

    // Start with no boundary (-∞, +∞), represented by null
    return dfs(root, null, null);
  }
}

// Inorder Traversal Solution
export class Solution {
  /**
   * @param {TreeNode|null} root - The root of the binary tree
   * @return {boolean} - True if the tree is a valid BST, else false
   */
  isValidBST(root) {
    let prev = null; // Keep track of last visited value during inorder

    function inorder(node) {
      if (!node) return true; // Empty node is valid

      // 1. Traverse left subtree
      if (!inorder(node.left)) return false;

      // 2. Current node must be greater than previous visited node
      if (prev !== null && node.val <= prev) return false;
      prev = node.val; // Update prev

      // 3. Traverse right subtree
      return inorder(node.right);
    }

    return inorder(root);
  }
}
