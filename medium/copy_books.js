/*
https://www.lintcode.com/course/90/learn/437?chapterId=439&sectionId=3154&ac=true

Copy Books

Given n books and the i-th book has pages[i] pages. There are k persons to copy these books.
These books list in a row and each person can claim a continous range of books. For example, one copier can copy the books from i-th to j-th continously, but he can not copy the 1st book, 2nd book and 4th book (without 3rd book).
They start copying books at the same time and they all cost 1 minute to copy 1 page of a book. What's the best strategy to assign books so that the slowest copier can finish at earliest time?
Return the shortest time that the slowest copier spends.

Input: pages = [3, 2, 4], k = 2
Output: 5
Explanation: 
    First person spends 5 minutes to copy book 1 and book 2.
    Second person spends 4 minutes to copy book 3.

Input: pages = [3, 2, 4], k = 3
Output: 4
Explanation: Each person copies one of the books.
*/

export class Solution {
  /**
   * @param pages {number[]} - pages[i] is the number of pages in the i-th book
   * @param k {number} - number of copiers
   * @return {number} - the minimal time so that the slowest copier finishes earliest
   */
  copyBooks(pages, k) {
    // -------- 0) Guard cases --------
    if (!pages || pages.length === 0) {
      // No books to copy → time is 0
      return 0;
    }

    const n = pages.length;

    // If we have at least as many copiers as books,
    // each copier can take at most one book.
    // The total time is then the largest single book size.
    if (k >= n) {
      let maxSingleBook = pages[0];
      for (let i = 1; i < n; i++) {
        if (pages[i] > maxSingleBook) {
          maxSingleBook = pages[i];
        }
      }
      return maxSingleBook;
    }

    // -------- 1) Binary search boundaries --------
    // Lower bound: cannot be smaller than the largest single book
    // Upper bound: cannot be larger than the sum of all pages
    let lowerBound = 0;
    let upperBound = 0;
    for (let i = 0; i < n; i++) {
      if (pages[i] > lowerBound) {
        lowerBound = pages[i];
      }
      upperBound += pages[i];
    }

    // -------- 2) Feasibility check (greedy) --------
    // Returns true if it is possible to split `pages` into
    // at most `k` continuous groups so that no group sum exceeds `limit`.
    function canFinishWithinLimit(limit) {
      let requiredCopiers = 1; // we always start with the first copier
      let currentLoad = 0;     // accumulated pages for the current copier

      for (let i = 0; i < n; i++) {
        const bookPages = pages[i];

        // If adding this book exceeds the allowed limit,
        // assign the book to the next copier (start a new continuous group).
        if (currentLoad + bookPages > limit) {
          requiredCopiers += 1;
          currentLoad = 0;

          // Early exit: if we already need more than k copiers, it's not feasible
          if (requiredCopiers > k) {
            return false;
          }
        }

        // Put the current book into the current copier's load
        currentLoad += bookPages;
      }

      // If we used no more than k copiers, the limit is feasible
      return requiredCopiers <= k;
    }

    // -------- 3) Binary search the minimal feasible limit --------
    while (lowerBound < upperBound) {
      // Standard mid calculation to avoid overflow
      const mid = lowerBound + Math.floor((upperBound - lowerBound) / 2);

      if (canFinishWithinLimit(mid)) {
        // `mid` works; try to minimize further
        upperBound = mid;
      } else {
        // `mid` too small; increase the lower bound
        lowerBound = mid + 1;
      }
    }

    // lowerBound == upperBound → the minimal feasible maximum load (time)
    return lowerBound;
  }
}


/*
Idea: Split the array into ≤ k continuous groups to minimize the largest group sum (time).
Greedy check: Scan left→right, start a new group whenever adding a book would exceed the candidate limit.
Complexity: O(n * log(totalPages)) time, O(1) extra space.
*/
