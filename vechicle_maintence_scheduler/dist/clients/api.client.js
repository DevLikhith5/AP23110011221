"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepots = getDepots;
exports.getVehicles = getVehicles;
const BASE = "http://20.207.122.201/evaluation-service";
async function getDepots() {
    const res = await fetch(`${BASE}/depots`);
    if (!res.ok)
        throw new Error(`failed to fetch depots: ${res.status}`);
    return res.json();
}
async function getVehicles() {
    const res = await fetch(`${BASE}/vehicles`);
    if (!res.ok)
        throw new Error(`failed to fetch vehicles: ${res.status}`);
    return res.json();
}
