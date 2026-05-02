import { Notification } from "../clients/api.client";

let w: any = { Placement: 3, Result: 2, Event: 1 };

export interface Prioritized {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  score: number;
}

export function topN(notifs: Notification[], n: number): Prioritized[] {
  let scored = notifs.map((x) => ({
    id: x.ID,
    type: x.Type,
    message: x.Message,
    timestamp: x.Timestamp,
    score: w[x.Type] || 0,
  }));

  scored.sort((a: any, b: any) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.timestamp.localeCompare(a.timestamp);
  });

  return scored.slice(0, n);
}
