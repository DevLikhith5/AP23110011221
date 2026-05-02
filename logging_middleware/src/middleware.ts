import morgan from "morgan";
import { Log } from "./logger";

morgan.token("level", (req, res) => {
  const s = res.statusCode;
  return s >= 500 ? "error" : s >= 400 ? "warn" : "info";
});

export const mw = morgan((tokens, req, res) => {
  const level = tokens["level"](req, res) as string;
  const msg = [
    tokens.method(req, res),
    tokens.url(req, res),
    "->",
    tokens.status(req, res),
    tokens["response-time"](req, res),
    "ms",
  ].filter(Boolean).join(" ");

  Log("backend", level, "middleware", msg);
  return null;
});
