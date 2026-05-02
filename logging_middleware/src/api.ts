import { API } from "./types";

function h() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + (process.env.JWT_TOKEN || ""),
  };
}

export async function ship(stack: string, level: string, pkg: string, msg: string): Promise<void> {
  try {
    await fetch(API, {
      method: "POST",
      headers: h(),
      body: JSON.stringify({ stack, level, package: pkg, message: msg }),
    });
  } catch (_) {}
}
