import express from "express";
import userRouter from "./routes/user.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "src/views");
app.set("view engine", "ejs");

app.use("/", userRouter);

export default app;
