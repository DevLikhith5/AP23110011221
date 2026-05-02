import express from "express";
import dotenv from "dotenv";
import routes from "./routes/notifications.route";

dotenv.config();

let app = express();
app.use(express.json());
app.use(routes);

let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server runninng on port ${port}`));
