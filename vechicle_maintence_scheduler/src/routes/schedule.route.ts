import { Router } from "express";
import { getDepots, getVehicles } from "../clients/api.client";
import { knapsack } from "../services/scheduler.service";

let router = Router();

router.get("/schedules", async (req: any, res: any) => {
  try {
    let depots = await getDepots();
    let tasks = await getVehicles();
    if (!depots.length || !tasks.length) {
      res.status(400).json({ error: "no depots or tasks available" });
      return;
    }

    let results = [];
    for (let d of depots) {
      let r = knapsack(tasks, d.MechanicHours);
      results.push({ depotId: d.ID, maxImpact: r.maxImpact, selectedTasks: r.selected });
    }

    res.json(results);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "something broke" });
  }
});

export default router;
