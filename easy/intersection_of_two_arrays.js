/*
https://www.lintcode.com/course/98/learn/548?chapterId=517&sectionId=3906&ac=true

Intersection of Two Arrays II

Given two arrays, write a function to compute their intersection.

Example1
Input: nums1 = [1, 2, 2, 1], nums2 = [2, 2]
Output:  [2, 2]

Example2
Input: nums1 = [1, 1, 2], nums2 = [1]
Output:  [1]
*/

export class Solution {
  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  intersection(nums1, nums2) {
    if (!Array.isArray(nums1) || !Array.isArray(nums2)) return [];

    // Sort both arrays first
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    let i = 0, j = 0;
    const result = [];

    // Use two pointers to scan both arrays
    while (i < nums1.length && j < nums2.length) {
      if (nums1[i] === nums2[j]) {
        result.push(nums1[i]);
        i++;
        j++;
      } else if (nums1[i] < nums2[j]) {
        i++;
      } else {
        j++;
      }
    }

    return result;
  }
}

export class Solution {
  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  intersection(nums1, nums2) {
    if (!Array.isArray(nums1) || !Array.isArray(nums2)) return [];

    const countMap = new Map(); // number -> frequency in nums1
    const result = [];

    // Count frequencies of each number in nums1
    for (const num of nums1) {
      countMap.set(num, (countMap.get(num) || 0) + 1);
    }

    // Traverse nums2, and collect matches
    for (const num of nums2) {
      if (countMap.has(num) && countMap.get(num) > 0) {
        result.push(num);
        countMap.set(num, countMap.get(num) - 1); // decrease count
      }
    }

    return result;
  }
}
