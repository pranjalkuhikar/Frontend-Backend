import express from "express";
const router = express.Router();
import userRoutes from "./users.routes.js";

router.use("/api/v1/user", userRoutes);

export default router;
