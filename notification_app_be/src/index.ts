import express from "express";
import dotenv from "dotenv";
import { mw } from "logging-middleware";
import routes from "./routes/notifications.route";

dotenv.config();

let app = express();
app.use(express.json());
app.use(mw);
app.use(routes);

let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`up on ${port}`));
