"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = Log;
const api_1 = require("./api");
const validator_1 = require("./validator");
function Log(stack, level, pkg, msg, ctx) {
    if (!(0, validator_1.ok)(stack, level, pkg, msg))
        return;
    let m = msg;
    if (ctx) {
        const parts = [];
        if (ctx.ts)
            parts.push(`[${ctx.ts}]`);
        if (ctx.req)
            parts.push(`[req:${ctx.req}]`);
        if (ctx.uid)
            parts.push(`[user:${ctx.uid}]`);
        if (parts.length)
            m = `${parts.join("")} ${msg}`;
    }
    (0, api_1.ship)(stack, level, pkg, m);
}
