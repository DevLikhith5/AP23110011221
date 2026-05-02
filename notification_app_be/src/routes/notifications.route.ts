import { Router } from "express";
import { getNotifications } from "../clients/api.client";
import { topN } from "../services/prioritizer.service";

let router = Router();

router.get("/top", async (req: any, res: any) => {
  try {
    let n = parseInt(req.query.n) || 10;

    let notifs = await getNotifications();
    if (!notifs.length) {
      res.status(400).json({ error: "no notifications" });
      return;
    }

    let result = topN(notifs, n);
    res.json({ top: result, count: result.length });
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "something broke" });
  }
});

export default router;
