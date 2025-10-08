/*
https://www.lintcode.com/course/90/learn/1070?chapterId=475&sectionId=3307&ac=true

Accounts Merge

Given a list accounts, each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.
Now, we would like to merge these accounts.
Two accounts definitely belong to the same person if there is some email that is common to both accounts.
Note that even if two accounts have the same name, they may belong to different people as people could have the same name.
A person can have any number of accounts initially, but all of their accounts definitely have the same name.
After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order.
The accounts themselves can be returned in any order.

Example 1:
	Input:
	[
		["John", "johnsmith@mail.com", "john00@mail.com"],
		["John", "johnnybravo@mail.com"],
		["John", "johnsmith@mail.com", "john_newyork@mail.com"],
		["Mary", "mary@mail.com"]
	]
	
	Output: 
	[
		["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
		["John", "johnnybravo@mail.com"],
		["Mary", "mary@mail.com"]
	]

	Explanation: 
	The first and third John's are the same person as they have the common email "johnsmith@mail.com".
	The second John and Mary are different people as none of their email addresses are used by other accounts.

	You could return these lists in any order, for example the answer
	
	[
		['Mary', 'mary@mail.com'],
		['John', 'johnnybravo@mail.com'],
		['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']
	]
	is also acceptable.
*/

export class Solution {
  /**
   * @param {string[][]} accounts - Each item: [name, email1, email2, ...]
   * @return {string[][]}         - Merged accounts: [name, ...sortedEmails]
   */
  accountsMerge(accounts) {
    // --- Data structures we will build ---
    // graph: email -> Set of directly-connected emails (adjacency list)
    const graph = new Map();
    // emailToName: email -> owner's name (used to recover the name for a component)
    const emailToName = new Map();

    // --- Helper to ensure a node (email) exists in the graph ---
    const ensureNode = (email) => {
      if (!graph.has(email)) graph.set(email, new Set());
    };

    // --- 1) Build the graph and email->name mapping ---
    for (const account of accounts) {
      const ownerName = account[0];       // first element is the name
      const emails = account.slice(1);    // the rest are emails

      // Map every email to the owner's name and ensure the email exists in the graph
      for (const email of emails) {
        emailToName.set(email, ownerName);  // record the name for this email
        ensureNode(email);                  // make sure the node exists in the adjacency list
      }

      // Connect all emails **in this account** using "chain edges":
      // email[0] <-> email[1], email[1] <-> email[2], ...
      // Chain is enough to make the whole account connected (no need for a clique).
      for (let i = 1; i < emails.length; i++) {
        const a = emails[i - 1];
        const b = emails[i];
        graph.get(a).add(b);               // add b as a neighbor of a
        graph.get(b).add(a);               // add a as a neighbor of b (undirected)
      }
    }

    // --- 2) Traverse the graph to collect connected components (each = one person) ---
    const visited = new Set();             // marks emails we've already seen
    const result = [];                     // final merged accounts

    // Iterate every email node in the graph
    for (const startEmail of graph.keys()) {
      // Skip if this email was already grouped into some component
      if (visited.has(startEmail)) continue;

      // Iterative DFS (stack) from this email to collect all reachable emails
      const stack = [startEmail];          // emails to visit
      const component = [];                // emails belonging to the same person

      while (stack.length) {
        const node = stack.pop();          // take one email to process
        if (visited.has(node)) continue;   // ignore if already processed
        visited.add(node);                 // mark as processed
        component.push(node);              // collect into current component

        // Push all unvisited neighbors so DFS continues "spreading" from here
        for (const nei of graph.get(node)) {
          if (!visited.has(nei)) stack.push(nei);
        }
      }

      // Sort emails as required by the problem statement
      component.sort();

      // The component's name is the same for all its emails; take it from any member (e.g., startEmail)
      const name = emailToName.get(startEmail);

      // Push one merged account: [owner name, ...sorted emails]
      result.push([name, ...component]);
    }

    // Order of "accounts" in the output can be arbitrary per problem statement
    return result;
  }
}

/*
How to explain this in an interview (quick script)

Model: “Treat each email as a graph node. Emails inside the same account form edges. Shared emails ‘glue’ accounts together into one connected component.”
Build: “I build an adjacency list graph: email -> neighbors and an emailToName map.”
Merge: “Merging actually happens during graph construction: the same email is the same node, so chains connect across accounts that share it.”
Collect: “Then I run DFS from every unvisited email to collect each connected component, sort emails, and prepend the owner’s name from emailToName.”
Complexity: “Let E be total number of emails. Building edges is O(E), DFS is O(E), sorting per component sums to O(E log E). Space is O(E).”
*/
