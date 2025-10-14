/*
https://www.lintcode.com/problem/184/?fromId=213&_from=collection

Largest Number

Given a list of non negative integers, arrange them such that they form the largest number.

Input:[1, 20, 23, 4, 8]
Output:"8423201"

Input:[4, 6, 65]
Output:"6654"
*/
export class Solution {
  /**
   * Form the largest possible number by arranging integers.
   *
   * @param {number[]} nums - A list of non-negative integers
   * @return {string} - The largest number represented as a string
   */
  largestNumber(nums) {
    // Step 1: Convert all numbers to strings for concatenation comparison
    const strs = nums.map(String);

    // Step 2: Custom sort rule
    // Compare two numbers (as strings) a and b by comparing "ab" and "ba".
    // Example:
    //   a = "9", b = "34"
    //   "934" > "349" → "9" should come before "34"
    strs.sort((a, b) => (b + a).localeCompare(a + b));

    // Step 3: Handle the edge case — all zeros like [0, 0, 0]
    // After sorting, the first element will be "0" if and only if all are zeros.
    if (strs[0] === "0") return "0";

    // Step 4: Join all strings to form the final result
    return strs.join("");
  }
}

/*
| Type                 | Analysis                                              | Explanation                                                                                    |
| -------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Time Complexity**  | **O(n log n × k)**                                    | Sorting `n` strings, each comparison takes up to `O(k)` (k = average length of number string). |
| **Space Complexity** | **O(n × k)**                                          | Need to store all numbers as strings; sorting also takes auxiliary memory.                     |
| **n**                | Number of elements in the array                       |                                                                                                |
| **k**                | Average length of each number’s string representation |                                                                                                |
*/
