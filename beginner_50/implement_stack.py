'''
https://www.lintcode.com/problem/495

Implement a stack. You can use any data structure inside a stack except stack itself to implement it.

Example 1:
Input:
push(1)
pop()
push(2)
top()  // return 2
pop()
isEmpty() // return true
push(3)
isEmpty() // return false

Example 2:
Input:
isEmpty()
'''

class Stack:
    def __init__(self):
        self.items = []
    """
    @param: x: An integer
    @return: nothing
    """
    def push(self, x):
        # write your code here
        self.items.append(x)

    """
    @return: nothing
    """
    def pop(self):
        # write your code here
        element = self.items[-1]
        self.items.pop(-1)
        return element

    """
    @return: An integer
    """
    def top(self):
        # write your code 
        return self.items[-1]

    """
    @return: True if the stack is empty
    """
    def isEmpty(self):
        # write your code here
        return len(self.items) == 0
