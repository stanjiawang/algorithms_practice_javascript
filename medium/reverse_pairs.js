/*
https://www.lintcode.com/course/98/learn/532/description?chapterId=517&sectionId=3899&ac=true

Reverse Pairs

Two numbers in the array, if the previous number is greater than the following number, then the two numbers form a reverse order pair. Give you an array, find out the total number of reverse order pairs in this array.
Summary: if a [i] > a [j] and i < j, a [i] and a [j] form a reverse order pair.

Example1
Input:  A = [2, 4, 1, 3, 5]
Output: 3
Explanation:
(2, 1), (4, 1), (4, 3) are reverse pairs

Example2
Input:  A = [1, 2, 3, 4]
Output: 0
Explanation:
No reverse pair
*/

export class Solution {
  /**
   * @param a: an array
   * @return: total of reverse pairs
   */
  reversePairs(a) {
    // write your code here
    if (!Array.isArray(a) || a.length <= 1) {
        return 0;
    }

    const tmp = new Array(a.length);
    return this._sortAndCount(a, 0, a.length - 1, tmp);
  }

  _sortAndCount(a, lo, hi, tmp) {
      if (lo >= hi) {
          return 0;
      }
      const mid = Math.floor((lo + hi) / 2);
      let inv = 0;
      inv += this._sortAndCount(a, lo, mid, tmp); // inversions in left half
      inv += this._sortAndCount(a, mid + 1, hi, tmp); // inversions in right half
      inv += this._mergeAndCount(a, lo, mid, hi, tmp); // cross inversions

      return inv;
  }

  _mergeAndCount(a, lo, mid, hi, tmp) {
    let i = lo, j = mid + 1, k = lo;
    let inversions = 0;

    // merge while counting a[i] > a[j] with i <= j
    while (i <= mid && j <= hi) {
        if (a[i] <= a[j]) {
            tmp[k++] = a[i++];
        } else {
            // since left hard [i..mid] is sorted, all those are > a[j]
            inversions += (mid - i + 1);
            tmp[k++] = a[j++];
        }
    }

    // copy leftovers
    while (i <= mid) {
        tmp[k++] = a[i++];
    }
    while (j <= hi) {
        tmp[k++] = a[j++];
    }

    // write back
    for (let p = lo; p <= hi; p++) {
        a[p] = tmp[p];
    }

    return inversions;
  }
}
