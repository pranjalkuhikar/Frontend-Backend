import express, { Router } from "express";
import userRoutes from "./users.routes.js";
import healthRoutes from "./health.routes.js";
import profileRoutes from "./profile.route.js";

const router: Router = express.Router();

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/health", healthRoutes);
router.use("/api/v1/profile", profileRoutes);

export default router;
