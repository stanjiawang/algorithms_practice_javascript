/*
https://www.lintcode.com/problem/419/?fromId=213&_from=collection

Given a roman numeral, convert it to an integer.

The answer is guaranteed to be within the range from 1 to 3999.

Input: "IV"
Output: 4

Input: "XCIX"
Output: 99
*/

export class Solution {
  /**
   * @param {string} s - Roman numeral string
   * @return {number} - Corresponding integer
   */
  romanToInt(s) {
    // Mapping of single Roman numerals to their integer values
    const romanMap = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let total = 0;

    // Loop through each Roman character
    for (let i = 0; i < s.length; i++) {
      const currentValue = romanMap[s[i]];
      const nextValue = romanMap[s[i + 1]];

      // If the current value is less than the next one,
      // it's a subtraction case (e.g., IV = 4, IX = 9)
      if (nextValue > currentValue) {
        total -= currentValue;
      } else {
        total += currentValue;
      }
    }

    return total;
  }
}

/*
| Complexity      | Description                                    |
| --------------- | ---------------------------------------------- |
| **Time:** O(n)  | Loop once through all characters in the string |
| **Space:** O(1) | Only uses fixed-size map and integer counters  |
*/


