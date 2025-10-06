/*
https://www.lintcode.com/course/90/learn/919?chapterId=474&sectionId=3304&ac=true

Meeting Rooms II

Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

(0,8),(8,10) is not conflict at 8

Input: intervals = [(0,30),(5,10),(15,20)]
Output: 2
Explanation:
We need two meeting rooms
room1: (0,30)
room2: (5,10),(15,20)

Input: intervals = [(2,7)]
Output: 1
Explanation: 
Only need one meeting room
*/
import { Interval } from '/opt/node/lib/lintcode/index.js';

export class Solution {
  /**
   * @param {Interval[]} meetings - list of meeting intervals [start, end]
   * @return {number} - minimum number of meeting rooms required
   */
  minMeetingRooms(meetings) {
    // 🧱 Edge case: no meetings → no rooms needed
    if (!Array.isArray(meetings) || meetings.length === 0) return 0;

    // 🕒 Step 1. Separate and sort start and end times
    const startTimes = meetings.map(m => m.start).sort((a, b) => a - b);
    const endTimes = meetings.map(m => m.end).sort((a, b) => a - b);

    // 🧭 Step 2. Initialize two pointers
    let startPointer = 0; // points to the next meeting to start
    let endPointer = 0;   // points to the earliest meeting to end

    // 🚪 Step 3. Track room usage
    let roomsInUse = 0; // number of rooms currently occupied
    let maxRooms = 0;   // max number of rooms used at any time

    // 🧮 Step 4. Sweep through the timeline
    while (startPointer < startTimes.length) {
      // If next meeting starts before the earliest current meeting ends → overlap
      if (startTimes[startPointer] < endTimes[endPointer]) {
        roomsInUse += 1; // need one more room
        maxRooms = Math.max(maxRooms, roomsInUse); // update max
        startPointer += 1; // move to next starting meeting
      } else {
        // Otherwise, a meeting has ended → free one room
        roomsInUse -= 1;
        endPointer += 1; // move to next ending meeting
      }
    }

    return maxRooms;
  }
}

/*
The problem asks for the maximum number of overlapping meetings.
I sort start times and end times separately and use two pointers to simulate a sweep-line moving along the timeline.
Whenever a new meeting starts before the earliest one ends, it overlaps → I need a new room.
When a meeting ends, I free a room.
The maximum number of rooms in use during this process is the answer.

🧮 Complexity
Time Complexity: O(n log n) — due to sorting.
Space Complexity: O(n) — for start and end arrays.
*/
