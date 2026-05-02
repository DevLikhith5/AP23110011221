"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
const types_1 = require("./types");
function ok(stack, level, pkg, msg) {
    if (!types_1.STACKS.includes(stack))
        return false;
    if (!types_1.LEVELS.includes(level))
        return false;
    if (!types_1.PACKAGES.includes(pkg))
        return false;
    if (!msg || typeof msg !== "string" || !msg.trim())
        return false;
    return true;
}
