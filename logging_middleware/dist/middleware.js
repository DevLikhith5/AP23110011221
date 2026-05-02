"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mw = void 0;
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("./logger");
morgan_1.default.token("level", (req, res) => {
    const s = res.statusCode;
    return s >= 500 ? "error" : s >= 400 ? "warn" : "info";
});
exports.mw = (0, morgan_1.default)((tokens, req, res) => {
    const level = tokens["level"](req, res);
    const msg = [
        tokens.method(req, res),
        tokens.url(req, res),
        "->",
        tokens.status(req, res),
        tokens["response-time"](req, res),
        "ms",
    ].filter(Boolean).join(" ");
    (0, logger_1.Log)("backend", level, "middleware", msg);
    return null;
});
