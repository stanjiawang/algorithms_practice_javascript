/*
https://www.lintcode.com/course/98/learn/1057/description?chapterId=518&sectionId=3931&ac=true

Network Delay Time

There are N network nodes, labelled 1 to N.
Given times, a list of travel times as directed edges times[i] = (u, v, w), where u is the source node, v is the target node, and w is the time it takes for a signal to travel from source to target.
Now, we send a signal from a certain node K. How long will it take for all nodes to receive the signal? If it is impossible, return -1.

Example 1:
	Input:  times = [[2,1,1],[2,3,1],[3,4,1]], N = 4, K = 2
	Output:  2
	
Example 2:
	Input: times = [[1,2,1]], N = 2, K = 1
	Output:  1
	Explanation:
	Choose the shortest one.
*/

export class Solution {
  /**
   * @param times: a 2D array
   * @param n: an integer
   * @param k: an integer
   * @return: how long will it take for all nodes to receive the signal
   */
  networkDelayTime(times, n, k) {
    // Build adjacency list: graph[u] = array of [v, w]
    const graph = Array.from({length: n + 1}, () => []);
    for (const [u, v, w] of times) {
        graph[u].push([v, w]);
    }

    // Dijkstra distances (1-indexed; index 0 unused)
    const dist = Array(n + 1).fill(Infinity);
    dist[k] = 0;

    // Min-heap of [time, node], implemented via class methods
    this._heap = [];
    this._lt = (a, b) => a[0] < b[0];
    this._heapPush([0, k]);

    while (!this._heapEmpty()) {
        const [t, u] = this._heapPop();
        if (t > dist[u]) {
            continue;
        }
        for (const [v, w] of graph[u]) {
            const nt = t + w;
            if (nt < dist[v]) {
                dist[v] = nt;
                this._heapPush([nt, v]);
            }
        }
    }

    let ans = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) {
            return -1;
        }
        if (dist[i] > ans) {
            ans = dist[i];
        }
    }

    return ans;
  }

  _heapEmpty () {
      return this._heap.length === 0;
  }

  _heapPush (x) {
      const h = this._heap;
      const lt = this._lt;
      h.push(x);
      let i = h.length - 1;
      while (i > 0) {
          const p = (i - 1) >> 1;
          if (lt(h[p], h[i])) {
              break;
          }

          [h[p], h[i]] = [h[i], h[p]];
          i = p;
      }
  }

  _heapPop () {
      const h = this._heap;
      const lt = this._lt;

      if (h.length === 0) {
          return undefined;
      }

      const top = h[0];
      const last = h.pop();

      if (h.length) {
          h[0] = last;
          let i = 0;
          while (true) {
              const l = i * 2 + 1;
              const r = i * 2 + 2;
              let best = i;

              if (l < h.length && !lt(h[best], h[l])) {
                  best = l;
              }
              if (r < h.length && !lt(h[best], h[r])) {
                  best = r;
              }
              if (best === i) {
                  break;
              }

              [h[i], h[best]] = [h[best], h[i]];
              i = best;
          }
      }
      return top;
  }
}
