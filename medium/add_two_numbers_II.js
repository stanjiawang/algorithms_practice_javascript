/*
https://www.lintcode.com/problem/221/?fromId=213&_from=collection

Add Two Numbers II

You have two numbers represented by linked list, where each node contains a single digit.
The digits are stored in forward order, such that the 1's digit is at the head of the list.
Write a function that adds the two numbers and returns the sum as a linked list.

Input: 6->1->7   2->9->5
Output: 9->1->2

Input: 1->2->3   4->5->6
Output: 5->7->9
*/

import { ListNode } from '/opt/node/lib/lintcode/index.js';

/**
 * Definition of ListNode:
 * class ListNode {
 *   constructor(val, next = null) {
 *     this.val = val;
 *     this.next = next;
 *   }
 * }
 */

export class Solution {
  /**
   * Add two numbers represented by forward-order linked lists.
   * Example:
   *   l1 = 6 -> 1 -> 7   (represents 617)
   *   l2 = 2 -> 9 -> 5   (represents 295)
   *   Output: 9 -> 1 -> 2 (represents 912)
   *
   * @param {ListNode} l1 - head of first linked list
   * @param {ListNode} l2 - head of second linked list
   * @return {ListNode} - head of the resulting sum list
   */
  addLists2(l1, l2) {
    // Step 1️⃣ Build two stacks to reverse traversal order.
    // Each stack stores digits from most-significant → least-significant.
    const stack1 = [];
    const stack2 = [];

    while (l1) {
      stack1.push(l1.val);
      l1 = l1.next;
    }

    while (l2) {
      stack2.push(l2.val);
      l2 = l2.next;
    }

    // Step 2️⃣ Initialize carry and result head.
    let carry = 0;
    let head = null;

    // Step 3️⃣ Pop digits from stacks and perform addition.
    // Continue until both stacks are empty AND no carry remains.
    while (stack1.length > 0 || stack2.length > 0 || carry !== 0) {
      // Pop one digit from each stack (or use 0 if exhausted)
      const val1 = stack1.length > 0 ? stack1.pop() : 0;
      const val2 = stack2.length > 0 ? stack2.pop() : 0;

      // Compute current sum and next carry
      const sum = val1 + val2 + carry;
      carry = Math.floor(sum / 10);

      // Current node value is the unit digit of sum
      const node = new ListNode(sum % 10);

      // Insert at the front of the result list
      node.next = head;
      head = node;
    }

    // Step 4️⃣ Return the head of the resulting list
    return head;
  }
}

/*
| Category             | Complexity   | Explanation                                                           |
| -------------------- | ------------ | --------------------------------------------------------------------- |
| **Time Complexity**  | **O(n + m)** | Each list is traversed once to build stacks and once during addition. |
| **Space Complexity** | **O(n + m)** | Extra stacks store up to all digits from both lists.                  |
*/
