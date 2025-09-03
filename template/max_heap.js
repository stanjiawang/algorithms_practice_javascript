// MaxHeap (largest element at the top)

class MaxHeap {
  constructor() {
    this._a = []; // store heap elements in an array
  }

  size() {
    return this._a.length; // numbers of elements
  }

  peek() {
    return this._a[0]; // return the largest element (heap top)
  }

  push(x) {
    this._a.push(x); // insert at the end
    this._siftUp(this._a.length - 1); // bubble it up to restore heap order
  }

  pop() {
    const n = this._a.length;
    if (n === 0) {
      return undefined; // empty heap
    }
    this._swap(0, n - 1); // swap top with the latest
    const out = this._a.pop(); // remove the largest
    this._siftDown(0); // push down new root to restore order
    return out;
  }

  // ----- internal methods -----
  _siftUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2); // parent index
      if (this._a[p] >= this._a[i]) {
        break; // if parent >= child, done
      }
      this._swap(i, p); // else swap with parent
      i = p; // continue upward
    }
  }

  _siftDown(i) {
    const n = this._a.length; // number of elements
    while (true) {
      let best = i; // assume current node is the largest
      const l = i * 2 + 1; // left child index
      const r = i * 2 + 2; // right child index
      if (l < n && this._a[l] > this._a[best]) { // if left child exists (l < n) and is larger than the current best, update best = l.
        best = l;
      }
      if (r < n && this._a[r] > this._a[best]) { // if right child exists and is larger than current best, update best = r.
        best = r;
      }
      // now best is the index of the largest among (parent, left child, right child).
      if (best == i) { // If the parent is already the largest, then the heap property is satisfied.
        break; // No swap is needed → exit the loop with break.
      }
      this._swap(i, best); // swap parent with larger child
      i = best; // move down and continue
    }
  }

  _swap(i , j) {
    [_a[i], _a[j]] = [_a[j], _a[i];
  }


/*
// MaxHeap
const maxH = new MaxHeap();
maxH.push(5); maxH.push(3); maxH.push(8); maxH.push(1);
console.log(maxH.peek()); // 8
console.log(maxH.pop());  // 8
console.log(maxH.pop());  // 5
*/













  
}
