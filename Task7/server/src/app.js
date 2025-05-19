import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import indexRoutes from "./routes/index.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/", indexRoutes);

export default app;
