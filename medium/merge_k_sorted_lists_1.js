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

// Merge K sorted linked lists by recursively merge halves.
function mergeKLists_divideAndConquer(lists) {
  if (!lists || lists.length === 0) {
    return null;
  }

  return mergeRange(lists, 0, lists.length - 1);
}

function mergeRange(lists, lo, hi) {
  if (lo === hi) {
    return lists[lo];
  }

  const mid = Math.floor((lo + hi) / 2)；
  const left = mergeRange(lists, lo, mid);
  const right = mergeRange(lists, mid + 1, high);

  return mergeTwo(left, right);
}

function mergeTwo(a, b) {
  const dummy = new ListNode(0);

  let tail = dummy;
  let p = a;
  let q = b;

  while (p && q) {
    if (p.val <= q.val) {
      tail.next = p;
      p = p.next;
    } else {
      tail.next = q;
      q = q.next;
    }
    tail = tail.next;
  }
  tail.next = p ? p : q;
  
  return dummy.next;
}

/*
Let k be the number of lists, and N = sum(len(list_i)).
Each node is moved/linked O(log k) times across merge levels.
Time: O(N log k)
Space: Top-down recursion: O(log k) stack
*/






