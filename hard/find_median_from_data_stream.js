/*
You are given a data stream in this problem, and you need to implement two functions as following:

function add(val) : receive a num from the data stream.
function getMedian() : return the median of the all numbers which you have received from the data stream.
The median is not equal to median in math.
The median is the number that in the middle of a sorted array, if there are n numbers in a sorted array A, the median is A[(n - 1) / 2] .
For example, if A=[1,2,3], the median is A[(3-1)/2] = A[1] = 2, if A=[1,19], median is A[(2-1)/2] = A[0] = 1.

Example 1:
Input:
add(1)
getMedian()
add(2)
getMedian()
add(3)
getMedian()
add(4)
getMedian()
add(5)
getMedian()

Output:
1
1
2
2
3

Explanation:
The median of [1] and [1,2] is 1,
The median of [1,2,3] and [1,2,3,4] is 2,
The median of [1,2,3,4,5] is 3.
*/

export class Solution {
  constructor() {
    this.lower = []; // max-heap: parent >= children
    this.upper = []; // min-heap: parent <= children
  }

  // ---------- MAX-HEAP (lower) ----------
  _maxPeek() { return this.lower[0]; }
  _maxPush(x) {
    const h = this.lower;
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p] >= h[i]) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  }
  _maxPop() {
    const h = this.lower;
    if (!h.length) return undefined;
    const top = h[0];
    const last = h.pop();
    if (h.length) {
      h[0] = last;
      let i = 0;
      while (true) {
        const l = i * 2 + 1, r = i * 2 + 2;
        let best = i;
        if (l < h.length && h[l] > h[best]) best = l;
        if (r < h.length && h[r] > h[best]) best = r;
        if (best === i) break;
        [h[i], h[best]] = [h[best], h[i]];
        i = best;
      }
    }
    return top;
  }

  // ---------- MIN-HEAP (upper) ----------
  _minPeek() { return this.upper[0]; }
  _minPush(x) {
    const h = this.upper;
    h.push(x);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p] <= h[i]) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  }
  _minPop() {
    const h = this.upper;
    if (!h.length) return undefined;
    const top = h[0];
    const last = h.pop();
    if (h.length) {
      h[0] = last;
      let i = 0;
      while (true) {
        const l = i * 2 + 1, r = i * 2 + 2;
        let best = i;
        if (l < h.length && h[l] < h[best]) best = l;
        if (r < h.length && h[r] < h[best]) best = r;
        if (best === i) break;
        [h[i], h[best]] = [h[best], h[i]];
        i = best;
      }
    }
    return top;
  }

  // ---------- API ----------
  add(val) {
    val = Number(val);
    if (!Number.isFinite(val)) return; // ignore weird inputs

    // 1) place into a heap
    if (this.lower.length === 0 || val <= this._maxPeek()) {
      this._maxPush(val);
    } else {
      this._minPush(val);
    }

    // 2) rebalance sizes: lower >= upper and diff <= 1
    while (this.lower.length < this.upper.length) {
      this._maxPush(this._minPop());
    }
    while (this.lower.length - this.upper.length > 1) {
      this._minPush(this._maxPop());
    }

    // 3) fix ordering if needed: max(lower) <= min(upper)
    if (this.upper.length && this._maxPeek() > this._minPeek()) {
      const loTop = this._maxPop();
      const upTop = this._minPop();
      this._maxPush(upTop);
      this._minPush(loTop);
    }
  }

  getMedian() {
    return this.lower.length ? this._maxPeek() : null; // lower-median A[(n-1)/2]
  }
}


