import { Router } from "express";
import {
  registerController,
  loginController,
  logoutController,
  feedController,
  authenticateController,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/auth", authenticate, authenticateController);
router.get("/feed", authenticate, feedController);

export default router;
