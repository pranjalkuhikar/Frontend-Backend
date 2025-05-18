import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";

const app = express();

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRoutes);

export default app;
