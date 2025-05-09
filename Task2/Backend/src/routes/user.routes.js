import { Router } from "express";
import {
  formController,
  registerController,
  feedController,
  loginGetController,
  loginPostController,
  logoutController,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/register", formController);
router.post("/create", registerController);
router.get("/login", loginGetController);
router.post("/login", loginPostController);
router.get("/logout", logoutController);
router.get("/feed", authenticate, feedController);

export default router;
