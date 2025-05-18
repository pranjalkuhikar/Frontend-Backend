import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  profile,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, profile);

export default router;
