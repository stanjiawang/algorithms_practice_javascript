/*
https://www.lintcode.com/problem/535/?fromId=213&_from=collection

House Robber III

After robbing a street and a circle of houses last time, the burglar found a new place to rob.
But this time, the area composed of all the houses is strange.
After investigating the terrain, the clever burglar found that the terrain this time is a binary tree.
Similar to the previous two thefts, each house had a certain amount of money in it.
The only constraint you face is that adjacent houses are equipped with interconnected anti-theft systems,
which will automatically alarm when two adjacent houses are robbed on the same day.

Calculate how much money you can get if you rob tonight, without touching the alarm.

Input:  {3,2,3,#,3,#,1}
Output: 7
Explanation:
Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
  3
 / \
2   3
 \   \ 
  3   1

Input:  {3,4,5,1,3,#,1}
Output: 9
Explanation:
Maximum amount of money the thief can rob = 4 + 5 = 9.
    3
   / \
  4   5
 / \   \ 
1   3   1
*/

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *   constructor(val = 0, left = null, right = null) {
 *     this.val = val;
 *     this.left = left;
 *     this.right = right;
 *   }
 * }
 */

export class Solution {
  /**
   * @param {TreeNode|null} root - root of the binary tree
   * @return {number} - maximum money without triggering alarms
   */
  houseRobber3(root) {
    // 后序 DFS：返回 [rob, skip]
    const dfs = (node) => {
      // Base case：空节点，两种选择都是 0
      if (!node) return [0, 0];

      // 先算左右子树（后序）
      const [leftRob, leftSkip] = dfs(node.left);
      const [rightRob, rightSkip] = dfs(node.right);

      // 如果偷当前节点：孩子必须不偷
      const robThis = node.val + leftSkip + rightSkip;

      // 如果不偷当前节点：孩子可偷可不偷，分别取最大
      const skipThis = Math.max(leftRob, leftSkip) + Math.max(rightRob, rightSkip);

      return [robThis, skipThis];
    };

    const [robRoot, skipRoot] = dfs(root);
    return Math.max(robRoot, skipRoot);
  }
}

/*
Time Complexity: O(n)

Every node in the binary tree is visited exactly once.
Each visit does only constant work — computing two numbers (rob and skip).
Hence total runtime scales linearly with the number of nodes n.

✅ Space Complexity: O(h)

h is the height of the tree.
Space is used only by the recursion call stack (no extra data structures).
In a balanced tree, h ≈ log n.
In the worst case (a completely skewed tree), h = n.
*/
