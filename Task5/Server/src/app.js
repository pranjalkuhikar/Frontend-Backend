import express from "express";
import userRouters from "./routes/user.routes.js";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/config.js";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieParser(config.COOKIE_SECRET, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-production-domain.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use("/users", userRouters);

export default app;
