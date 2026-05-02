import { API } from "./types";

export async function ship(stack: string, level: string, pkg: string, msg: string): Promise<void> {
  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stack, level, package: pkg, message: msg }),
    });
  } catch (_) {}
}
