/*
BFS Template (Queue + Level Expansion)

Breadth-First Search expands level by level.
The first time you reach a node/cell, you’ve already found the shortest path.

When to use BFS:
1. Finding shortest paths in an unweighted grid/graph.
2. Problems where distance expands outward step by step (like “Walls and Gates”).
3. Multi-source shortest path (queue initialized with multiple sources).
*/

/**
 * Breadth-First Search (BFS) Template
 * @param {Node} startNode - The starting node
 * @param {Node} endNode - (optional) The target node
 * @return {Map<Node, number>} distance - shortest distance from startNode
 */
function bfs(startNode, endNode = null) {
  // Queue for BFS
  const queue = [];
  // Map to record if a node has been visited, and the shortest distance
  const distance = new Map();

  // Initialize: push start node into queue
  queue.push(startNode);
  distance.set(startNode, 0); // can be 1 if problem requires counting from 1

  // While queue is not empty
  while (queue.length > 0) {
    const node = queue.shift(); // pop from front (queue behavior)

    // If we have a target node, we can stop early
    if (endNode !== null && node === endNode) {
      return distance.get(endNode);
    }

    // Traverse neighbors
    for (const neighbor of node.getNeighbors()) {
      // Skip visited nodes
      if (distance.has(neighbor)) continue;

      // Push neighbor into queue
      queue.push(neighbor);
      // Update shortest distance
      distance.set(neighbor, distance.get(node) + 1);
    }
  }

  // Common return choices (based on problem type):
  // 1. Return all distances
  return distance;
  // 2. Return all connected nodes
  // return Array.from(distance.keys());
  // 3. Return shortest path distance to endNode
  // return distance.get(endNode);
}

// Topological Sort Template
/**
 * Topological Sort using BFS (Kahn's Algorithm)
 * @param {Node[]} nodes - List of all nodes in the graph
 * @return {Node[]} topoOrder - topological order of nodes
 */
function topologicalSort(nodes) {
  // Step 1: Calculate indegrees of all nodes
  const indegrees = getIndegrees(nodes);

  // Step 2: Initialize queue with all nodes that have indegree 0
  const queue = [];
  for (const node of nodes) {
    if (indegrees.get(node) === 0) {
      queue.push(node);
    }
  }

  // Step 3: Process queue
  const topoOrder = [];
  while (queue.length > 0) {
    const node = queue.shift();
    topoOrder.push(node);

    // Decrease indegree of all neighbors
    for (const neighbor of node.getNeighbors()) {
      indegrees.set(neighbor, indegrees.get(neighbor) - 1);

      // If indegree becomes 0, add to queue
      if (indegrees.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Step 4: Check if topological sort is valid (no cycle)
  if (topoOrder.length !== nodes.length) {
    throw new Error("Graph has a cycle, no valid topological order exists.");
  }

  return topoOrder;
}

/**
 * Helper function: Get indegree of each node
 * @param {Node[]} nodes
 * @return {Map<Node, number>}
 */
function getIndegrees(nodes) {
  const indegrees = new Map();

  // Initialize all nodes with indegree 0
  for (const node of nodes) {
    indegrees.set(node, 0);
  }

  // Count indegrees
  for (const node of nodes) {
    for (const neighbor of node.getNeighbors()) {
      indegrees.set(neighbor, indegrees.get(neighbor) + 1);
    }
  }

  return indegrees;
}
