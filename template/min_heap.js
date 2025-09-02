// MinHeap (smallest element at the top)
class MinHeap {
  constructor() {
    this._a = []; // store heap elements in an array (binary heap, level order)
  }

  size () {
    return this._a.length; // number of elements
  }

  peek() {
    return this._a[0]; // return the smallest element (heap top)
  }

  push() {
    this._a.push(x); // insert at the end
    this._siftUp(this._a.length - 1); // bubble it up to restore heap order
  }

  pop() {
    const n = this._a.length;
    if (n === 0) {
      return undefined; // empty heap
    }
    this.swap(0, n - 1); // swap top with the last
    const out = this._a.pop(); // remove the smallest
    this._siftDown(0); // push down new root to restore order
    return out;
  }

  // ----- internal methods -----
  _siftUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2); // parent index
      if (this._a[p] <= this._a[i]) {
        break; // if parent <= child, done
      }
      this._swap(i, p); // else swap the parent
      i = p; // continue upward
  }

  _siftDown(i) {
    const n = this._a.length;
    while(true) {
      let best = i;
      const l = i * 2 + 1; // left child
      const r = i * 2 + 2; // right child
      if (l < n && this._a[l] < this._a[best]) {
        best = l;
      }
      if (r < n && this._a[r] < this._a[best) {
        best = r;
      }
      if (best === i) { // already the smallest
        break;
      }
      this._swap(i, best);
      i = best;
    }
  }

  _swap(i , j) {
    [this._a[i], this._a[j]] = [this._a[j], this._a[i]];
  }
}
/*
// MinHeap
const minH = new MinHeap();
minH.push(5); minH.push(3); minH.push(8); minH.push(1);
console.log(minH.peek()); // 1
console.log(minH.pop());  // 1
console.log(minH.pop());  // 3

// Example
We will insert: 5, 3, 8, 1
The array [1, 3, 8, 5] represents the tree in level-order (top to bottom, left to right)
      1
     / \
    3   8
   /
  5
Parent/child relationships:
Parent of i: Math.floor((i - 1) / 2)
i = 0 → no parent
i = 1 or 2 → parent = 0 (the root)

Left child of i: 2 * i + 1
Right child of i: 2 * i + 2
MinHeap property: each parent is ≤ its children.
*/


















  
