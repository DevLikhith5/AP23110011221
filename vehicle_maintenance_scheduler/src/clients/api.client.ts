let BASE = "http://20.207.122.201/evaluation-service";

function hdrs() {
  return { Authorization: "Bearer " + (process.env.JWT_TOKEN || "") };
}

export interface Depot {
  ID: number;
  MechanicHours: number;
}

export interface Task {
  TaskID: string;
  Duration: number;
  Impact: number;
}

export async function getDepots(): Promise<Depot[]> {
  try {
    let res = await fetch(BASE + "/depots", { headers: hdrs() });
    if (!res.ok) return [];
    let d = await res.json();
    return d.depots || [];
  } catch {
    return [];
  }
}

export async function getVehicles(): Promise<Task[]> {
  try {
    let res = await fetch(BASE + "/vehicles", { headers: hdrs() });
    if (!res.ok) return [];
    let d = await res.json();
    return d.vehicles || [];
  } catch {
    return [];
  }
}
