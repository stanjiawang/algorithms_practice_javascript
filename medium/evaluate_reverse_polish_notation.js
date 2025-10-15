/*
https://www.lintcode.com/problem/424/?fromId=213&_from=collection

Evaluate Reverse Polish Notation

Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, /. Each operand may be an integer or another expression.

Input: ["2", "1", "+", "3", "*"] 
Output: 9
Explanation: ["2", "1", "+", "3", "*"] -> (2 + 1) * 3 -> 9

Input: ["4", "13", "5", "/", "+"]
Output: 6
Explanation: ["4", "13", "5", "/", "+"] -> 4 + 13 / 5 -> 6
*/

export class Solution {
  /**
   * @param {string[]} tokens - The input array in Reverse Polish Notation.
   * @return {number} - The evaluated integer result.
   */
  evalRPN(tokens) {
    const stack = [];

    for (const token of tokens) {
      // If the token is an operator, pop two operands and apply it.
      if (["+", "-", "*", "/"].includes(token)) {
        const right = stack.pop(); // right operand
        const left = stack.pop();  // left operand
        let result;

        switch (token) {
          case "+":
            result = left + right;
            break;
          case "-":
            result = left - right;
            break;
          case "*":
            result = left * right;
            break;
          case "/":
            // Truncate toward zero, required by problem statement
            result = Math.trunc(left / right);
            break;
        }

        // Push the computed result back to stack
        stack.push(result);
      } else {
        // Token is a number, push its numeric value
        stack.push(Number(token));
      }
    }

    // Final result remains on top of the stack
    return stack.pop();
  }
}

/*
| Type      | Complexity | Explanation                                                         |
| --------- | ---------- | ------------------------------------------------------------------- |
| **Time**  | **O(n)**   | Each token is processed once.                                       |
| **Space** | **O(n)**   | In the worst case, the stack holds all numbers before any operator. |
*/
