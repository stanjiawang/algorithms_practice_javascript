// QuickSort (Recursive, In-Place)
export class Solution {
  /**
   * @param {number[]} arr
   * @return {number[]} sorted array
   */
  quickSort(arr) {
    if (arr.length <= 1) return arr; // base case

    const pivot = arr[arr.length - 1];  // choose last element as pivot
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] <= pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    // recursively sort left and right, then merge
    return [...this.quickSort(left), pivot, ...this.quickSort(right)];
  }
}

// In-Place QuickSort (Lomuto Partition)
// If you want to avoid extra arrays:
export class Solution {
  /**
   * @param {number[]} arr
   * @return {number[]} sorted array
   */
  quickSort(arr) {
    this.sortHelper(arr, 0, arr.length - 1);
    return arr;
  }

  sortHelper(arr, low, high) {
    if (low < high) {
      const pi = this.partition(arr, low, high);
      this.sortHelper(arr, low, pi - 1);
      this.sortHelper(arr, pi + 1, high);
    }
  }

  partition(arr, low, high) {
    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
        i++;
      }
    }

    [arr[i], arr[high]] = [arr[high], arr[i]]; // put pivot in right place
    return i;
  }
}
