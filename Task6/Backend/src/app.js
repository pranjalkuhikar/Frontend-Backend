import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", indexRoutes);

export default app;
