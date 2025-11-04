/*
https://www.lintcode.com/course/98/learn/85?chapterId=518&sectionId=3923&ac=false

Insert Node in a Binary Search Tree

Given a binary search tree and a new tree node, insert the node into the tree. You should keep the tree still be a valid binary search tree.

You can assume there is no duplicate values in this tree + node.

Example 1:

Input:
tree = {}
node= 1
Output:
{1}
Explanation:
Insert node 1 into the empty tree, so there is only one node on the tree.

Example 2:
Input:
tree = {2,1,4,#,#,3}
node = 6
Output:
{2,1,4,#,#,3,6}
*/

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

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
const insertIntoBST = (root, val) => {
  if (root = null) {
    return new TreeNode
  }

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else (
    root.right = insertIntoBST(root.right, val);
  )

  return root;
}

// Iterative Solution
const insertIntoBST = (root, val) => {
    if (root === null) return new TreeNode(val);

    let cur = root;
    while (true) {
        if (val < cur.val) {
            if (cur.left === null) {
                cur.left = new TreeNode(val);
                break;
            } else {
                cur = cur.left;
            }
        } else {
            if (cur.right === null) {
                cur.right = new TreeNode(val);
                break;
            } else {
                cur = cur.right;
            }
        }
    }
    return root;
};

/*
Approach:
A Binary Search Tree (BST) has the property: Left child < Root < Right child

To insert a node: 
If the tree is empty, return the new node.
Otherwise, recursively or iteratively traverse:

If the value < current node → go left
If the value > current node → go right

Place the new node in the first available spot.
*/
