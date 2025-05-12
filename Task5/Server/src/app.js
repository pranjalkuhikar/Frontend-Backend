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
    origin: config.CORS_ORIGIN,
    methods: config.CORS_METHODS,
    allowedHeaders: config.CORS_ALLOWED_HEADERS,
    credentials: config.CORS_CREDENTIALS,
  })
);
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use("/users", userRouters);

export default app;
