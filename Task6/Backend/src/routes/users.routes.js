import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  auth,
} from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../config/cloudinary.config.js";

router.post("/register", upload.single("profilePhoto"), registerUser);

// 📌 Login
router.post("/login", loginUser);

// 📌 Auth check
router.get("/auth", authMiddleware, auth);

export default router;
