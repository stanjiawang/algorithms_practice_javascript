/*
https://www.lintcode.com/problem/463

Sort Integers
Given an integer array, sort it in ascending order. Use selection sort, bubble sort, insertion sort or any O(n2) algorithm.

Please modify the array A in place, this question does not require a return value

Example 1:
	Input:  [3, 2, 1, 4, 5]
	Output: [1, 2, 3, 4, 5]
	
	Explanation: 
	return the sorted array.

Example 2:
	Input:  [1, 1, 2, 1, 1]
	Output: [1, 1, 1, 1, 2]
	
	Explanation: 
	return the sorted array.
*/

export class Solution {
  /**
   * @param a: an integer array
   * @return: nothing
   */
  sortIntegers1(a) {
    // Selection sort, time complexity: O(n^2)
    const length = a.length;

    for (let i = 0; i < length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < length; j++) {
        if (a[j] < a[minIndex] ) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        let temp = a[i];
        a[i] = a[minIndex];
        a[minIndex] = temp;
      }
    }

    return a;
  }

  // Bubble sort, time complexity: O(n^2)
  sortIntegers2(a) {
    // write your code here
    const length = a.length;

    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
        }
      }
    }

    return a;
  }

  sortIntegers(a) {
    // Insertion sort
    const len = a.length;

    for (let i = 1; i < len; i++) {
      let key = a[i];
      let j = i - 1;

      while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j];
        j--;
      }

      a[j + 1] = key;
    }

    return a;
  }
}
