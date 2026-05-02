import { STACKS, LEVELS, PACKAGES } from "./types";

export function ok(stack: any, level: any, pkg: any, msg: any): boolean {
  if (!STACKS.includes(stack)) return false;
  if (!LEVELS.includes(level)) return false;
  if (!PACKAGES.includes(pkg)) return false;
  if (!msg || typeof msg !== "string" || !msg.trim()) return false;
  return true;
}
