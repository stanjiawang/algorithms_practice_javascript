'''
https://www.lintcode.com/problem/492

Implement Queue by Linked List

Implement a Queue by linked list. Support the following basic methods:

enqueue(item). Put a new item in the queue.
dequeue(). Move the first item out of the queue, return it. If the queue is empty, returned. -1.、

Example 1:
Input:
enqueue(1)
enqueue(2)
enqueue(3)
dequeue() // return 1
enqueue(4)
dequeue() // return 2

Example 2:
Input:
enqueue(10)
dequeue()// return 10
dequeue()// return -1
'''

class LinkedListNode:
    def __init__(self, val):
        self.val = val
        self.next = None

class MyQueue:
    """
    @param: item: An integer
    @return: nothing
    """
    def __init__(self):
        self.before_head = LinkedListNode(-1)
        self.tail = self.before_head

    def enqueue(self, item):
        # write your code here
        self.tail.next = LinkedListNode(item)
        self.tail = self.tail.next

    """
    @return: An integer
    """
    def dequeue(self):
        # write your code here
        if self.before_head.next is None:
            return -1

        head_val = self.before_head.next.val;
        self.before_head = self.before_head.next;

        return head_val
