/*
https://www.lintcode.com/problem/644/?fromId=213&_from=collection

Strobogrammatic Number

A mirror number is a number that looks the same when rotated 180 degrees (looked at upside down).For example, the numbers "69", "88", and "818" are all mirror numbers.
Write a function to determine if a number is mirror. The number is represented as a string.

Input : "69"
Output : true

Input : "68"
Output : false
*/

export class Solution {
  /**
   * Determine if a number is strobogrammatic
   * @param {string} num - input number as a string
   * @return {boolean} - true if the number looks the same when rotated 180°
   */
  isStrobogrammatic(num) {
    // Step 1: Define the valid rotation mapping
    const rotationMap = {
      '0': '0',
      '1': '1',
      '6': '9',
      '8': '8',
      '9': '6'
    };

    // Step 2: Initialize two pointers
    let left = 0;
    let right = num.length - 1;

    // Step 3: Check digits from both ends toward the center
    while (left <= right) {
      const leftDigit = num[left];
      const rightDigit = num[right];

      // If the left digit cannot be rotated, it's invalid
      if (!(leftDigit in rotationMap)) {
        return false;
      }

      // Check if the rotated left digit matches the right digit
      if (rotationMap[leftDigit] !== rightDigit) {
        return false;
      }

      // Move both pointers inward
      left++;
      right--;
    }

    // Step 4: All digit pairs matched successfully
    return true;
  }
}
