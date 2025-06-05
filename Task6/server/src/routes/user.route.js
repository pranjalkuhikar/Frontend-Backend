import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { validateUserInput } from "../middlewares/user.validator.js";
import { csrfMiddleware } from "../middlewares/csrf.middleware.js";

const router = express.Router();

router.post("/register", csrfMiddleware, validateUserInput, registerUser);
router.post("/login", csrfMiddleware, validateUserInput, loginUser);

export default router;
