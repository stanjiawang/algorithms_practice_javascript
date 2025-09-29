function backtrack(startIndex) {
  // 1. Base Case: When should I stop?
  if (/* condition for a complete solution */) {
    result.push([...path]); // store a snapshot
    return; // stop going deeper
  }

  // 2. Explore Choices
  for (let i = startIndex; i < choices.length; i++) {
    if (/* skip condition, e.g. already used */) continue;

    // Choose
    path.push(choices[i]);
    used[i] = true; // only if needed

    // Explore
    backtrack(i + 1); // or backtrack() depending on problem

    // Unchoose
    path.pop();
    used[i] = false; // only if needed
  }
}

// Example 1: Permutations
function backtrack() {
  if (path.length === nums.length) {  // ✅ base case: full permutation
    result.push([...path]);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue; // skip if already used

    path.push(nums[i]);     // choose
    used[i] = true;
    backtrack();            // explore
    path.pop();             // unchoose
    used[i] = false;
  }
}

// Example 2: Combinations (Order Does NOT Matter)
function backtrack(startIndex) {
  if (path.length === k) {  // ✅ stop when we picked k numbers
    result.push([...path]);
    return;
  }

  for (let i = startIndex; i < nums.length; i++) {
    path.push(nums[i]);       // choose
    backtrack(i + 1);         // explore with next starting index
    path.pop();               // unchoose
  }
}


// Example 3: Subsets
function backtrack(startIndex) {
  result.push([...path]); // ✅ every path is a subset

  for (let i = startIndex; i < nums.length; i++) {
    path.push(nums[i]);   // choose
    backtrack(i + 1);     // explore
    path.pop();           // unchoose
  }
}

