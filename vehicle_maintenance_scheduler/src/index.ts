import express from "express";
import { mw } from "logging-middleware";
import routes from "./routes/schedule.route";

import dotenv from "dotenv";
dotenv.config();

let app = express();
app.use(express.json());
app.use(mw);
app.use(routes);

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
