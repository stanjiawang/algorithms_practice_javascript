// Merge Sort (In-Place by index, extra O(n) memory)

function mergeSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) {
    return
  }

  const mid = Math.floor((lo + hi) / 2);
  mergeSort(arr, lo, mid);
  mergeSort(arr, mid + 1, hi);
  merge(arr, lo, mid, hi);
}

function merge(arr, lo, mid, hi) {
  const left = arr.slice(lo, mid + 1);
  const right = arr.slice(mid+ 1, hi + 1);

  let i = 0, j = 0, k = lo;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[i]) {
      arr[k] = left[i];
      i++;
      k++;
    } else {
      arr[k] = right[j];
      j++;
      k++;
    }
  }

  while (i < left.length) {
    arr[k] = left[i];
    i++;
    k++;
  }

    while (i < right.length) {
    arr[k] = right[i];
    i++;
    j++;
  }
}

/*
Stable, always O(n log n)
Needs O(n) extra memory.
*/
