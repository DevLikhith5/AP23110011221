import { getDepots, getVehicles } from "./clients/api.client";
import { knapsack } from "./services/scheduler.service";
import { Log } from "logging-middleware";

async function main() {
  Log("backend", "info", "service", "fetching depots");

  const depots = await getDepots();

  Log("backend", "info", "service", `fetched ${depots.length} depots, fetching tasks`);

  const tasks = await getVehicles();

  Log("backend", "info", "service", `got ${tasks.length} tasks, running scheduler`);

  for (const d of depots) {
    const r = knapsack(tasks, d.MechanicHours);

    Log("backend", "info", "service", `depot ${d.ID}: impact=${r.maxImpact}, tasks=${r.selected.length}`);
  }

  Log("backend", "info", "service", "done");
}

main().catch((err: any) => {
  Log("backend", "error", "service", err?.message || "unknown error");
  process.exit(1);
});
