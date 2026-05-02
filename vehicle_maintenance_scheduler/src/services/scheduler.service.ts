import { Task } from "../clients/api.client";

// intuition:
// this is a 0/1 knapsack problem.
// each task is an item, duration is weight, impact is value, mechanic hours is capacity.
// we want to maximize total impact without exceeding mechanic hours.

// approach: dynamic programming
// dp[i] = max impact achievable with exactly i hours
// transition: for each task, try including it if it fits
//   dp[c] = max(dp[c], dp[c - duration] + impact)

// to track which tasks are selected, we use a keep matrix.

export interface Result {
  maxImpact: number;
  selected: string[];
}

export function knapsack(tasks: Task[], cap: number): Result {
  const n = tasks.length;
  const dp: number[] = new Array(cap + 1).fill(0);
  const keep: boolean[][] = Array.from({ length: n }, () => new Array(cap + 1).fill(false));

  for (let i = 0; i < n; i++) {
    const w = tasks[i].Duration;
    const v = tasks[i].Impact;
    for (let c = cap; c >= w; c--) {
      if (dp[c - w] + v > dp[c]) {
        dp[c] = dp[c - w] + v;
        keep[i][c] = true;
      }
    }
  }

  const selected: string[] = [];
  let rem = cap;
  for (let i = n - 1; i >= 0; i--) {
    if (keep[i][rem]) {
      selected.push(tasks[i].TaskID);
      rem -= tasks[i].Duration;
    }
  }

  return { maxImpact: dp[cap], selected };
}
