/*
You are given a data stream in this problem, and you need to implement two functions as following:

function add(val) : receive a num from the data stream.
function getMedian() : return the median of the all numbers which you have received from the data stream.
The median is not equal to median in math.
The median is the number that in the middle of a sorted array, if there are n numbers in a sorted array A, the median is A[(n - 1) / 2] .
For example, if A=[1,2,3], the median is A[(3-1)/2] = A[1] = 2, if A=[1,19], median is A[(2-1)/2] = A[0] = 1.

Example 1:
Input:
add(1)
getMedian()
add(2)
getMedian()
add(3)
getMedian()
add(4)
getMedian()
add(5)
getMedian()

Output:
1
1
2
2
3

Explanation:
The median of [1] and [1,2] is 1,
The median of [1,2,3] and [1,2,3,4] is 2,
The median of [1,2,3,4,5] is 3.
*/

