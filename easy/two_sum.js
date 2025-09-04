/*
https://www.lintcode.com/course/98/learn/56?chapterId=517&sectionId=3904&ac=false

Two Sum

Given an array of integers, find two numbers such that they add up to a specific target number.
The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are zero-based.

You may assume that each input would have exactly one solution.
Elements in an array cannot be reused.

Example 1:
Input:
numbers = [2,7,11,15]
target = 9
Output:
[0,1]
Explanation:
numbers[0] + numbers[1] = 9

Example 2:
Input:
numbers = [15,2,7,11]
target = 9
Output:
[1,2]
Explanation:
numbers[1] + numbers[2] = 9
*/

export class Solution {
  /**
   * @param numbers: An array of Integer
   * @param target: target = numbers[index1] + numbers[index2]
   * @return: [index1, index2] (index1 < index2)
   */
  twoSum(numbers, target) {
    if (!numbers) {
        return [-1, -1];
    }

    const myMap = new Map();

    for (let i = 0; i < numbers.length; i++) {
        if (myMap.has(target - numbers[i])) {
            return [myMap.get(target - numbers[i]), i]
        }
        myMap.set(numbers[i], i);
    }
  }
}

// time complexity: O(N)
// space complexity: O(N)


twoSum(numbers, target) {
  const sortedNumbers = numbers.sort(function(a, b) {return a - b;});
  
  let left = 0;
  let right = sortedNumbers.length - 1;

  while (left < right) {
    if (sortedNumbers[left] + sortedNumbers[right] > target) {
      right--;
    } else if (sortedNumbers[left] + sortedNumbers[right] < target) {
      left++;
    } else {
      return [left, right];
    }
  }

  return [-1, -1];
}
// time complexity: O(nlogbn)
// space complexity: O(1)
