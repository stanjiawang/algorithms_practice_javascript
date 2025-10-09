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

/*
https://www.lintcode.com/problem/547/description?fromId=213&_from=collection

Intersection of Two Arrays

Given two arrays, write a function to compute their intersection.

Input: nums1 = [1, 2, 2, 1], nums2 = [2, 2], 
Output: [2].

Input: nums1 = [1, 2], nums2 = [2], 
Output: [2].
*/

export class Solution {
  /**
   * Compute the intersection of two integer arrays.
   * Each element in the result must be unique.
   *
   * Example:
   * Input:  nums1 = [1, 2, 2, 1], nums2 = [2, 2]
   * Output: [2]
   *
   * @param {number[]} nums1 - The first integer array
   * @param {number[]} nums2 - The second integer array
   * @return {number[]} - The unique intersection elements
   */
  intersection(nums1, nums2) {
    // ✅ Step 1: Convert both arrays into Sets to remove duplicates
    const nums1Set = new Set(nums1);
    const nums2Set = new Set(nums2);

    // ✅ Step 2: Initialize an array to store intersection results
    const intersectionResult = [];

    // ✅ Step 3: Iterate through one set and check if element exists in the other
    for (const num of nums1Set) {
      if (nums2Set.has(num)) {
        intersectionResult.push(num);
      }
    }

    // ✅ Step 4: Return the intersection array
    // (Sorting not necessary; the output order does not matter)
    return intersectionResult;
  }
}

/*
Time Complexity: O(n + m)
(Building two sets + one linear pass for intersection)

Space Complexity: O(n + m)
(Two sets storing unique values)
*/
