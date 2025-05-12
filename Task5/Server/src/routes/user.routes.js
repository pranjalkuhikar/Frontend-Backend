import { Router } from "express";
import * as userController from "../controllers/user.controllers.js";
import * as userMiddleware from "../middleware/user.middleware.js";

const router = Router();

router.post(
  "/register",
  userMiddleware.registerValidation,
  userController.registerUser
);
router.post("/login", userMiddleware.loginValidation, userController.loginUser);

export default router;
