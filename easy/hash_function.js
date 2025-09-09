/*
https://www.lintcode.com/course/98/learn/128?chapterId=518&sectionId=3926&ac=false

Hash Function
In data structure Hash, hash function is used to convert a string(or any other type) into an integer smaller than hash size and bigger or equal to zero. The objective of designing a hash function is to "hash" the key as unreasonable as possible. A good hash function can avoid collision as less as possible. A widely used hash function algorithm is using a magic number 33, consider any string as a 33 based big integer like follow:

here size is the capacity of the hash table (you can assume a hash table is like an array with index 0 ~ size-1).Given a string as a key and the size of hash table size, return the hash value of this string.

For this problem, you are not necessary to design your own hash algorithm or consider any collision issue, you just need to implement the algorithm as described.
0<=len(key)<=100000

Input:  key="abcd", size = 100
Output: 78
Explanation: (97*33^3 + 98*33^2 + 99*33 + 100*1)%100 = 78

Input:  key="abcd", size = 1000
Output: 978
Explanation: (97*33^3 + 98*33^2 + 99*33 + 100*1)%1000 = 978

*/

export class Solution {
  /**
   * @param key: A string you should hash
   * @param size: An integer (capacity of hash table)
   * @return: An integer (the hash value)
   */
  hashCode(key, size) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33 + key.charCodeAt(i)) % size;
    }
    return hash;
  }
}
