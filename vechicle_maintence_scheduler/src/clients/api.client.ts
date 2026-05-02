const BASE = "http://20.207.122.201/evaluation-service";

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
  const res = await fetch(`${BASE}/depots`);
  if (!res.ok) throw new Error(`failed to fetch depots: ${res.status}`);
  return res.json();
}

export async function getVehicles(): Promise<Task[]> {
  const res = await fetch(`${BASE}/vehicles`);
  if (!res.ok) throw new Error(`failed to fetch vehicles: ${res.status}`);
  return res.json();
}
