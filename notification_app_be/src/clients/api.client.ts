let BASE = "http://20.207.122.201/evaluation-service";

function h() {
  return { Authorization: "Bearer " + (process.env.JWT_TOKEN || "") };
}

export interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

export async function getNotifications(): Promise<Notification[]> {
  try {
    let res = await fetch(BASE + "/notifications", { headers: h() });
    if (!res.ok) return [];
    let d = await res.json();
    return d.notifications || [];
  } catch {
    return [];
  }
}
