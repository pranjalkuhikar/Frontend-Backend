import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  auth,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth", authMiddleware, auth);

export default router;
