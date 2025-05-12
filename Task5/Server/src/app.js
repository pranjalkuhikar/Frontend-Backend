import express from "express";
import userRouters from "./routes/user.routes.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(process.cwd(), "public")));

app.use("/users", userRouters);

export default app;
