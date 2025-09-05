/*
https://www.lintcode.com/course/98/learn/1534?chapterId=518&sectionId=3922&ac=false

 Convert Binary Search Tree to Sorted Doubly Linked List

Convert a BST to a sorted circular doubly-linked list in-place. Think of the left and right pointers as synonymous to the previous and next pointers in a doubly-linked list.
Let's take the following BST as an example, it may help you understand the problem better:
We want to transform this BST into a circular doubly linked list. Each node in a doubly linked list has a predecessor and successor. For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of the last element is the first element.
The figure below shows the circular doubly linked list for the BST above. The "head" symbol means the node it points to is the smallest element of the linked list.
Specifically, we want to do the transformation in place. After the transformation, the left pointer of the tree node should point to its predecessor, and the right pointer should point to its successor. We should return the pointer to the first element of the linked list.
The figure below shows the transformed BST. The solid line indicates the successor relationship, while the dashed line means the predecessor relationship.

Example 1:
Input: {4,2,5,1,3}
        4
       /  \
      2   5
     / \
    1   3
Output: "left:1->5->4->3->2  right:1->2->3->4->5"
Explanation:
Left: reverse output
Right: positive sequence output

Example 2:

Input: {2,1,3}
        2
       /  \
      1   3
Output: "left:1->3->2  right:1->2->3"
*/

export class Solution {
  /**
   * treeToDoublyList
   * @param {Node|null} root - root of the BST (Node has: val, left, right)
   * @return {Node|null}     - returns the head of the sorted circular doubly linked list
   */
  treeToDoublyList(root) {                             // Define the function: takes the root, returns the head
    if (!root) return null;                            // Edge case: if the tree is empty, return null immediately

    let head = null;                                   // Will hold the smallest node (the head of the list)
    let prev = null;                                   // Keeps track of the previously visited node during traversal

    const dfs = (node) => {                            // Define recursive DFS function for in-order traversal
      if (!node) return;                               // Base case: if node is null, just return

      dfs(node.left);                                  // 1) Traverse the left subtree first (smaller values)

      // 2) Process the current node: link it with the previously visited node
      if (prev) {                                      // If we already have a previous node
        prev.right = node;                             // Link previous node’s "next" (right) to current node
        node.left = prev;                              // Link current node’s "prev" (left) back to previous node
      } else {                                         // Otherwise, this must be the first visited node (the smallest)
        head = node;                                   // Save it as the head of the list
      }
      prev = node;                                     // Update prev to be the current node

      dfs(node.right);                                 // 3) Traverse the right subtree next (larger values)
    };

    dfs(root);                                         // Start DFS traversal from the root, linking nodes along the way

    // After traversal, connect head and tail to make the list circular
    head.left = prev;                                  // Link head’s "prev" (left) to the last node
    prev.right = head;                                 // Link last node’s "next" (right) to head

    return head;                                       // Return the head of the circular doubly linked list
  }
}

/*
In-order traversal guarantees ascending order for a BST.
prev connects the nodes as we go → effectively threading the list.
The very first node visited (smallest value) becomes head.
At the end, connect head and prev to close the circle.
*/
