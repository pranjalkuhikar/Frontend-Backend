import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/user.controller.js";
import uploadCloud from "../config/cloudinary.config.js";

const router = Router();

router.post(
  "/register",
  uploadCloud.single("profilePhoto"),
  registerController
);
router.post("/login", loginController);

export default router;
