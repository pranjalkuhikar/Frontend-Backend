import { Router } from "express";
import userRoutes from "./user.route.js";

const router = Router();

router.use("/api/v1/users", userRoutes);

export default router;
