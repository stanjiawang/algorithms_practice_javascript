// Quick Sort (In-Place, Lomuto Partition)
function quickSort (arr, low = 0, hi = arr.length - 1) {
  if (lo < hi) {
    const p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
  }
}

function partition(arr, lo, hi) {
  const pivot = arr[hi]; // choose last element as pivot
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i; // final pivot point
}

/*
Average: O(n log n)
Worst case: O(n²) if pivot choice is poor (use random pivot for safety).
Space: O(log n) recursion stack.
*/
