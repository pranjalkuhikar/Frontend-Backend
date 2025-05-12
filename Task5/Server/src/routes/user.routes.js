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
router.get("/logout", userMiddleware.authUser, userController.logoutUser);
router.get("/profile", userMiddleware.authUser, (req, res) => {
  res.status(200).json({
    message: "User profile",
    user: req.user,
  });
});

export default router;
