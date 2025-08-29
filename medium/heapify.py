'''
https://www.lintcode.com/course/98/learn/130/description?chapterId=517&sectionId=3896

Heapify

Given an integer array, heapify it into a min-heap array.

For a heap array A, A[0] is the root of heap, and for each A[i], A[i * 2 + 1] is the left child of A[i] and A[i * 2 + 2] is the right child of A[i].

Input : [3,2,1,4,5]
Output : [1,2,3,4,5]
Explanation : return any one of the legitimate heap arrays. So [1,3,2,4,5] is also a correct result.
'''

from typing import (
    List,
)

class Solution:
    """
    @param a: Given an integer array
    @return: nothing
    """
    def heapify(self, a: List[int]):
        # write your code here
        for i in range(0, len(a)):
            self.shift_up(a, i)

    def shift_up(self, a, ind):
        k = ind;
        father = (k - 1) // 2
        while father >= 0:
            if a[k] >= a[father]:
                break;
            else:
                a[father], a[k] = a[k], a[father]
                k = father
                father = (k - 1) // 2
