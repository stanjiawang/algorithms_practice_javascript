/*
https://www.lintcode.com/course/98/learn/5?chapterId=517&sectionId=3894&ac=false

Kth Largest Element

Find the K-th largest element in an array.

Example 1:
Input: 
k = 1
nums = [1,3,4,2]
Output: 4
Explanation:
The first largest element is four.

Example 2:
Input:
k = 3
nums = [9,3,2,4,8]
Output: 4
Explanation:
The third largest largest element is four.
*/

export class Solution {
  /**
   * @param k: An integer
   * @param nums: An array
   * @return: the Kth largest element
   */
  kthLargestElement(k, nums) {
    // write your code here
    const n = nums.length;
    const target = n - k;

    let low = 0, high = n - 1;

    while (low <= high) {
        const p = this.partition(nums, low, high);

        if (p === target) {
            return nums[p];
        }

        if (p < target) {
            low = p + 1;
        } else {
            high = p - 1;
        }
    }
  }

  partition(a, l, h) {
      const random = Math.floor(Math.random() * (h - l + 1)) + l;
      [a[random], a[h]] = [a[h], a[random]];

      const pivot = a[h];
      let i = l;

      for (let j = l; j < h; j++) {
          if (a[j] <= pivot) {
              [a[i], a[j]] = [a[j], a[i]];
              i++;
          }
      }

      [a[i], a[h]] = [a[h], a[i]];

      return i;
  }
}
