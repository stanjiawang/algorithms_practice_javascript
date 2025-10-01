function kClosest(arr, target, k) {
  // 1. Edge cases
  if (arr is empty OR k <= 0) return [];

  // 2. Binary search: find first index >= target
  right = lowerBound(arr, target);
  left = right - 1;

  result = [];

  // 3. Expand k times
  while (result.length < k) {
    if (left < 0) {           // left side exhausted
      take arr[right]; right++;
    } else if (right >= n) {  // right side exhausted
      take arr[left]; left--;
    } else {
      if (|arr[left]-target| <= |arr[right]-target|) {
        take arr[left]; left--;
      } else {
        take arr[right]; right++;
      }
    }
  }

  return result;
}

function lowerBound(arr, target) {
  left = 0, right = arr.length;
  while (left < right) {
    mid = left + (right - left) / 2;
    if (arr[mid] >= target) right = mid;
    else left = mid + 1;
  }
  return left;
}
