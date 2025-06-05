import express from "express";
import morgan from "morgan";
import indexRouter from "./routes/index.route.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

export default app;
