import { ship } from "./api";
import { ok } from "./validator";

export function Log(stack: string, level: string, pkg: string, msg: string, ctx?: any): void {
  if (!ok(stack, level, pkg, msg)) return;

  let m = msg;
  if (ctx) {
    const parts: string[] = [];
    if (ctx.ts) parts.push(`[${ctx.ts}]`);
    if (ctx.req) parts.push(`[req:${ctx.req}]`);
    if (ctx.uid) parts.push(`[user:${ctx.uid}]`);
    if (parts.length) m = `${parts.join("")} ${msg}`;
  }

  ship(stack, level, pkg, m);
}
