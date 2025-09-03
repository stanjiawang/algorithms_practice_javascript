// Heap Sort (In-Place, O(1) extra memory)

function heapSort(arr) {
  const n = arr.length;

  // build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, i , n);
  }

  // extract elements from heap one by one
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]]; // move max to the end
    siftDown(arr, 0 , end); // restore heap property
  }
}

function siftDown(arr, i , size) {
  while (true) {
    let largest = i;
    cont l = i * 2 + 1;
    const r = i * 2 + 2;

    if (l < size && arr[l] > arr[largest]) {
      largest = l;
    }
    if (r < size && arr[r] > arr[largest]) {
      largest = r;
    }
    if (largest === i) {
      break;
    }
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    i = largest;
  }
}

/*
Always O(n log n), in-place, no extra memory.
Not stable (relative order of equal elements not preserved).
*/
