/*
https://www.lintcode.com/course/98/learn/104?chapterId=517&sectionId=3901&ac=false

 Merge K Sorted Lists

Merge k sorted chains (sequences are ascending sequences) and return the merged sorted chains (sequences are ascending sequences). Try to analyse and describe its complexity.
Analyze and describe its complexity.

Example 1:
Input:
lists = [2->4->null,null,-1->null]
Output:
-1->2->4->null
Explanation:
Merge 2->4->null, nulll and -1->null into an ascending list.

Example 2:
Input:
lists = [2->6->null,5->null,7->null]
Output:
2->5->6->7->null
Explanation:
Merge 2->6->null, 5->null and 7->null into an ascending list.
*/

function ListNode(val) {
  this.val = val;
  this.next = null;
}

export class Solution {
  /**
   * @param {ListNode[]} lists  // array of ListNode heads
   * @return {ListNode}         // merged sorted list head
   */

  mergeKLists(lists) {
    if (!lists || lists.length === 0) {
      return null;
    }

    // ------ Min Heap implementation ------
    const heap = [];
    
    const swap = (a, i, j) => {
      [a[i], a[j]] = [a[j], a[i]];
    }
    
    const siftUp = (h, i) => {
      while (i > 0) {
        const p = Math.floor((i - 1) / 2);
        if (h[p].val <= h[i].val) {
          break;
        }
        swap(h, i, p);
      }
    }

    const siftDown = (h, i) => {
      const n = h.length;

      while (true) {
        let best = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < n && h[l].val < h[best].val) {
          best = l;
        }
        if (r < n && h[r].val < h[best].val) {
          best = r;
        }
        if (best === i) {
          break;
        }
        swap(h, i, best);
        i = best;
      }
    }

    const pushMin = (h, node) => {
      h.puhs(node);
      siftUp(h, h.length - 1);
    }

    const popMin = (h) => {
      if (h.length === 0) {
        return null;
      }
      swap(h, 0, h.length - 1);
      const out = h.pop();
      siftDown(h, 0);

      return out;
    }

    // initialize heap with the head of each non-empty list
    for (const node of lists) {
      if (node) {
        pushMin(heap, node);
      }
    }

    const dummy = new ListNode(0);
    let tail = dummy;

    while (heap.length > 0) {
      const node = popMin(heap); // smallest node
      tail.next = node;
      tail = tail.next;

      if (node.next) {
        pushMin(heap, node.next); // push next node from the list
      }
    }
    
    return dummy.next
  }
}













