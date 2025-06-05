import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { validateUserInput } from "../middlewares/user.validator.js";
// import { csrfMiddleware } from "../middlewares/csrf.middleware.js";

const router = express.Router();

// Apply CSRF middleware to get token
// router.use(csrfMiddleware);

router.post("/register", validateUserInput, registerUser);
router.post("/login", validateUserInput, loginUser);

export default router;
