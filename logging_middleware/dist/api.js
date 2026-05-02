"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ship = ship;
const types_1 = require("./types");
async function ship(stack, level, pkg, msg) {
    try {
        await fetch(types_1.API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stack, level, package: pkg, message: msg }),
        });
    }
    catch (_) { }
}
