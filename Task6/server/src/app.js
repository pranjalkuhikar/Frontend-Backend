import express from "express";
import indexRouter from "./routes/index.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

export default app;
