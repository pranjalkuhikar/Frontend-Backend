import { Router } from "express";
import {
  registerUser,
  loginUser,
  auth,
  verifyEmail,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import upload from "../config/cloudinary.config.js";
import { validate } from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema } from "../schemas/user.schema.js";

const router = Router();

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 */
router.post(
  "/register",
  upload.single("profilePhoto"),
  validate(registerSchema),
  registerUser
);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post("/login", validate(loginSchema), loginUser);

/**
 * @swagger
 * /api/v1/user/auth:
 *   get:
 *     summary: Check authentication status
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get("/auth", authenticate, auth);

/**
 * @swagger
 * /api/v1/user/verify-email:
 *   get:
 *     summary: Verify user email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/verify-email", verifyEmail);

export default router;
