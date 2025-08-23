/*
https://www.lintcode.com/problem/1300
Bash Game

You are playing the following game with your friend: There is a pile of stones on the table, each time one of you take turns to remove 1 to 3 stones. The one who removes the last stone will be the winner. You will take the first turn to remove stones.
Both of you are very clever and have optimal strategies for the game. Write a function to determine whether you can win the game given the number of stones.
For example, if there are 4 stones, then you will never win the game: no matter 1, 2, or 3 stones you remove, the last stone will always be removed by your friend.

Example 1：

Input：n = 4 
Output：False
Explanation：Take 1, 2 or 3 first, the other party will take the last one

Example 2：

Input：n = 5 
Output：True
Explanation：Take 1 first，Than，we can win the game
*/

export class Solution {
  /**
   * @param n: an integer
   * @return: whether you can win the game given the number of stones in the heap
   */
  canWinBash(n) {
    // Write your code here
    return !!(n % 4)
  }
}

/*
由题可知，只要在取石头时，石头的数量是4的倍数，必输；只要取石头时，石头的数量不是4的倍数，就可保证取完石头之后石头数量为4的倍数，则对方必输，我方必赢。
所以，我方先取的情况下，只需要判断石头数量是否为4的倍数即可，是4的倍数则输出false，反之输出true
*/
