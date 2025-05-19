import { Router } from "express";
import {
  authController,
  loginController,
  registerController,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import uploadCloud from "../config/cloudinary.config.js";

const router = Router();

router.post(
  "/register",
  uploadCloud.single("profilePhoto"),
  registerController
);
router.post("/login", loginController);

router.get("/auth", authMiddleware, authController);

export default router;
