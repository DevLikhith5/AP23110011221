import { Task } from "../clients/api.client";

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
