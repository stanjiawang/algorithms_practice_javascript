/*
https://www.lintcode.com/course/98/learn/15?chapterId=518&sectionId=3927&ac=true

Permutations

Given a list of numbers, return all possible permutations of it.

Example 1:

Input:
list = [1]
Output:
[
  [1]
]

Example 2:
Input:
list = [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
*/

export class Solution {
  /**
   * @param nums: A list of integers.
   * @return: A list of permutations.
   *          we will sort your return value in output
   */
  permute(nums) {
    // write your code here
    const result = [];
    const path = [];
    const used = new Array(nums.length).fill(false);

    const backtrack = () => {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) {
                continue;
            }
            used[i] = true;
            path.push(nums[i]);
            backtrack();
            path.pop();
            used[i] = false;
        }
    }

    backtrack();

    return result;
  }
}
