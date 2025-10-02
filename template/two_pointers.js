/*
These four detailed templates cover most two-pointer problems:

1. Opposite direction → partition, 2Sum sorted, trapping rain water.
2. Outward direction → palindromes, substring expansion.
3. Same direction → sliding window problems (longest/shortest subarray, substring with condition).
4. Merge → merging arrays/lists, k-way merge, external sorting.
*/

// 1. Opposite Direction Two Pointers (Partition in Quicksort)

/**
 * Partition an array into two parts using opposite-direction pointers.
 * - Left pointer moves rightward until an element >= pivot.
 * - Right pointer moves leftward until an element <= pivot.
 * - Swap the two values, then continue.
 * - Ends when the pointers cross.
 *
 * Common use: quicksort partitioning.
 *
 * @param {number[]} arr - Input array (will be modified in place)
 * @param {number} start - Left boundary
 * @param {number} end   - Right boundary
 * @returns {{left:number, right:number}} - New partition boundaries
 */
function partition(arr, start, end) {
  if (start >= end) return { left: start, right: end };

  let left = start;
  let right = end;

  // Pivot is chosen as the middle element's value (not the index).
  const pivot = arr[Math.floor((start + end) / 2)];

  // Loop until left and right pointers cross.
  while (left <= right) {
    // Move left pointer until we find an element >= pivot.
    while (left <= right && arr[left] < pivot) {
      left++;
    }
    // Move right pointer until we find an element <= pivot.
    while (left <= right && arr[right] > pivot) {
      right--;
    }
    // Now left points to a value >= pivot, and right points to <= pivot.
    if (left <= right) {
      // Swap values at left and right.
      [arr[left], arr[right]] = [arr[right], arr[left]];
      // Move pointers inward to continue.
      left++;
      right--;
    }
  }

  // At this point:
  // - All elements in [start .. right] <= pivot
  // - All elements in [left .. end]   >= pivot
  return { left, right };
}

// 2. Outward / Backward Direction Two Pointers (Expand Around Center)
/**
 * Expand two pointers outward from a center position.
 * - Start with a given "center" (could be one index or two adjacent indices).
 * - Move left pointer leftward, right pointer rightward.
 * - Stop when the condition is no longer satisfied.
 *
 * Common use: finding palindromic substrings.
 *
 * @param {string} s - Input string
 * @param {number} left  - Initial left pointer (center index or center-1)
 * @param {number} right - Initial right pointer (center index)
 * @returns {{left:number, right:number}} - Last valid window boundaries
 */
function expandAroundCenter(s, left, right) {
  // Expand while the two characters are equal and within bounds.
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--;   // move left pointer outward
    right++;  // move right pointer outward
  }

  // Loop stops when the condition is broken.
  // That means last step was invalid, so adjust back by 1.
  return { left: left + 1, right: right - 1 };
}

// Example usage: longest palindrome substring
function longestPalindrome(s) {
  if (!s || s.length === 0) return "";

  let bestL = 0, bestR = 0;

  for (let center = 0; center < s.length; center++) {
    // Odd-length palindrome (single char center)
    const odd = expandAroundCenter(s, center, center);
    if (odd.right - odd.left > bestR - bestL) {
      bestL = odd.left;
      bestR = odd.right;
    }

    // Even-length palindrome (two char center)
    const even = expandAroundCenter(s, center, center + 1);
    if (even.right - even.left > bestR - bestL) {
      bestL = even.left;
      bestR = even.right;
    }
  }

  return s.slice(bestL, bestR + 1);
}

// 3. Same Direction Two Pointers (Sliding Window)
/**
 * Sliding window template using two same-direction pointers.
 * - Right pointer (j) always moves forward to expand the window.
 * - Left pointer (i) moves forward to shrink the window when invalid.
 * - Keep updating the best result when the window is valid.
 *
 * Example: find the longest subarray with sum <= target.
 *
 * @param {number[]} nums - Input array
 * @param {number} target - Target condition
 * @returns {number} - Maximum length of a valid window
 */
function slidingWindow(nums, target) {
  let left = 0;        // left boundary of the window
  let windowSum = 0;   // current sum of the window
  let best = 0;        // best result (max length here)

  // Right pointer expands the window
  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right]; // include nums[right] in the window

    // If window is invalid, shrink from the left until valid again
    while (windowSum > target) {
      windowSum -= nums[left];
      left++;
    }

    // Window is valid here, update result
    const currLength = right - left + 1;
    best = Math.max(best, currLength);
  }

  return best;
}

// 4. Merge Two Sorted Arrays (Classic Merge Step)
/**
 * Merge two sorted arrays into one sorted array.
 * - i and j are pointers starting from index 0 of each array.
 * - Compare elements at i and j, push the smaller one to result.
 * - Move that pointer forward.
 * - When one array is exhausted, append the remaining elements of the other.
 *
 * @param {number[]} a - First sorted array
 * @param {number[]} b - Second sorted array
 * @returns {number[]} - Merged sorted array
 */
function mergeSortedArrays(a, b) {
  let i = 0; // pointer for array a
  let j = 0; // pointer for array b
  const result = [];

  // While both arrays still have elements
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) {
      // Take element from a, move pointer i
      result.push(a[i]);
      i++;
    } else {
      // Take element from b, move pointer j
      result.push(b[j]);
      j++;
    }
  }

  // If any elements remain in a, append them
  while (i < a.length) {
    result.push(a[i]);
    i++;
  }

  // If any elements remain in b, append them
  while (j < b.length) {
    result.push(b[j]);
    j++;
  }

  return result;
}

