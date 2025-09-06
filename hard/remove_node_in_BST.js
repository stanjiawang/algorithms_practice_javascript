/*
https://www.lintcode.com/course/98/learn/87?chapterId=518&sectionId=3924&ac=false

Remove Node in Binary Search Tree

Given a root of Binary Search Tree with unique value for each node. Remove the node with given value. If there is no such a node with given value in the binary search tree, do nothing. You should keep the tree still a binary search tree after removal.

Example 1:
Input:
Tree = {5,3,6,2,4}
value = 3
Output:
{5,2,6,#,4} or {5,4,6,2}
Explanation:
Given binary search tree:
    5
   / \
  3   6
 / \
2   4
Remove 3, you can either return:
    5
   / \
  2   6
   \
    4
or
    5
   / \
  4   6
 /
2

Example 2:
Input:
Tree = {5,3,6,2,4}
value = 4
Output:
{5,3,6,2}
Explanation:
Given binary search tree:
    5
   / \
  3   6
 / \
2   4
Remove 4, you should return:
    5
   / \
  3   6
 /
2
*/

// Definition:
// function TreeNode(val) {
//   this.val = val;
//   this.left = null;
//   this.right = null;
// }

export class Solution {
  /**
   * @param {TreeNode|null} root
   * @param {number} value
   * @return {TreeNode|null}
   */
  removeNode(root, value) {
    if (!root) {
      return null; // not found -> do nothing
    }

    if (value < root.val) { // go left
      root.left = this.removeNode(root.left, value);
      return root;
    }

    if (value > root.val) { // go right
      root.right = this.removeNode(root.right, value);
      return root;
    }

    // value === root.val -> delete this node
    if (!root.left) {
      return root.right; // only right (or none)
    }
    if (!root.left) {
      return root.left; // only left
    }

    // both children exist:
    // use in-order successor (smallest in right subtree)
    const succ = this._ minNode(root.right);
    root.val = succ.val; // copy successor's value up
    root.right = this.removeNode(root.right, succ.val); // delete successor node

    return root;
  }

  /**
   * @param {TreeNode} node
   * @return {TreeNode} the leftmost (min) node in this subtree
   */
  _minNode(node) {
    while (node.left) {
      node = node.left;
    }

    return node;
  }


/*
Node not found: recursion hits null → return null; no changes.
Leaf node: one of the first two return lines removes it by returning its child pointer (which is null).
One child: returns the non-null child to replace the node.
Two children: replace the node’s value with its in-order successor (min of right subtree), then delete that successor from the right subtree.

Time: O(H) where H is tree height (O(log N) avg for balanced, O(N) worst if skewed).
Space: O(H) recursion stack.
*/
















