/*
https://www.lintcode.com/problem/178/?fromId=213&_from=collection

Graph Valid Tree

Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes)
Write a function to check whether these edges make up a valid tree.

You can assume that no duplicate edges will appear in edges.
Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

Input: n = 5 edges = [[0, 1], [0, 2], [0, 3], [1, 4]]
Output: true.

Input: n = 5 edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
Output: false.
*/

export class Solution {
  /**
   * Determine if the given undirected graph forms a valid tree
   *
   * @param {number} n - Number of nodes labeled from 0 to n-1
   * @param {number[][]} edges - List of undirected edges [u, v]
   * @return {boolean} - True if it's a valid tree, otherwise false
   */
  validTree(n, edges) {
    // 1️⃣ A valid tree must have exactly n - 1 edges.
    // - Too few edges => disconnected
    // - Too many edges => contains a cycle
    if (edges.length !== n - 1) return false;

    // 2️⃣ Build adjacency list representation of the undirected graph
    // Example:
    // edges = [[0,1],[0,2],[1,3]]
    // graph = {
    //   0: [1,2],
    //   1: [0,3],
    //   2: [0],
    //   3: [1]
    // }
    const graph = new Map();
    for (let i = 0; i < n; i++) graph.set(i, []);
    for (const [u, v] of edges) {
      graph.get(u).push(v);
      graph.get(v).push(u); // undirected: add both directions
    }

    // 3️⃣ Use DFS to traverse the graph, detect cycles, and mark visited nodes
    const visited = new Set();

    /**
     * DFS helper function
     * @param {number} node - current node we are visiting
     * @param {number} parent - the node we came from (to avoid false cycle detection)
     * @return {boolean} - returns false if a cycle is detected
     */
    const dfs = (node, parent) => {
      visited.add(node); // mark current node as visited

      // Explore all adjacent nodes
      for (const neighbor of graph.get(node)) {
        // ⚠️ If neighbor has been visited and is not the parent,
        // that means we found a cycle (back edge).
        if (visited.has(neighbor) && neighbor !== parent) {
          return false;
        }

        // 🔁 If neighbor has not been visited, continue DFS deeper
        if (!visited.has(neighbor)) {
          if (!dfs(neighbor, node)) {
            // If any recursive call returns false (cycle found), bubble up
            return false;
          }
        }
      }

      // ✅ No cycle found from this path
      return true;
    };

    // 4️⃣ Start DFS from node 0
    // - This will explore one connected component of the graph.
    // - If the graph has multiple disconnected parts, those nodes won't be visited.
    if (!dfs(0, -1)) {
      // ❌ Cycle detected somewhere → not a valid tree
      return false;
    }

    // 5️⃣ Check connectivity
    // - Even if no cycle was found, we must ensure all nodes were visited.
    // - Example: n=4, edges=[[0,1],[2,3]] has no cycle but is not connected.
    // - So we require visited.size === n to confirm the graph is fully connected.
    if (visited.size !== n) {
      // ❌ Some nodes were never reached → disconnected → not a tree
      return false;
    }

    // ✅ Passed both checks → graph is a valid tree
    return true;
  }
}


/*
“I check two properties:
1️⃣ The graph must have exactly n−1 edges.
2️⃣ It must be fully connected and have no cycles.

I use DFS to traverse the graph and detect cycles — if I ever reach a node that was already visited and it’s not the parent, that’s a cycle.
After DFS, I confirm that all nodes are visited to ensure connectivity.

Both checks together guarantee it’s a valid tree.”

| Type           | Complexity | Reason                               |
| -------------- | ---------- | ------------------------------------ |
| **Time**       | **O(n)**   | Each edge and node is processed once |
| **Space**      | **O(n)**   | For adjacency list and visited set   |
| **Call Stack** | **O(n)**   | Worst-case depth (linear chain)      |
*/
